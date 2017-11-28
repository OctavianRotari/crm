// @flow
import * as React from 'react';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import Button from 'material-ui/Button';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle,
} from 'material-ui/Dialog';
import moment from 'moment';
import TextField from 'material-ui/TextField';

import events from '../../../dummyData/events';

import Panel from '../../../components/Panel';
import CalendarComponent from '../../../components/Calendar';


type Props = {
    onClickDate: Function,
    classes: Object
}

type State = {
    open: boolean,
    customer: string,
    visitType: string,
    selectedDate: string
}

const styles = () => ({
    textField: {
        width: '40%',
    },
});

class Calendar extends React.Component<Props, State> {
    state = {
        open: false,
        customer: '',
        visitType: '',
        selectedDate: ''
    }

    handleClick = (slotInfo: Object) => {
        const { onClickDate } = this.props;
        onClickDate(slotInfo);
    }

    handleRequestClose = () => {
        this.setState({open: false});
    };

    handleChange = (name: string) => (event: Object) => {
        this.setState({ [name]: event.target.value });
    };

    handleLongPress = (slotInfo: Object) => {
        this.setState({ open: true, selectedDate: slotInfo.start});
    }

    render() {
        const { open, selectedDate } = this.state;
        const { classes } = this.props;
        return (
            <Panel>
                <CalendarComponent
                    selectable={!open}
                    events={events}
                    onLongPress={this.handleLongPress}
                    onClick={this.handleClick}
                />
                <Dialog
                    open={open}
                    onRequestClose={this.handleRequestClose}
                >
                    <DialogTitle style={{padding: 16}}>{moment(selectedDate).format('dddd, MMMM Do')}</DialogTitle>
                    <DialogContent style={{padding: 16}}>
                        <FormControl style={{width: '100%'}}>
                            <InputLabel htmlFor="customer">Customer</InputLabel>
                            <Select
                                value={this.state.customer}
                                onChange={this.handleChange('customer')}
                                input={<Input id="customer" />}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Bike</MenuItem>
                                <MenuItem value={20}>Pro</MenuItem>
                                <MenuItem value={30}>Endura</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl style={{width: '100%', marginTop: '16px'}}>
                            <InputLabel htmlFor="visit-type">Visit Type</InputLabel>
                            <Select
                                value={this.state.visitType}
                                onChange={this.handleChange('visitType')}
                                input={<Input id="visit-type" />}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Sales</MenuItem>
                                <MenuItem value={20}>New</MenuItem>
                                <MenuItem value={30}>Training</MenuItem>
                                <MenuItem value={30}>Care</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl style={{width: '100%', marginTop: '16px', display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <TextField
                                id="start"
                                label="Start"
                                type="time"
                                defaultValue="07:30"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 300, // 5 min
                                }}
                            />
                            <TextField
                                id="end"
                                label="End"
                                type="time"
                                defaultValue="07:30"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 300, // 5 min
                                }}
                            />
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleRequestClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleRequestClose} color="primary">
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>
            </Panel>
        );
    }
}

export default withStyles(styles)(Calendar);
