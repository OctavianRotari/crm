import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';

import {
    getBeginOfMonth,
    getDayOfWeek,
    getMonthIndex,
    getYear,
} from '../shared/dates';
import { formatShortWeekday } from '../shared/dateFormatter';
import { isCalendarType } from '../shared/propTypes';
import { segStyle } from '../utils';

import Row from '../Row';

const styles = () => ({
    root: {
        display: 'flex',
        overflow: 'hidden',
        flexDirection: 'row',
    },
    rootHeader: {
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'row',
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

class Weekdays extends Component {
    get beginOfMonth() {
        const { month } = this.props;

        return getBeginOfMonth(month);
    }

    get year() {
        const { beginOfMonth } = this;

        return getYear(beginOfMonth);
    }

    get monthIndex() {
        const { beginOfMonth } = this;

        return getMonthIndex(beginOfMonth);
    }

    render() {
        const { beginOfMonth, year, monthIndex } = this;
        const { calendarType, classes } = this.props;

        const weekdays = [];

        for (let weekday = 1; weekday <= 7; weekday += 1) {
            const weekdayDate =
                new Date(year, monthIndex, weekday - getDayOfWeek(beginOfMonth, calendarType));

            weekdays.push(
                <div
                    className={classes.header}
                    key={weekday}
                    style={{ flexGrow: 1 }}
                >
                    {formatShortWeekday(weekdayDate).replace('.', '')}
                </div>,
            );
        }

        return (
            <div className={classes.root} >
                {weekdays.map((child, index) => (
                    <div 
                        key={index}
                        style={segStyle(1, weekdays.length)} 
                        className={classes.cell}
                    >
                        {child}
                    </div>
                ))}
            </div>
        );
    }
}

Weekdays.propTypes = {
    calendarType: isCalendarType.isRequired,
    month: PropTypes.oneOfType([
        PropTypes.string, // Only strings that are parseable to integer
        PropTypes.number,
        PropTypes.instanceOf(Date),
    ]).isRequired,
};

export default withStyles(styles)(Weekdays)
