import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { findDOMNode } from 'react-dom';
import cn from 'classnames';

import dates from './utils/dates';
import { segStyle } from './utils/eventLevels';
import { elementType } from './utils/propTypes';
import { slotWidth, getCellAtX, pointInBox } from './utils/selection';
import Selection, { getBoundsForNode, isEvent } from './Selection';
import BackgroundWrapper from './BackgroundWrapper';

class BackgroundCells extends React.Component {

    static propTypes = {
        date: PropTypes.instanceOf(Date),
        cellWrapperComponent: elementType,
        container: PropTypes.func,
        selectable: PropTypes.oneOf([true, false, 'ignoreEvents']),
        longPressThreshold: PropTypes.number,

        onLongPressSlot: PropTypes.func.isRequired,
        onClickSlot: PropTypes.func.isRequired,
        onSelectEnd: PropTypes.func,
        onSelectStart: PropTypes.func,

        range: PropTypes.arrayOf(
            PropTypes.instanceOf(Date)
        ),
        rtl: PropTypes.bool,
        type: PropTypes.string,
        classes: PropTypes.object
    }

    constructor(props, context) {
        super(props, context);

        this.state = {
            selecting: false
        };
    }

    componentDidMount(){
        this.props.selectable
            && this._selectable();
    }

    componentWillUnmount() {
        this._teardownSelectable();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectable && !this.props.selectable)
            this._selectable();

        if (!nextProps.selectable && this.props.selectable)
            this._teardownSelectable();
    }

    render(){
        let { range, date: currentDate, classes } = this.props;
        let { startIdx, endIdx } = this.state;

        return (
            <div className={classes.rbcRowBg}>
                {range.map((date, index) => {
                    let selected = index >= startIdx && index <= endIdx;
                    return (
                        <BackgroundWrapper
                            key={index}
                            value={date}
                            range={range}
                        >
                            <div
                                style={segStyle(1, range.length)}
                                className={cn(
                                    selected && classes.rbcSelectedCell,
                                    dates.isToday(date) && classes.rbcToday,
                                    currentDate && dates.month(currentDate) !== dates.month(date) && classes.rbcOffRangeBg,
                                )}
                            />
                        </BackgroundWrapper>
                    );
                })}
            </div>
        );
    }

    _selectable(){
        let node = findDOMNode(this);
        let selector = this._selector = new Selection(this.props.container, {
            longPressThreshold: this.props.longPressThreshold,
        });

        selector.on('beforeSelect', (box) => {
            if (this.props.selectable !== 'ignoreEvents') return;

            return !isEvent(findDOMNode(this), box);
        });

        selector.on('click', point => {
            let currentCell;

            if (!isEvent(findDOMNode(this), point)) {
                let rowBox = getBoundsForNode(node);
                let { range, rtl } = this.props;

                if (pointInBox(rowBox, point)) {
                    let width = slotWidth(getBoundsForNode(node),  range.length);
                    currentCell = getCellAtX(rowBox, point.x, width, rtl, range.length);

                    this._onClickSlot({
                        startIdx: currentCell,
                        endIdx: currentCell,
                        action: 'click',
                    });
                }
            }

            this.setState({
                selecting: false,
                startIdx: currentCell,
                endIdx: currentCell
            });
            this._initial = {};
        });

        selector.on('longPress', point => {
            let currentCell;
            const node = findDOMNode(this);
            if (!isEvent(findDOMNode(this), point)) {
                let rowBox = getBoundsForNode(node);
                let { range, rtl } = this.props;

                if (pointInBox(rowBox, point)) {
                    let width = slotWidth(getBoundsForNode(node),  range.length);
                    currentCell = getCellAtX(rowBox, point.x, width, rtl, range.length);

                    this._onLongPressSlot({
                        startIdx: currentCell,
                        endIdx: currentCell,
                        action: 'longPress',
                    });
                }
            }

            this.setState({
                selecting: false,
                startIdx: currentCell,
                endIdx: currentCell
            });
            this._initial = {};
        });
    }

    _teardownSelectable() {
        if (!this._selector) return;
        this._selector.teardown();
        this._selector = null;
    }

    _onLongPressSlot({endIdx, startIdx, action}) {
        this.props.onLongPressSlot && this.props.onLongPressSlot({
            start: startIdx,
            end: endIdx,
            action
        });
    }

    _onClickSlot({endIdx, startIdx, action}) {
        this.props.onClickSlot && this.props.onClickSlot({
            start: startIdx,
            end: endIdx,
            action
        });
    }
}

const style = () => ({
    rbcRowBg: {
        display: 'flex',
        flexDirection: 'row',
        flex: '1 0 0',
        overflow: 'hidden',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    rbcSelectedCell: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)'
    },
    rbcToday: {
        backgroundColor: '#F3595C'
    },
    rbcOffRangeBg: {
        background: '#e5e5e5'
    }
});

export default withStyles(style)(BackgroundCells);
