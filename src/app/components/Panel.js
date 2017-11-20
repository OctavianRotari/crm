// @flow
import * as React from 'react';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';

type Padding = "none" | "8" | "16";

type Props = {
    classes: Object,
    children: React.Node,
    mobileNavPresent: boolean,
    flex: boolean,
    border: boolean,
    padding: Padding,
};

const styles = (theme) => ({
    root: {
        width: '100%',
        height: '100%',
        position: 'relative'
    },
    padding_16: {
        padding: theme.spacing.unit
    },
    padding_8: {
        padding: theme.spacing.unit / 2
    },
    mobileNavHeight: {
        height: `calc(100% - ${theme.sizes.bottomNavHeight}px)`
    },
    flex: {
        display: 'flex'
    },
    border: {
        border: theme.palette.border,
    },
});

class Panel extends React.Component<Props> {
    static defaultProps = {
        padding: 'none',
        mobileNavPresent: false,
        flex: false,
        border: false
    }

    render() {
        const { flex, padding, classes, mobileNavPresent, border,  ...other } = this.props;
        const className = classNames(
            classes.root,
            {
                [classes.flex]: flex,
                [classes.border]: border,
                [classes.mobileNavHeight]: mobileNavPresent,
                [classes[`padding_${padding}`]]: padding !== 'none',
            }
        );

        return (
            <div
                className={className}
                {...other}
            >
                {this.props.children}
            </div>
        );
    }
}

export default withStyles(styles)(Panel);
