import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import React from 'react';
import cn from 'classnames';
// import dates from './utils/dates';
import { accessor, elementType } from './utils/propTypes';
import { accessor as get } from './utils/accessors';

let propTypes = {
    event: PropTypes.object.isRequired,
    slotStart: PropTypes.instanceOf(Date),
    slotEnd: PropTypes.instanceOf(Date),
    className: PropTypes.string,

    selected: PropTypes.bool,
    eventPropGetter: PropTypes.func,
    titleAccessor: accessor,
    allDayAccessor: accessor,
    startAccessor: accessor,
    endAccessor: accessor,

    eventComponent: elementType,
    eventWrapperComponent: elementType.isRequired,
    onSelect: PropTypes.func,
    onDoubleClick: PropTypes.func,
    classes: PropTypes.object
};

class EventCell extends React.Component {
    render() {
        let {
            className
            , event
            , selected
            , eventPropGetter
            , startAccessor
            , endAccessor
            // , titleAccessor
            // , slotStart
            // , slotEnd
            , onSelect
            , onDoubleClick
            , eventWrapperComponent: EventWrapper
            , classes
            , ...props } = this.props;

        let end = get(event, endAccessor);
        let start = get(event, startAccessor);
        // let title = get(event, titleAccessor);
        // let isAllDay = get(event, props.allDayAccessor);
        // let continuesPrior = dates.lt(start, slotStart, 'day');
        // let continuesAfter = dates.gte(end, slotEnd, 'day');

        if (eventPropGetter)
            var { style, className: xClassName } = eventPropGetter(event, start, end, selected);

        return (
            <EventWrapper event={event}>
                <div
                    style={{...props.style, ...style}}
                    className={cn(classes.rbcEvent, className, xClassName)}
                    onClick={(e) => onSelect(event, e)}
                    onDoubleClick={(e) => onDoubleClick(event, e)}
                />
            </EventWrapper>
        );
    }
}

EventCell.propTypes = propTypes;

const style = () => ({
    rbcEvent: {
        fontFamily: 'Montserrat',
        cursor: 'pointer',
        margin: '1px',
        backgroundColor: '#3174ad',
        borderRadius: '5px',
        color: '#fff',
        width: '10px',
        height: '10px',
    }
});

export default withStyles(style)(EventCell);
