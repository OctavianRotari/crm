import contains from 'dom-helpers/query/contains';
import closest from 'dom-helpers/query/closest';
import events from 'dom-helpers/events';

function addEventListener(type, handler, target = document) {
    events.on(target, type, handler);
    return {
        remove(){ events.off(target, type, handler); }
    };
}

function isOverContainer(container, x, y) {
    return !container || contains(container, document.elementFromPoint(x, y));
}

export function isEvent(node, { clientX, clientY, }) {
    let target = document.elementFromPoint(clientX, clientY);
    return !!closest(target, '.rbc-event', node);
}

function getEventCoordinates(e) {
    let target = e;

    if (e.touches && e.touches.length) {
        target = e.touches[0];
    }

    return {
        clientX: target.clientX,
        clientY: target.clientY,
        pageX: target.pageX,
        pageY: target.pageY
    };
}

const clickTolerance = 5;

class Selection {

    constructor(node, { global = false, longPressThreshold = 250 } = {}) {
        this.container = node;
        this.globalMouse = !node || global;
        this.longPressThreshold = longPressThreshold;
        this.isLongEvent = false;

        this._listeners = Object.create(null);

        this._handleInitialEvent = this._handleInitialEvent.bind(this);
        // this._addLongPressListener = this._addLongPressListener.bind(this);

        // this._handleMoveEvent = this._handleMoveEvent.bind(this)
        this._handleTerminatingEvent = this._handleTerminatingEvent.bind(this);
        this._keyListener = this._keyListener.bind(this);

        // Fixes an iOS 10 bug where scrolling could not be prevented on the window.
        // https://github.com/metafizzy/flickity/issues/457#issuecomment-254501356
        this._onTouchMoveWindowListener = addEventListener('touchmove', () => {}, window);
        this._addInitialEventListener();
    }

    on(type, handler) {
        let handlers = this._listeners[type] || (this._listeners[type] = []);

        handlers.push(handler);

        return {
            remove(){
                let idx = handlers.indexOf(handler);
                if( idx !== -1) handlers.splice(idx, 1);
            }
        };
    }

    emit(type, ...args){
        let result;
        let handlers = this._listeners[type] || [];
        handlers.forEach(fn => {
            if (result === undefined)
                result = fn(...args);
        });
        return result;
    }

    teardown() {
        this.listeners = Object.create(null);
        this._onTouchMoveWindowListener && this._onTouchMoveWindowListener.remove();
        this._onInitialEventListener && this._onInitialEventListener.remove();
        this._onEndListener && this._onEndListener.remove();
        this._onMoveListener && this._onMoveListener.remove();
        this._onKeyUpListener && this._onKeyUpListener.remove();
        this._onKeyDownListener && this._onKeyDownListener.remove();
    }

    isSelected(node){
        let box = this._selectRect;

        if (!box || !this.selecting) return false;

        return objectsCollide(box, getBoundsForNode(node));
    }

    filter(items) {
        let box = this._selectRect;

        //not selecting
        if (!box || !this.selecting)
            return [];

        return items.filter(this.isSelected, this);
    }

    // Adds a listener that will call the handler only after the user has pressed on the screen
    // without moving their finger for 250ms.
    // _addLongPressListener(e) {
    //     return {
    //         remove() {
    //             cleanup();
    //             eventStartListener.remove();
    //         },
    //     };
    // }

    // Listen for mousedown and touchstart events. When one is received, disable the other and setup
    // future event handling based on the type of event.
    _addInitialEventListener() {
        const mouseDownListener = addEventListener('mousedown', (e) => {
            this._onInitialEventListener.remove();
            this._handleInitialEvent(e);
            this._onInitialEventListener = addEventListener('mousedown', this._handleInitialEvent);
        });
        const touchStartListener = addEventListener('touchstart', (e) => {
            this._onInitialEventListener.remove();
            this._handleInitialEvent(e);
            this._onInitialEventListener = addEventListener('touchstart', this._handleInitialEvent);
        });

        this._onInitialEventListener = {
            remove() {
                mouseDownListener.remove();
                touchStartListener.remove();
            }
        };
    }

