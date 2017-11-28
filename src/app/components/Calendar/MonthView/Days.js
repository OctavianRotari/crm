import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';

import Row from '../Row';
import Day from './Day';

import {
    getDayOfWeek,
    getDaysInMonth,
    getMonthIndex,
    getYear,
} from '../shared/dates';
import { isCalendarType, isMaxDate, isMinDate, isValue } from '../shared/propTypes';
import { getTileActivityFlags } from '../shared/utils';
import { segStyle } from '../utils';

const styles = () => ({
    root: {
        height: '100%',
        display: 'inline-grid',
        zIndex: 4,
        position: 'relative',
        userSelect: 'none',
        alignContent: 'center'
    },
    row: {
        flex: '1 0 0',
        height: '100%',
        display: 'flex',
        position: 'relative',
        overflow: 'hidden',
    },
    cell: {
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

class Days extends Component {
    get offset() {
        if (this.props.showNeighboringMonth) {
            return 0;
        }

        const { activeStartDate, calendarType } = this.props;
        return getDayOfWeek(activeStartDate, calendarType);
    }

    /**
     * Defines on which day of the month the grid shall start. If we simply show current
     * month, we obviously start on day one, but if showNeighboringMonth is set to
     * true, we need to find the beginning of the week the first day of the month is in.
     */
    get start() {
        if (this.props.showNeighboringMonth) {
            const { activeStartDate, calendarType } = this.props;
            return -getDayOfWeek(activeStartDate, calendarType) + 1;
        }
        return 1;
    }

    /**
     * Defines on which day of the month the grid shall end. If we simply show current
     * month, we need to stop on the last day of the month, but if showNeighboringMonth
     * is set to true, we need to find the end of the week the last day of the month is in.
     */
    get end() {
        const { activeStartDate } = this.props;
        const daysInMonth = getDaysInMonth(activeStartDate);
        if (this.props.showNeighboringMonth) {
            const { year, monthIndex } = this;
            const { calendarType } = this.props;
            const activeEndDate = new Date(year, monthIndex, daysInMonth);
            return daysInMonth + (7 - getDayOfWeek(activeEndDate, calendarType) - 1);
        }
        return daysInMonth;
    }

    get year() {
        const { activeStartDate } = this.props;
        return getYear(activeStartDate);
    }

    get monthIndex() {
        const { activeStartDate } = this.props;
        return getMonthIndex(activeStartDate);
    }

    render() {
        const {
            start, end, year, monthIndex,
        } = this;
        const {
            maxDate,
            minDate,
            onClick,
            onLongPress,
            renderChildren,
            value,
            valueType,
            classes,
            events
        } = this.props;

        const dayProps = {
            maxDate,
            minDate,
            onClick,
            onLongPress,
            renderChildren,
        };

        let days = [];
        let weeks = []
        let n = 1
        for (let day = start; day <= end; day += 1) {
            const date = new Date(year, monthIndex, day);
            days.push(
                <Day
                    {...getTileActivityFlags(value, valueType, date, 'day')}
                    currentMonthIndex={monthIndex}
                    date={date}
                    key={day}
                    {...dayProps}
                />,
            );
            if(n === 7) {
                weeks.push(days);
                days = [];
                n = 0;
            }
            n+=1;
        }

        return (
            <div className={classes.root} >
                {weeks.map((week, i) => (
                    <div className={classes.row} >
                        {week.map((day, index) => (
                            <div 
                                key={index}
                                style={segStyle(1, week.length)} 
                                className={classes.cell}
                            >
                                {day}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        );
    }
}

Days.propTypes = {
    activeStartDate: PropTypes.instanceOf(Date).isRequired,
    calendarType: isCalendarType.isRequired,
    maxDate: isMaxDate,
    minDate: isMinDate,
    onClick: PropTypes.func,
    renderChildren: PropTypes.func,
    showNeighboringMonth: PropTypes.bool,
    value: isValue,
    valueType: PropTypes.string,
};

export default withStyles(styles)(Days);
