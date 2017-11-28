import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';

import Days from './MonthView/Days';
import Weekdays from './MonthView/Weekdays';
import WeekNumbers from './MonthView/WeekNumbers';

import { getLocale } from './shared/locales';
import { isCalendarType, isMaxDate, isMinDate, isValue } from './shared/propTypes';

const styles = theme => ({
  root: {
    flex: '1 0 0',
    width: '100%',
    height: '100%',
    display: 'flex',
    position: 'relative',
    userSelect: 'none',
    flexDirection: 'column',
  }
})

class MonthView extends Component {
  get calendarType() {
    const { calendarType } = this.props;

    if (calendarType) {
      return calendarType;
    }

    switch (getLocale()) {
      case 'en-US':
        return 'US';
      default:
        return 'ISO 8601';
    }
  }

  componentDidMount() {
    const { setView } = this.props;

    if (setView) setView('month');
  }

  renderWeekdays() {
    const { calendarType } = this;
    const { activeStartDate } = this.props;

    return (
      <Weekdays
        calendarType={calendarType}
        month={activeStartDate}
      />
    );
  }

  renderDays() {
    const { setView, calendarType, ...childProps } = this.props;

    return (
      <Days
        calendarType={this.calendarType}
        {...childProps}
      />
    );
  }

  render() {
    const { showWeekNumbers, classes } = this.props;

    const className = 'react-calendar__month-view';

    return (
      <div className={ classes.root } >
        {this.renderWeekdays()}
        {this.renderDays()}
      </div>
    );
  }
}

MonthView.propTypes = {
  activeStartDate: PropTypes.instanceOf(Date).isRequired,
  calendarType: isCalendarType,
  maxDate: isMaxDate,
  minDate: isMinDate,
  onChange: PropTypes.func,
  setActiveRange: PropTypes.func,
  setView: PropTypes.func,
  showNeighboringMonth: PropTypes.bool,
  showWeekNumbers: PropTypes.bool,
  value: isValue,
  valueType: PropTypes.string,
};

export default withStyles(styles)(MonthView);
