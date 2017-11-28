// @flow
import events from 'dom-helpers/events';

function addEventListener(type, handler, target = document) {
    events.on(target, type, handler);
    return {
        remove(){ events.off(target, type, handler); }
    };
}

class Selection {
    constructor() {
        this.longPressThreshold = 250;
        this.isLongEvent = false;

        this._listeners = Object.create(null);

        this._handleInitialEvent = this._handleInitialEvent.bind(this);
        // this._addLongPressListener = this._addLongPressListener.bind(this);

        // this._handleMoveEvent = this._handleMoveEvent.bind(this)
        this._handleTerminatingEvent = this._handleTerminatingEvent.bind(this);
        this._keyListener = this._keyListener.bind(this);

        // Fixes an iOS 10 bug where scrolling could not be prevented on the window.
        // https://github.com/metafizzy/flickity/issues/457#issuecomment-254501356
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
        this._onInitialEventListener && this._onInitialEventListener.remove();
        this._onEndListener && this._onEndListener.remove();
        this._onMoveListener && this._onMoveListener.remove();
        this._onKeyUpListener && this._onKeyUpListener.remove();
        this._onKeyDownListener && this._onKeyDownListener.remove();
    }

    _addInitialEventListener() {
        const mouseDownListener = addEventListener('mousedown', (e, date) => {
            this._onInitialEventListener.remove();
            this._handleInitialEvent(e, date);
            this._onInitialEventListener = addEventListener('mousedown', this._handleInitialEvent);
        });
        const touchStartListener = addEventListener('touchstart', (e, date) => {
            this._onInitialEventListener.remove();
            this._handleInitialEvent(e, date);
            this._onInitialEventListener = addEventListener('touchstart', this._handleInitialEvent);
        });

        this._onInitialEventListener = {
            remove() {
                mouseDownListener.remove();
                touchStartListener.remove();
            }
        };
    }

    _handleInitialEvent (e, date) {
        let timer = null;
        let eventEndListener = null;

        timer = setTimeout(() => {
            cleanup(true);
            if ( e.which === 3 || e.button === 2 )
                return;
            this.emit('longPress', date);
        }, this.longPressThreshold);

        eventEndListener = addEventListener('touchend', () => cleanup(false));

        const cleanup = (longEvent) => {
            this.isLongEvent = longEvent;

            if (timer) { clearTimeout(timer); }
            if (eventEndListener) { eventEndListener.remove(); }

            timer = null;
            eventEndListener = null;
        };

        // Right clicks
        if ( e.which === 3 || e.button === 2 )
            return;

        if(this.isLongEvent) return;

        let result = this.emit('beforeSelect', this._initialEventData = {
            isTouch: /^touch/.test(e.type)
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

    _handleTerminatingEvent(e, date) {
        // console.log(pageX, pageY, clientX, clientY);

        this.selecting = false;

        this._onEndListener && this._onEndListener.remove();
        // this._onMoveListener && this._onMoveListener.remove();

        if (!this._initialEventData) return;

        // this is for multiselect
        // let bounds = this._selectRect;
        let click = this.isClick();
        let touch = this.isTouch();

        this._initialEventData = null;

        if(click || touch)
            return this.emit('click', date);

        if(!click)
            return this.emit('reset');
    }

    _keyListener(e) {
        this.ctrl = (e.metaKey || e.ctrlKey);
    }

    isClick(pageX, pageY){
        let { x, y, isTouch } = this._initialEventData;
        return !isTouch;
    }

    isTouch() {
        let { isTouch } = this._initialEventData;
        return isTouch;
    }
}

export default Selection;
