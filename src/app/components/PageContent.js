// @flow
import * as React from 'react';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';

type Props = {
    children: Array<React$Element<any>> | React$Element<any>,
    classes: Object,
    style?: Object,
    padding?: boolean,
}

const style = (theme) => ({
    root: {
        width: '100%',
        height: '100%',
    },
    padding: {
        padding: theme.spacing.unit
    }
});

class PageContent extends React.Component<Props> {
    static defaultProps = {
        padding: false,
    }

    render() {
        const { padding, classes, ...other } = this.props;
        const className = classNames(
            classes.root,
            {
                [classes.padding]: padding,
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

export default withStyles(style)(PageContent);