    _handleInitialEvent (e) {
        const { clientX, clientY, pageX, pageY } = getEventCoordinates(e);
        let node = this.container(), collides, offsetData;

        let timer = null;
        let eventEndListener = null;

        timer = setTimeout(() => {
            cleanup(true);
            if (
                e.which === 3 ||
                e.button === 2 ||
                !isOverContainer(node, clientX, clientY)

            )
                return;
            this.emit('longPress', {
                x: pageX,
                y: pageY,
                clientX: clientX,
                clientY: clientY,
            });
        }, this.longPressThreshold);

        if(e.type === 'mousedown') {
            eventEndListener = addEventListener('mouseup', () => cleanup(false));
        } else {
            eventEndListener = addEventListener('touchend', () => cleanup(false));
        }

        const cleanup = (longEvent) => {
            this.isLongEvent = longEvent;

            if (timer) { clearTimeout(timer); }
            if (eventEndListener) { eventEndListener.remove(); }

            timer = null;
            eventEndListener = null;
        };

        // Right clicks
        if (
            e.which === 3 ||
            e.button === 2 ||
            !isOverContainer(node, clientX, clientY)

        )
            return;

        if(this.isLongEvent) return;

        if (!this.globalMouse && node && !contains(node, e.target)) {

            let { top, left, bottom, right } = normalizeDistance(0);

            offsetData = getBoundsForNode(node);

            collides = objectsCollide({
                top: offsetData.top - top,
                left: offsetData.left - left,
                bottom: offsetData.bottom + bottom,
                right: offsetData.right + right
            }, { top: pageY, left: pageX });

            if (!collides) return;
        }

        let result = this.emit('beforeSelect', this._initialEventData = {
            isTouch: /^touch/.test(e.type),
            x: pageX,
            y: pageY,
            clientX,
            clientY,
        });

        if (result === false)
            return;

        switch (e.type) {
            case 'mousedown':
                this._onEndListener = addEventListener('mouseup', () => this._handleTerminatingEvent(e));
                break;
            case 'touchstart':
                this._onEndListener = addEventListener('touchend', () => this._handleTerminatingEvent(e));
                break;
            default:
                break;
        }
    }

    _handleTerminatingEvent(e) {
        const { pageX, pageY, clientX, clientY } = getEventCoordinates(e);
        // console.log(pageX, pageY, clientX, clientY);

        this.selecting = false;

        this._onEndListener && this._onEndListener.remove();
        // this._onMoveListener && this._onMoveListener.remove();

        if (!this._initialEventData) return;

        let inRoot = !this.container || contains(this.container(), e.target);
        // this is for multiselect
        // let bounds = this._selectRect;
        let click = this.isClick(pageX, pageY);
        let touch = this.isTouch();

        this._initialEventData = null;
        if((click || touch) && !inRoot) {
            return this.emit('reset');
        }

        if((click || touch) && inRoot)
            return this.emit('click', {
                x: pageX,
                y: pageY,
                clientX: clientX,
                clientY: clientY,
            });

        if(!click)
            return this.emit('reset');
    }

    _keyListener(e) {
        this.ctrl = (e.metaKey || e.ctrlKey);
    }

    isClick(pageX, pageY){
        let { x, y, isTouch } = this._initialEventData;
        return !isTouch && (
            Math.abs(pageX - x) <= clickTolerance &&
            Math.abs(pageY - y) <= clickTolerance
        );
    }

    isTouch() {
        let { isTouch } = this._initialEventData;
        return isTouch;
    }
}

/**
 * Resolve the disance prop from either an Int or an Object
 * @return {Object}
 */
function normalizeDistance(distance = 0) {
    if (typeof distance !== 'object')
        distance = { top: distance, left: distance, right: distance, bottom: distance };

    return distance;
}

/**
 * Given two objects containing "top", "left", "offsetWidth" and "offsetHeight"
 * properties, determine if they collide.
 * @param  {Object|HTMLElement} a
 * @param  {Object|HTMLElement} b
 * @return {bool}
 */
export function objectsCollide(nodeA, nodeB, tolerance = 0) {
    let { top: aTop, left: aLeft, right: aRight = aLeft, bottom: aBottom = aTop } = getBoundsForNode(nodeA);
    let { top: bTop, left: bLeft, right: bRight = bLeft, bottom: bBottom = bTop } = getBoundsForNode(nodeB);

    return !(
        // 'a' bottom doesn't touch 'b' top
        ((aBottom - tolerance ) < bTop)  ||
        // 'a' top doesn't touch 'b' bottom
        ((aTop + tolerance) > (bBottom)) ||
        // 'a' right doesn't touch 'b' left
        ((aRight - tolerance) < bLeft )  ||
        // 'a' left doesn't touch 'b' right
        ((aLeft + tolerance) > (bRight) )
    );
}

/**
 * Given a node, get everything needed to calculate its boundaries
 * @param  {HTMLElement} node
 * @return {Object}
 */

export function getBoundsForNode(node) {
    if (!node.getBoundingClientRect) return node;

    let rect = node.getBoundingClientRect()
        , left = rect.left + pageOffset('left')
        , top = rect.top + pageOffset('top');

    return {
        top,
        left,
        right: (node.offsetWidth || 0) + left,
        bottom: (node.offsetHeight || 0) + top
    };
}

function pageOffset(dir) {
    if (dir === 'left')
        return (window.pageXOffset || document.body.scrollLeft || 0);
    if (dir === 'top')
        return (window.pageYOffset || document.body.scrollTop || 0);
}

export default Selection;
