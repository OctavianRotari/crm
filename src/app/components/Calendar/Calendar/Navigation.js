import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import KeyboardArrowLeftIcon from 'material-ui-icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from 'material-ui-icons/KeyboardArrowRight';
import FirstPageIcon from 'material-ui-icons/FirstPage';
import LastPageIcon from 'material-ui-icons/LastPage';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import PropTypes from 'prop-types';

import {
    getCenturyLabel,
    getDecadeLabel,
    getBeginNext,
    getBeginNext2,
    getBeginPrevious,
    getBeginPrevious2,
    getEndPrevious,
    getEndPrevious2,
    getYear,
} from '../shared/dates';
import { formatMonthYear } from '../shared/dateFormatter';
import { isView, isViews } from '../shared/propTypes';

const styles = () => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
        fontSize: '16px'
    },
    label: {
        fontFamily: 'Montserrat',
        fontSize: 17,
        fontWeight: '500',
        flexGrow: 1,
        padding: '0 10px',
        textAlign: 'center'
    }
});

class Navigation extends Component {
    // get drillUpAvailable() {
    //     const { view, views } = this.props;
    //     return views.indexOf(view) > 0;
    // }

    get prevButtonDisabled() {
        const { activeStartDate: date, minDate, view } = this.props;
        const previousActiveStartDate = getBeginPrevious(view, date);
        if (previousActiveStartDate.getFullYear() < 1000) {
            return true;
        }
        const previousActiveEndDate = getEndPrevious(view, date);
        return minDate && minDate >= previousActiveEndDate;
    }

    get prev2ButtonDisabled() {
        const { activeStartDate: date, minDate, view } = this.props;
        const previousActiveStartDate = getBeginPrevious2(view, date);
        if (previousActiveStartDate.getFullYear() < 1000) {
            return true;
        }
        const previousActiveEndDate = getEndPrevious2(view, date);
        return minDate && minDate >= previousActiveEndDate;
    }

    get nextButtonDisabled() {
        const { activeStartDate: date, maxDate, view } = this.props;
        const nextActiveStartDate = getBeginNext(view, date);
        return maxDate && maxDate <= nextActiveStartDate;
    }

    get next2ButtonDisabled() {
        const { activeStartDate: date, maxDate, view } = this.props;
        const nextActiveStartDate = getBeginNext2(view, date);
        return maxDate && maxDate <= nextActiveStartDate;
    }

    onClickPrevious = () => {
        const { activeStartDate: date, view, setActiveStartDate } = this.props;
        setActiveStartDate(getBeginPrevious(view, date));
    }

    onClickNext = () => {
        const { activeStartDate: date, view, setActiveStartDate } = this.props;
        setActiveStartDate(getBeginNext(view, date));
    }

    onClickPrevious2 = () => {
        const { activeStartDate: date, view, setActiveStartDate } = this.props;
        setActiveStartDate(getBeginPrevious2(view, date));
    }

    onClickNext2 = () => {
        const { activeStartDate: date, view, setActiveStartDate } = this.props;
        setActiveStartDate(getBeginNext2(view, date));
    }

    get label() {
        const { activeStartDate: date, view } = this.props;

        switch (view) {
            case 'century':
                return getCenturyLabel(date);
            case 'decade':
                return getDecadeLabel(date);
            case 'year':
                return getYear(date);
            case 'month':
                return formatMonthYear(date);
            default:
                throw new Error(`Invalid view: ${view}.`);
        }
    }

    render() {
        const { label } = this;
        const { view, classes } = this.props;

        const className = 'react-calendar__navigation';

        return (
            <div
                className={classes.root}
            >
                {
                    view !== 'century' &&
                        <IconButton
                            disabled={this.prev2ButtonDisabled}
                            onClick={this.onClickPrevious2}
                        >
                            <FirstPageIcon />
                        </IconButton>
                }
                <IconButton
                    onClick={this.onClickPrevious}
                    disabled={this.prevButtonDisabled}
                >
                    <KeyboardArrowLeftIcon />
                </IconButton>
                <Button
                    className={classes.lable}
                    style={{ flexGrow: 1 }}
                    type="button"
                >
                    <span className={classes.rbcToolbarLabel}>
                        { label }
                    </span>
                </Button>
                <IconButton
                    onClick={this.onClickNext}
                    disabled={this.nextButtonDisabled}
                >
                    <KeyboardArrowRightIcon />
                </IconButton>
                {
                    view !== 'century' &&
                        <IconButton
                            disabled={this.next2ButtonDisabled}
                            onClick={this.onClickNext2}
                        >
                            <LastPageIcon />
                        </IconButton>
                }
            </div>
        );
    }
}

Navigation.defaultProps = {
    next2Label: '»',
    nextLabel: '›',
    prev2Label: '«',
    prevLabel: '‹',
};

Navigation.propTypes = {
    activeStartDate: PropTypes.instanceOf(Date).isRequired,
    maxDate: PropTypes.instanceOf(Date),
    minDate: PropTypes.instanceOf(Date),
    next2Label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    nextLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    prev2Label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    prevLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    setActiveStartDate: PropTypes.func.isRequired,
    view: isView.isRequired,
    views: isViews.isRequired,
};

export default withStyles(styles)(Navigation);
