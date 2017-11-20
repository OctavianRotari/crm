import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';

import dates from './utils/dates';
import localizer from './localizer';
import chunk from 'lodash/chunk';

import { navigate, views } from './utils/constants';
import { notify } from './utils/helpers';
import getPosition from 'dom-helpers/query/position';
import raf from 'dom-helpers/util/requestAnimationFrame';

import Popup from './Popup';
import Overlay from 'react-overlays/lib/Overlay';
import DateContentRow from './DateContentRow';
import Header from './Header';
import DateHeader from './DateHeader';

import { accessor, dateFormat } from './utils/propTypes';
import { segStyle, inRange, sortEvents } from './utils/eventLevels';


let eventsForWeek = (evts, start, end, props) =>
    evts.filter(e => inRange(e, start, end, props));

let propTypes = {
    events: PropTypes.array.isRequired,
    date: PropTypes.instanceOf(Date),
    className: PropTypes.string,
    classes: PropTypes.object,

    min: PropTypes.instanceOf(Date),
    max: PropTypes.instanceOf(Date),

    step: PropTypes.number,
    now: PropTypes.instanceOf(Date),

    scrollToTime: PropTypes.instanceOf(Date),
    eventPropGetter: PropTypes.func,

    culture: PropTypes.string,
    dayFormat: dateFormat,

    rtl: PropTypes.bool,
    width: PropTypes.number,

    titleAccessor: accessor.isRequired,
    allDayAccessor: accessor.isRequired,
    startAccessor: accessor.isRequired,
    endAccessor: accessor.isRequired,

    selected: PropTypes.object,
    selectable: PropTypes.oneOf([true, false, 'ignoreEvents']),
    longPressThreshold: PropTypes.number,

    onNavigate: PropTypes.func,
    onLongPress: PropTypes.func,
    onClick: PropTypes.func,
    onSelectEvent: PropTypes.func,
    onDoubleClickEvent: PropTypes.func,
    onShowMore: PropTypes.func,
    onDrillDown: PropTypes.func,

    dateFormat,

    weekdayFormat: dateFormat,
    popup: PropTypes.bool,

    messages: PropTypes.object,
    components: PropTypes.object.isRequired,
    popupOffset: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.shape({
            x: PropTypes.number,
            y: PropTypes.number,
        }),
    ]),
};

class MonthView extends React.Component {
    static displayName = 'MonthView'
    static propTypes = propTypes

    static defaultProps = {
        now: new Date()
    }

    constructor(...args) {
        super(...args);

        this._bgRows = [];
        this._pendingSelection = [];
        this.state = {
            rowLimit: 5,
            needLimitMeasure: true,
        };
    }

    componentWillReceiveProps({ date }) {
        this.setState({
            needLimitMeasure: !dates.eq(date, this.props.date),
        });
    }

    componentDidMount() {
        let running;

        if (this.state.needLimitMeasure) this.measureRowLimit(this.props);

        window.addEventListener(
            'resize',
            (this._resizeListener = () => {
                if (!running) {
                    raf(() => {
                        running = false;
                        this.setState({ needLimitMeasure: true }) //eslint-disable-line
                    });
                }
            }),
            false
        );
    }

