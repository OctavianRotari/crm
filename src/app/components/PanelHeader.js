// @flow
import * as React from 'react';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';

type Props = {
    children: Array<React$Element<any>> | React$Element<any>,
    classes: Object,
    verticalCenter?: boolean,
    defaultHeight?: boolean,
    flex?: boolean,
    defaultPadding?: boolean,
    isMobile?: boolean
}

const PANEL_HEADER_HEIGHT = 50;

const style = ({spacing}) => ({
    root: {
        display: 'block',
    },
    flex: {
        display: 'flex'
    },
    defaultPadding: {
        padding: spacing.unit / 2
    },
    alignItemsCenter: {
        alignItems: 'center'
    },
    defaultHeight: {
        height: PANEL_HEADER_HEIGHT
    },
    mobilePadding: {
        padding: spacing.unit
    }
});

class PanelHeader extends React.Component<Props> {
    static defaultProps = {
        defaultPadding: false,
        defaultHeight: false,
        flex: false,
        verticalCenter: false,
        isMobile: false
    }

    render() {
        const { flex, defaultPadding, verticalCenter, defaultHeight, classes, isMobile, ...other } = this.props;
        const className = classNames(
            classes.root,
            {
                [classes.flex]: flex,
                [classes.defaultPadding]: defaultPadding,
                [classes.alignItemsCenter]: verticalCenter,
                [classes.defaultHeight]: defaultHeight,
                [classes.mobilePadding]: isMobile
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

export default withStyles(style)(PanelHeader);
