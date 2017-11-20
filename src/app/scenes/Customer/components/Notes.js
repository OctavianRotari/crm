// @flow

import * as React from 'react';
import _ from 'lodash';
import Typography from 'material-ui/Typography';
import Tabs, { Tab } from 'material-ui/Tabs';
import { withStyles } from 'material-ui/styles';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import { FormControl } from 'material-ui/Form';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle,
} from 'material-ui/Dialog';

import Panel from '../../../components/Panel';
import PanelHeader from '../../../components/PanelHeader';
import NotesPanel from './NotesPanel';
import SearchBar from '../../../components/SearchBar';

import notesData from '../../../dummyData/notes.json';

const styles = (theme) => ({
    tabsRoot: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        display: 'flex',
        width: '100%',
    },
    tabsFlexContainer: {
        height: theme.spacing.unit + 4,
    },
    tabRoot: {
        width: 'auto',
        height: theme.spacing.unit,
        [theme.breakpoints.up('md')]: {
            minWidth: 'auto',
        },
    },
    rootInheritSelected: {
        color: theme.palette.primary[500]
    },
    labelContainer: {
        padding: 'inherit',
        paddingLeft: theme.spacing.unit / 2
    },
    label: {
        fontSize: 9
    },
    indicator: {
        width: 0,
        height: 0,
    },
    button: {
        position: 'absolute',
        right: 0,
        bottom: 0
    }
});

type Props = {
    classes: Object
}

type State = {
    value: number,
    data: Array<Object>,
    open: boolean,
    multiline: string
}

class Notes extends React.Component<Props, State> {
    state = {
        value: 0,
        data: notesData,
        multiline: '',
        open: false
    };

    setData = (value) => {
        switch(value) {
            case 0:
                return notesData;
            case 1:
                return _.filter(notesData, {'from': 'you'});
            case 2:
                return _.filter(notesData, {'from': 'support'});
        }
    }

    handleChange = (name: string) => (event: Object) => {
        this.setState({ [name]: event.target.value });
    };

    handleChangeTab = (event: Object, value: number) => {
        this.setState({value, data: this.setData(value)});
    }

    handleRequestClose = () => {
        this.setState({open: false});
    };

    render() {
        const { value, data, open } = this.state;
        const { classes } = this.props;
        return (
            <Panel>
                <PanelHeader verticalCenter flex defaultHeight>
                    <SearchBar
                        position='left'
                        inputPosition='right'
                        fullWidth
                        data={data}
                        onSearch={data => {
                            this.setState({data});
                        }}
                    />
                    <Typography align="left" type="title">
                        Notes
                    </Typography>
                    <Tabs
                        value={value}
                        onChange={this.handleChangeTab}
                        indicatorClassName={classes.indicator}
                        classes={
                            {
                                root: classes.tabsRoot,
                                flexContainer: classes.tabsFlexContainer
                            }
                        }
                        fullWidth
                    >
                        <Tab
                            classes={
                                {
                                    root: classes.tabRoot,
                                    labelContainer: classes.labelContainer,
                                    rootInheritSelected: classes.rootInheritSelected,
                                    label: classes.label
                                }
                            }
                            label="All"
                        />
                        <Tab
                            classes={
                                {
                                    root: classes.tabRoot,
                                    labelContainer: classes.labelContainer,
                                    rootInheritSelected: classes.rootInheritSelected,
                                    label: classes.label
                                }
                            }
                            label="You"
                        />
                        <Tab
                            classes={
                                {
                                    root: classes.tabRoot,
                                    labelContainer: classes.labelContainer,
                                    rootInheritSelected: classes.rootInheritSelected,
                                    label: classes.label
                                }
                            }
                            label="Support"
                        />
                    </Tabs>
                </PanelHeader>
                <Divider/>
                { value === 0 && <NotesPanel data={data} /> }
                { value === 1 && <NotesPanel data={data} /> }
                { value === 2 && <NotesPanel data={data} /> }
                <Button
                    className={classes.button}
                    fab
                    color="primary"
                    aria-label="add"
                    onClick={() => this.setState({open: true})}
                >
                    <AddIcon />
                </Button>
                <Dialog
                    open={open}
                    onRequestClose={this.handleRequestClose}
                >
                    <DialogTitle>Add Note</DialogTitle>
                    <DialogContent>
                        <FormControl style={{width: '100%'}}>
                            <TextField
                                id="multiline-static"
                                multiline
                                rows="3"
                                placeholder="Add notes"
                                value={this.state.multiline}
                                onChange={this.handleChange('multiline')}
                                margin="none"
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

export default withStyles(styles)(Notes);
