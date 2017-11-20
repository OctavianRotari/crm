// @flow
import * as React from 'react';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';

import Panel from '../../components/Panel';
import PageContent from '../../components/PageContent';

const styles = theme => ({
    flexStack: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
    },
    root: {
        flexGrow: 1,
    },
    container: {
        display: 'flex',
        textAlign: 'center'
    },
    button: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.primary[500],
        color: 'white'
    },
    textField: {
        color: 'white',
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 300,
    },
    label: {
        color: 'white'
    }
});

type Props = {
    classes: Object
}

type State = {
    name: string
}

class Registration extends React.Component<Props, State> {
    state = {
        name: '',
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };
    render() {
        const { classes } = this.props;
        return (
            <PageContent style={ {
                backgroundColor: '#212731',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justfyContent: 'cente'
            } } >
                <Grid container className={classes.root}>
                    <Grid item xs={12}>
                        <Grid container spacing={16} className={classes.container} justify="center">
                            <Grid item xs={12}>
                                <img
                                    src={require('../../static/endura.png')}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <img
                                    src={require('../../static/CRM.png')}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <div className={classes.flexStack}>
                                    <TextField
                                        id="name"
                                        label="Name"
                                        color="contrast"
                                        labelClassName={classes.label}
                                        value={this.state.name}
                                        className={classes.textField}
                                        onChange={this.handleChange('name')}
                                        margin="normal"
                                    />
                                    <TextField
                                        id="password"
                                        label="Password"
                                        className={classes.textField}
                                        labelClassName={classes.label}
                                        type="password"
                                        autoComplete="current-password"
                                        margin="normal"
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <Panel>
                                    <Link to='/dashboard'>
                                        <Button raised className={classes.button}>
                                            Log In
                                        </Button>
                                    </Link>
                                </Panel>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </PageContent>
        );
    }
}

export default withStyles(styles)(Registration);
