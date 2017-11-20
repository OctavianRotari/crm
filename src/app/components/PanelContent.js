// @flow
import * as React from 'react';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';

type Props = {
    classes: Object,
    children: React.Node,
    className?: String,
    style?: Object,
    fullHeight?: boolean,
    defaultPadding?: boolean,
    headerPresent?: boolean,
    paddingTop?: boolean,
    overflowYScroll?: boolean
}

const PANEL_HEADER_HEIGHT = 50;

const styles = theme => ({
    root: {
        maxWidth: '100%',
        width: '100%',
        overflow: 'hidden',
        position: 'relative'
    },
    defaultPadding: {
        padding: theme.spacing.unit / 2
    },
    fullHeight: {
        height: '100%'
    },
    contentPlusHeader: {
        height: `calc(100% - ${PANEL_HEADER_HEIGHT}px)`,
        paddingTop: 0
    },
    paddingTop: {
        paddingTop: theme.spacing.unit
    },
    overflowYScroll: {
        overflowY: 'scroll',
    }
});

class PanelContent extends React.Component<Props> {
    static defaultProps = {
        defaultPadding: false,
        headerPresent: false,
        fullHeight: false,
        paddingTop: false,
        overflowYScroll: false,
    }

    render() {
        const {
            classes,
            defaultPadding,
            fullHeight,
            headerPresent,
            paddingTop,
            overflowYScroll,
            ...other
        } = this.props;
        const className = classNames(
            classes.root,
            {
                [classes.fullHeight]: fullHeight,
                [classes.defaultPadding]: defaultPadding,
                [classes.contentPlusHeader]: headerPresent,
                [classes.paddingTop]: paddingTop,
                [classes.overflowYScroll]: overflowYScroll
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

export default withStyles(styles)(PanelContent);
