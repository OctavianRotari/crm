import { withStyles } from 'material-ui/styles';
import _ from 'lodash';
import cn from 'classnames';
import getHeight from 'dom-helpers/query/height';
import qsa from 'dom-helpers/query/querySelectorAll';
import PropTypes from 'prop-types';
import React from 'react';
import { findDOMNode } from 'react-dom';

import dates from './utils/dates';
import { accessor, elementType } from './utils/propTypes';
import { segStyle, eventSegments, endOfRange, eventLevels } from './utils/eventLevels';
import BackgroundCells from './BackgroundCells';
import EventRow from './EventRow';

let isSegmentInSlot = (seg, slot) => seg.left <= slot && seg.right >= slot;

const propTypes = {
    date: PropTypes.instanceOf(Date),
    events: PropTypes.array.isRequired,
    range: PropTypes.array.isRequired,
    classes: PropTypes.object,

    rtl: PropTypes.bool,
    renderForMeasure: PropTypes.bool,
    renderHeader: PropTypes.func,

    container: PropTypes.func,
    selected: PropTypes.object,
    selectable: PropTypes.oneOf([true, false, 'ignoreEvents']),
    longPressThreshold: PropTypes.number,

    onShowMore: PropTypes.func,
    onLongPress: PropTypes.func,
    onClick: PropTypes.func,

    now: PropTypes.instanceOf(Date).isRequired,
    startAccessor: accessor.isRequired,
    endAccessor: accessor.isRequired,

    eventComponent: elementType,
    eventWrapperComponent: elementType.isRequired,
    minRows: PropTypes.number.isRequired,
    maxRows: PropTypes.number.isRequired,
    className: PropTypes.string
};

const defaultProps = {
    minRows: 0,
    maxRows: Infinity,
};

class DateContentRow extends React.Component {

    // constructor(...args) {
    //   super(...args);
    // }

    handleLongPressSlot = (slot) => {
        const { range, onLongPress } = this.props;

        onLongPress(
            range.slice(slot.start, slot.end + 1),
            slot
        );
    }

    handleOnClickSlot = (slot) => {
        const { range, onClick } = this.props;

        onClick(
            range.slice(slot.start, slot.end + 1),
            slot
        );
    }

    handleShowMore = (slot) => {
        const { range, onShowMore } = this.props;
        let row = qsa(findDOMNode(this), '.rbc-row-bg')[0];

        let cell;
        if (row) cell = row.children[slot-1];

        let events = this.segments
            .filter(seg => isSegmentInSlot(seg, slot))
            .map(seg => seg.event);

        onShowMore(events, range[slot-1], cell, slot);
    }

    createHeadingRef = r => {
        this.headingRow = r;
    }

    createEventRef = r => {
        this.eventRow = r;
    }

    getContainer = () => {
        const { container } = this.props;
        return container ? container() : findDOMNode(this);
    }

    getRowLimit = () => {
        let eventHeight = getHeight(this.eventRow);
        let headingHeight = this.headingRow ? getHeight(this.headingRow) : 0;
        let eventSpace = getHeight(findDOMNode(this)) - headingHeight;

        return Math.max(Math.floor(eventSpace / eventHeight), 1);
    }

    renderHeadingCell = (date, index) => {
        let { renderHeader, range, classes } = this.props;

        return renderHeader({
            date,
            key: `header_${index}`,
            style: segStyle(1, range.length),
            className: cn(
                classes.rbcDateCell,
                dates.eq(date, this.props.now, 'day') && classes.rbcNow, // FIXME use props.now
            )
        });
    }

    renderDummy = () => {
        let { className, range, renderHeader, classes } = this.props;
        return (
            <div className={className}>
                <div className={classes.rbcRowContent}>
                    {renderHeader && (
                        <div className={classes.rbcRow} ref={this.createHeadingRef}>
                            {range.map(this.renderHeadingCell)}
                        </div>
                    )}
                    <div className={classes.rbcRow} ref={this.createEventRef}>
                        <div className={classes.rbcRowSegment} style={segStyle(1, range.length)}>
                            <div className={classes.rbcEvent}>
                                <div className={classes.rbcEventContent}>&nbsp;</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        const {
            date,
            rtl,
            events,
            range,
            className,
            selectable,
            renderForMeasure,
            startAccessor,
            endAccessor,
            renderHeader,
            minRows, maxRows,
            eventComponent,
            eventWrapperComponent,
            longPressThreshold,
            classes,
            ...props
        } = this.props;

        if (renderForMeasure)
            return this.renderDummy();

        let { first, last } = endOfRange(range);

        const propsToGroupBy = ['start', 'end'];
        const notNull = _.negate(_.isNull);

        const groups = _.groupBy(events, (evt) => {
            return _.find(_.pick(evt, propsToGroupBy), notNull);
        });

        const segmentsArray = _.map(groups, (group) => {
            return {
                start: group[0].start,
                end: group[0].end,
                events: group
            };
        });

        let segments = this.segments = segmentsArray.map(segment => eventSegments(segment, segment.events, first, last, {
            startAccessor,
            endAccessor
        }, range));

        let { levels } = eventLevels(segments, Math.max(maxRows - 1, 1));
        while (levels.length < minRows ) levels.push([]);

        return (
            <div className={className}>
                <BackgroundCells
                    date={date}
                    rtl={rtl}
                    range={range}
                    selectable={selectable}
                    container={this.getContainer}
                    onLongPressSlot={this.handleLongPressSlot}
                    onClickSlot={this.handleOnClickSlot}
                    longPressThreshold={longPressThreshold}
                />
                <div className={classes.rbcRowContent}>
                    {renderHeader && (
                        <div className={classes.rbcRow} ref={this.createHeadingRef}>
                            {range.map(this.renderHeadingCell)}
                        </div>
                    )}
                    <EventRow
                        {...props}
                        start={first}
                        end={last}
                        segments={segments}
                        slots={range.length}
                        eventComponent={eventComponent}
                        eventWrapperComponent={eventWrapperComponent}
                        startAccessor={startAccessor}
                        endAccessor={endAccessor}
                    />
                </div>
            </div>
        );
    }
}

DateContentRow.propTypes = propTypes;
DateContentRow.defaultProps = defaultProps;

const style = () => ({
    rbcDateCell: {
        fontFamily: 'Montserrat',
        textAlign: 'center',
        alignSelf: 'center'
    },
    rbcNow: {
        color: '#fff'
    },
    rbcRowContent: {
        position: 'relative',
        display: 'inline-grid',
        alignContent: 'center',
        height: '100%',
        userSelect: 'none',
        zIndex: 4
    },
    rbcRow: {
        display: 'flex',
        flexDirection: 'row',
    },
    rbcRowSegment: {
        padding: '0 1px 1px 1px',
        display: 'flex',
        justifyContent: 'center',
        marginTop: '10px'
    },
    rbcEvent: {
        cursor: 'pointer',
        margin: '1px',
        backgroundColor: '#3174ad',
        borderRadius: '5px',
        color: '#fff',
        width: '10px',
        height: '10px',
    },
    rbcEventContent: {
        display: 'block',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
    }
});

export default withStyles(style)(DateContentRow);
