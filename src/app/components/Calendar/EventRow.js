import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import React from 'react';
import EventRowMixin from './EventRowMixin';

class EventRow extends React.Component {
    static propTypes = {
        segments: PropTypes.array,
        ...EventRowMixin.propTypes,
    }
    static defaultProps = {
        ...EventRowMixin.defaultProps,
    }
    render() {
        let { segments, classes } = this.props;

        let lastEnd = 1;

        // debugger;
        return (
            <div className={classes.rbcRow}>
                {segments.reduce((row, { events, left, right, span }, li) => {
                    let key = '_lvl_' + li;
                    let gap = left - lastEnd;

                    let content = EventRowMixin.renderEvent(this.props, events);

                    if (gap)
                        row.push(EventRowMixin.renderSpan(this.props, gap, key + '_gap'));

                    row.push(EventRowMixin.renderSpan(this.props, span, key, content));

                    lastEnd = right + 1;

                    return row;
                }, [])}
            </div>
        );
    }
}

const style = () => ({
    rbcRow: {
        display: 'flex',
        flexDirection: 'row',
    },
});

export default withStyles(style)(EventRow);