    componentDidUpdate() {
        if (this.state.needLimitMeasure) this.measureRowLimit(this.props);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this._resizeListener, false);
    }

    getContainer = () => {
        return findDOMNode(this);
    }

    render() {
        let { date, culture, weekdayFormat, className, classes } = this.props,
            month = dates.visibleDays(date, culture),
            weeks = chunk(month, 7);

        this._weekCount = weeks.length;

        return (
            <div className={classNames(classes.rbcMonthView, className)}>
                <div className={classes.rbcMonthHeader}>
                    {this.renderHeaders(weeks[0], weekdayFormat, culture)}
                </div>
                {weeks.map((week, idx) => this.renderWeek(week, idx))}
                {this.props.popup && this.renderOverlay()}
            </div>
        );
    }

    renderWeek = (week, weekIdx) => {
        let {
            events,
            components,
            selectable,
            titleAccessor,
            startAccessor,
            endAccessor,
            allDayAccessor,
            eventPropGetter,
            messages,
            selected,
            now,
            date,
            longPressThreshold,
            classes
        } = this.props;

        const { needLimitMeasure, rowLimit } = this.state;

        events = eventsForWeek(events, week[0], week[week.length - 1], this.props);
        events.sort((a, b) => sortEvents(a, b, this.props));

        return (
            <DateContentRow
                key={weekIdx}
                ref={weekIdx === 0 ? 'slotRow' : undefined}
                container={this.getContainer}
                className={classes.rbcMonthRow}
                now={now}
                date={date}
                range={week}
                events={events}
                maxRows={rowLimit}
                selected={selected}
                selectable={selectable}
                messages={messages}
                titleAccessor={titleAccessor}
                startAccessor={startAccessor}
                endAccessor={endAccessor}
                allDayAccessor={allDayAccessor}
                eventPropGetter={eventPropGetter}
                renderHeader={this.readerDateHeading}
                renderForMeasure={needLimitMeasure}
                onShowMore={this.handleShowMore}
                onSelect={this.handleSelectEvent}
                onDoubleClick={this.handleDoubleClickEvent}
                onLongPress={this.handleLongPress}
                onClick={this.handleClick}
                eventComponent={components.event}
                eventWrapperComponent={components.eventWrapper}
                longPressThreshold={longPressThreshold}
            />
        );
    }

    readerDateHeading = ({ date, className, ...props }) => {
        let {
            date: currentDate,
            dateFormat,
            culture,
            classes
        } = this.props;

        let isOffRange = dates.month(date) !== dates.month(currentDate);
        let label = localizer.format(date, dateFormat, culture);
        let DateHeaderComponent = this.props.components.dateHeader || DateHeader;

        return (
            <div
                {...props}
                className={classNames(
                    className,
                    isOffRange && classes.rbcOffRange,
                )}
            >
                <DateHeaderComponent
                    label={label}
                    date={date}
                    isOffRange={isOffRange}
                />
            </div>
        );
    }

    renderHeaders(row, format, culture) {
        let first = row[0];
        let last = row[row.length - 1];
        let HeaderComponent = this.props.components.header || Header;

        return dates.range(first, last, 'day').map((day, idx) => (
            <div key={'header_' + idx} className={this.props.classes.rbcHeader} style={segStyle(1, 7)}>
                <HeaderComponent
                    date={day}
                    label={localizer.format(day, format, culture)}
                    localizer={localizer}
                    format={format}
                    culture={culture}
                />
            </div>
        ));
    }

    renderOverlay () {
        let overlay = (this.state && this.state.overlay) || {};
        let { components } = this.props;

        return (
            <Overlay
                rootClose
                placement="bottom"
                container={this}
                show={!!overlay.position}
                onHide={() => this.setState({ overlay: null })}
            >
                <Popup
                    {...this.props}
                    eventComponent={components.event}
                    eventWrapperComponent={components.eventWrapper}
                    position={overlay.position}
                    events={overlay.events}
                    slotStart={overlay.date}
                    slotEnd={overlay.end}
                    onSelect={this.handleSelectEvent}
                />
            </Overlay>
        );
    }

    measureRowLimit() {
        this.setState({
            needLimitMeasure: false,
            // rowLimit: this.refs.slotRow.getRowLimit(),
        });
    }

    handleLongPress = (range, slotInfo) => {
        this._pendingSelection = this._pendingSelection.concat(range);

        clearTimeout(this._selectTimer);
        this._selectTimer = setTimeout(() => this.selectDates(slotInfo));
    }

    handleClick = (range, slotInfo) => {
        this._pendingSelection = this._pendingSelection.concat(range);

        clearTimeout(this._selectTimer);
        this._selectTimer = setTimeout(() => this.selectDates(slotInfo));
    }

    handleHeadingClick = (date, view, e) => {
        e.preventDefault();
        this.clearSelection();
        notify(this.props.onDrillDown, [date, view]);
    }

    handleSelectEvent = (...args) => {
        this.clearSelection();
        notify(this.props.onSelectEvent, args);
    }

    handleDoubleClickEvent = (...args) => {
        this.clearSelection();
        notify(this.props.onDoubleClickEvent, args);
    }

    handleShowMore = (events, date, cell, slot) => {
        const { popup, onDrillDown, onShowMore } = this.props;
        //cancel any pending selections so only the event click goes through.
        this.clearSelection();

        if (popup) {
            let position = getPosition(cell, findDOMNode(this));

            this.setState({
                overlay: { date, events, position },
            });
        } else {
            notify(onDrillDown, [date, views.DAY]);
        }

        notify(onShowMore, [events, date, slot]);
    }

    selectDates(slotInfo) {
        let slots = this._pendingSelection.slice();

        this._pendingSelection = [];

        slots.sort((a, b) => +a - +b);

        if(slotInfo.action === 'longPress') {
            notify(this.props.onLongPress, {
                slots,
                start: slots[0],
                end: slots[slots.length - 1],
                action: slotInfo.action,
            });
        } else if (slotInfo.action === 'click') {
            notify(this.props.onClick, {
                slots,
                start: slots[0],
                end: slots[slots.length - 1],
                action: slotInfo.action,
            });
        }
    }

    clearSelection() {
        clearTimeout(this._selectTimer);
        this._pendingSelection = [];
    }
}

MonthView.navigate = (date, action) => {
    switch (action) {
        case navigate.PREVIOUS:
            return dates.add(date, -1, 'month');
        case navigate.NEXT:
            return dates.add(date, 1, 'month');
        default:
            return date;
    }
};


MonthView.title = (date, { formats, culture }) =>
    localizer.format(date, formats.monthHeaderFormat, culture);

const style = () => ({
    rbcMonthView: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        flex: '1 0 0',
        width: '100%',
        userSelect: 'none',
        height: '100%'
    },
    rbcMonthHeader: {
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'row',
    },
    rbcMonthRow: {
        display: 'flex',
        position: 'relative',
        flexDirection: 'column',
        flex: '1 0 0',
        overflow: 'hidden',
        height: '100%'
    },
    rbcOffRange: {
        color: '#999999'
    },
    rbcHeader: {
        color: '#999999',
        fontFamily: 'Montserrat',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        padding: '0 3px',
        textAlign: 'center',
        verticalAlign: 'middle',
        fontSize: '90%',
        minHeight: 0
    }
});

export default withStyles(style)(MonthView);
