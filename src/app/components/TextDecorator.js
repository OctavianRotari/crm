// @flow
import * as React from 'react';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';

const styles = () => ({
    success: {
        color: '#58C98C'
    },
    danger: {
        color: '#F4B35A'
    },
    warning: {
        color: '#F3595C'
    }
});

type Props = {
    children: any,
    classes: Object,
    success?: boolean,
    danger?: boolean,
    warning?: boolean
}

class TextDecorator extends React.Component<Props> {
    static defaultProps = {
        success: false,
        danger: false,
        warning: false
    }


    render() {
        const { classes, success, danger, warning } = this.props;
        const className = classNames(
            {
                [classes.success]: success,
                [classes.danger]: danger,
                [classes.warning]: warning
            }
        );
        return (
            <span className={className}>
                {this.props.children}
            </span>
        );
    }
} 

export default withStyles(styles)(TextDecorator);
