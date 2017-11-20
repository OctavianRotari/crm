// @flow
import { withStyles } from 'material-ui/styles';
import * as React from 'react';
import { navigate } from './utils/constants';
import KeyboardArrowLeftIcon from 'material-ui-icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from 'material-ui-icons/KeyboardArrowRight';
import IconButton from 'material-ui/IconButton';

type Props = {
    view: string,
    label: React.Node,
    messages: Object,
    onNavigate: Function,
    onViewChange: Function,
    classes: Object
}

class Toolbar extends React.Component<Props> {
    navigate = (action) => {
        this.props.onNavigate(action);
    }

    view = (view) => {
        this.props.onViewChange(view);
    }

    render() {
        let { label, classes } = this.props;

        return (
            <div className={classes.rbcToolbar}>
                <IconButton
                    onClick={this.navigate.bind(null, navigate.PREVIOUS)}
                >
                    <KeyboardArrowLeftIcon />
                </IconButton>
                <span className={classes.rbcToolbarLabel}>
                    { label }
                </span>
                <IconButton
                    onClick={this.navigate.bind(null, navigate.NEXT)}
                >
                    <KeyboardArrowRightIcon />
                </IconButton>
            </div>
        );
    }
}

const style = () => ({
    rbcToolbar: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
        fontSize: '16px'
    },
    rbcToolbarLabel: {
        fontFamily: 'Montserrat',
        fontSize: 17,
        fontWeight: '500',
        flexGrow: 1,
        padding: '0 10px',
        textAlign: 'center'
    }
});

export default withStyles(style)(Toolbar);
