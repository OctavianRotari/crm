import React from 'react';
import events from 'dom-helpers/events';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from 'material-ui/Button';

import Selection from '../utils/selector';

import {
    getBeginOfDay,
    getDay,
    getEndOfDay,
    getISOLocalDate,
    isWeekend,
} from '../shared/dates';
import { isMaxDate, isMinDate } from '../shared/propTypes';

const styles = theme => ({
    root: {
        height: '100%', 
        width: '100%'
    },
    offRange: {
        background: '#e5e5e5',
        color: '#999999'
    },
    weekend: {
        color: 'red'
    },
    btnLabel: {
        flexDirection: 'column'
    },
    event: {
        display: 'block',
        color: '#fff',
        width: '10px',
        cursor: 'pointer',
        margin: '1px',
        height: '10px',
        fontFamily: 'Montserrat',
        borderRadius: '5px',
        backgroundColor: '#3174ad',
    }
});

function addEventListener(type, handler, target = document) {
    events.on(target, type, handler);
    return {
        remove(){ events.off(target, type, handler); }
    };
}

class Day extends React.Component {
    componentDidMount() {
        if(this.props.selectable) {
            const mouseDownListener = addEventListener('mousedown', (e) => {
                this._onInitialEventListener.remove();
                this._handleInitialEvent(e);
                this._onInitialEventListener = addEventListener('mousedown', this._handleInitialEvent, document.getElementById(this.props.date));
            }, document.getElementById(this.props.date));
            const touchStartListener = addEventListener('touchstart', (e) => {
                this._onInitialEventListener.remove();
                this._handleInitialEvent(e);
                this._onInitialEventListener = addEventListener('touchstart', this._handleInitialEvent, document.getElementById(this.props.date));
            }, document.getElementById(this.props.date));

            this._onInitialEventListener = {
                remove() {
                    mouseDownListener.remove();
                    touchStartListener.remove();
                }
            };
        }
    }

    _handleInitialEvent = (e) => {
        this.timer = setTimeout(() => {
            if ( e.which === 3 || e.button === 2 )
                return;
            this.props.onLongPress(this.props.date);
            this.longPress = true;
        }, 1000);

        this._initialEventData = {
            isTouch: /^touch/.test(e.type)
        };

        if (!this._initialEventData) return;

        switch (e.type) {
            case 'mousedown':
                this._onEndListener = addEventListener('mouseup', () => this._handleTerminatingEvent(e), document.getElementById(this.props.date));
                break;
            case 'touchstart':
                this._onEndListener = addEventListener('touchend', () => this._handleTerminatingEvent(e), document.getElementById(this.props.date));
                break;
            default:
                break;
        }
    }

    _handleTerminatingEvent = (e) => {
        if (this.timer) { clearTimeout(this.timer); }
        if (this.eventEndListener) { this.eventEndListener.remove(); }

        this.timer = null;
        this.eventEndListener = null;

        if(this.longPress) {
            this.longPress = false;
            return;
        }

        this._onEndListener && this._onEndListener.remove();

        if (!this._initialEventData) return;

        let click = this.isClick();
        let touch = this.isTouch();

        this._initialEventData = null;

        if(click || touch) {
            this.props.onClick(this.props.date);
        }

        if(!click || !touch)
            return;
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

    render() {
        const { 
            active, 
            currentMonthIndex, 
            date, 
            maxDate, 
            minDate, 
            onClick, 
            onLongPress, 
            renderChildren, 
            classes 
        } = this.props;
        const className = classNames(
            classes.root,
            {
                [classes.offRange]: date.getMonth() !== currentMonthIndex,
                [classes.weekend]: isWeekend(date)
            }
        );
        return (
            <Button
                id={date}
                className={className}
                classes={{label: classes.btnLabel}}
                disabled={ (minDate && getBeginOfDay(minDate) > date) || (maxDate && getEndOfDay(maxDate) < date) }
                key={date}
            >
                <div>
                    <time dateTime={`${getISOLocalDate(date)}T00:00:00.000`}>
                        {getDay(date)}
                    </time>
                    {renderChildren && renderChildren({ date, view: 'month' })}
                </div>
                <div className={classes.event}>
                </div>
            </Button>
        )
    }
};

Day.propTypes = {
    active: PropTypes.bool.isRequired,
    currentMonthIndex: PropTypes.number.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    maxDate: isMaxDate,
    minDate: isMinDate,
    onClick: PropTypes.func,
    renderChildren: PropTypes.func,
};

export default withStyles(styles)(Day);
