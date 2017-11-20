import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import * as React from 'react';
import uncontrollable from 'uncontrollable';
import {
    accessor,
    elementType,
    dateFormat,
    dateRangeFormat,
    views as componentViews
} from './utils/propTypes';

import Month from './Month';

import { notify } from './utils/helpers';
import { views } from './utils/constants';
import defaultFormats from './formats';
import message from './utils/messages';
import moveDate from './utils/move';
import Toolbar from './Toolbar';
import EventWrapper from './EventWrapper';
import BackgroundWrapper from './BackgroundWrapper';

import omit from 'lodash/omit';
import defaults from 'lodash/defaults';

function viewNames(_views) {
    return !Array.isArray(_views) ? Object.keys(_views) : _views;
}

let now = new Date();

class Calendar extends React.Component {
    static propTypes = {
        elementProps: PropTypes.object,
        date: PropTypes.instanceOf(Date),
        view: PropTypes.string,
        events: PropTypes.arrayOf(PropTypes.object),
        onNavigate: PropTypes.func,
        onView: PropTypes.func,
        onLongPress: PropTypes.func,
        onClick: PropTypes.func,
        onSelectEvent: PropTypes.func,
        onDoubleClickEvent: PropTypes.func,
        onSelecting: PropTypes.func,
        selected: PropTypes.object,
        views: componentViews,
        drilldownView: PropTypes.string,
        getDrilldownView: PropTypes.func,
        toolbar: PropTypes.bool,
        popup: PropTypes.bool,
        popupOffset: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.shape({ x: PropTypes.number, y: PropTypes.number })
        ]),
        selectable: PropTypes.oneOf([true, false, 'ignoreEvents']),
        longPressThreshold: PropTypes.number,
        step: PropTypes.number,
        timeslots: PropTypes.number,
        rtl: PropTypes.bool,
        eventPropGetter: PropTypes.func,
        slotPropGetter: PropTypes.func,
        titleAccessor: accessor,
        allDayAccessor: accessor,
        startAccessor: accessor,
        endAccessor: accessor,
        showMultiDayTimes: PropTypes.bool,
        min: PropTypes.instanceOf(Date),
        max: PropTypes.instanceOf(Date),
        scrollToTime: PropTypes.instanceOf(Date),
        culture: PropTypes.string,
        formats: PropTypes.shape({
            dateFormat,
            dayFormat: dateFormat,
            weekdayFormat: dateFormat,
            timeGutterFormat: dateFormat,
            monthHeaderFormat: dateFormat,
            dayRangeHeaderFormat: dateRangeFormat,
            dayHeaderFormat: dateFormat,
            agendaHeaderFormat: dateFormat,
            selectRangeFormat: dateRangeFormat,
            agendaDateFormat: dateFormat,
            agendaTimeFormat: dateFormat,
            agendaTimeRangeFormat: dateRangeFormat,
            eventTimeRangeFormat: dateRangeFormat,
            eventTimeRangeStartFormat: dateFormat,
            eventTimeRangeEndFormat: dateFormat,
        }),
        components: PropTypes.shape({
            event: elementType,
            eventWrapper: elementType,
            dayWrapper: elementType,

            toolbar: elementType,

            agenda: PropTypes.shape({
                date: elementType,
                time: elementType,
                event: elementType
            }),

            day: PropTypes.shape({
                header: elementType,
                event: elementType
            }),
            week: PropTypes.shape({
                header: elementType,
                event: elementType
            }),
            month: PropTypes.shape({
                header: elementType,
                dateHeader: elementType,
                event: elementType
            })
        }),
        messages: PropTypes.shape({
            allDay: PropTypes.node,
            previous: PropTypes.node,
            next: PropTypes.node,
            today: PropTypes.node,
            month: PropTypes.node,
            week: PropTypes.node,
            day: PropTypes.node,
            agenda: PropTypes.node,
            date: PropTypes.node,
            time: PropTypes.node,
            event: PropTypes.node,
            showMore: PropTypes.func
        }),
        style: PropTypes.object,
        className: PropTypes.string,
        classes: PropTypes.object
    };

    static defaultProps = {
        elementProps: {},
        popup: false,
        toolbar: true,
        view: views.MONTH,
        views: [views.MONTH],
        date: now,
        step: 30,

        drilldownView: views.DAY,

        titleAccessor: 'title',
        allDayAccessor: 'allDay',
        startAccessor: 'start',
        endAccessor: 'end',

        longPressThreshold: 1000,
    };

    getDrilldownView = (date) => {
        const { view, drilldownView, getDrilldownView } = this.props;

        if (!getDrilldownView) return drilldownView;

        return getDrilldownView(date, view, Object.keys(this.getViews()));
    };

    handleNavigate = (action, newDate) => {
        let { view, date, onNavigate, ...props } = this.props;

        date = moveDate(Month, {
            ...props,
            action,
            date: newDate || date
        });

        onNavigate(date, view, action);
    };

    handleSelectEvent = (...args) => {
        notify(this.props.onSelectEvent, args);
    };

    handleDoubleClickEvent = (...args) => {
        notify(this.props.onDoubleClickEvent, args);
    }

    handleLongPress = (slotInfo) => {
        notify(this.props.onLongPress, slotInfo);
    };

    handleClick = (slotInfo) => {
        notify(this.props.onClick, slotInfo);
    }

    render() {
        let {
            view,
            toolbar,
            events,
            culture,
            components = {},
            formats = {} ,
            messages = {},
            style,
            elementProps,
            date: current,
            classes,
            selectable,
            ...props } = this.props;

        formats = defaultFormats(formats);
        messages = message(messages);

        let names = viewNames(this.props.views);

        let viewComponents = defaults(
            components[view] || {},
            omit(components, names),
            {
                eventWrapper: EventWrapper,
                dayWrapper: BackgroundWrapper,
            }
        );

        const label = Month.title(current, { formats, culture });

        return (
            <div
                {...elementProps}
                className={classes.rbcCalendar}
                style={style}
            >
                {toolbar &&
                        <Toolbar
                            date={current}
                            view={view}
                            label={label}
                            onNavigate={this.handleNavigate}
                            messages={messages}
                        />
                }
                <Month
                    {...props}
                    {...formats}
                    selectable={selectable}
                    messages={messages}
                    culture={culture}
                    formats={undefined}
                    events={events}
                    date={current}
                    components={viewComponents}
                    onNavigate={this.handleNavigate}
                    onSelectEvent={this.handleSelectEvent}
                    onDoubleClickEvent={this.handleDoubleClickEvent}
                    onLongPress={this.handleLongPress}
                    onClick={this.handleClick}
                    onShowMore={this._showMore}
                />
            </div>
        );
    }

}

const style = () => ({
    rbcCalendar: {
        boxSizing: 'border-box',
        height: '100%',
        display: 'flex',
        alignItems: 'stretch',
        flexDirection: 'column'
    }
    // .rbc-calendar *,
    // .rbc-calendar *:before,
    // .rbc-calendar *:after {
    //   box-sizing: inherit;
    // }
});

export default withStyles(style)(uncontrollable(Calendar, {
    view: 'onView',
    date: 'onNavigate',
    selected: 'onSelectEvent'
}));
