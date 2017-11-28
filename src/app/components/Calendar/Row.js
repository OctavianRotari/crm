import React from 'react';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import Cell from './Cell';

const toPercent = num => `${Math.floor(100 * num) / 100}%`;

const styles = () => ({
});


const Row = ({ children, classes, count, offset, wrap, }) => (
    <div className={classes.root}>
        {React.Children.map(children, (child, index) => (
            <div 
                style={segStyle(1, children.length)} 
                className={classes.cell}
            >
                {child}
            </div>
        ))}
    </div>
);

function segStyle(span, slots){
    let per = (span / slots) * 100 + '%';
    return { WebkitFlexBasis: per, flexBasis: per, maxWidth: per } ;// IE10/11 need max-width. flex-basis doesn't respect box-sizing
}


export default withStyles(styles)(Row);
