// @flow
import * as React from 'react';
import { withStyles } from 'material-ui/styles';
import MuiPaper from 'material-ui/Paper';
import classNames from 'classnames';

type Padding = "none" | "8" | "16";

type Props = {
    classes: Object,
    children: React.Node,
    fullHeight: boolean,
    border: boolean,
    warning: boolean,
    padding: Padding,
}

const styles = theme => ({
    fullHeight: {
        height: '100%'
    },
    border: {
        border: theme.palette.border,
    },
    warning: {
        backgroundColor: theme.palette.primary[500],
    },
    padding_16: {
        padding: theme.spacing.unit
    },
    padding_8: {
        padding: theme.spacing.unit / 2
    },
});

class Paper extends React.Component<Props> {
    static defaultProps = {
        fullHeight: false,
        border: false,
        warning: false,
        padding: 'none',
    }

    render() {
        const { fullHeight, border, warning, padding } = this.props;
        const { classes } = this.props;
        const className = classNames(
            {
                [classes.fullHeight]: fullHeight,
                [classes.border]: border,
                [classes.warning]: warning,
                [classes[`padding_${padding}`]]: padding !== 'none',
            }
        );
        return (
            <MuiPaper
                className={className}
                elevation={0}
            >
                {this.props.children}
            </MuiPaper>

        );
    }
}

export default withStyles(styles)(Paper);
