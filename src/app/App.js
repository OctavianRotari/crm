import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    withStyles,
    Drawer,
    AppBar,
    List,
    Typography,
    Hidden,
    IconButton,
    Toolbar,
} from 'material-ui';
import MenuIcon from 'material-ui-icons/Menu';
import { Route, Switch, Link } from 'react-router-dom';

const DRAWER_WIDTH = 235;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mobileOpen: false
        };
    }

    handleDrawerToggle() {
        this.setState({mobileOpen: !this.state.mobileOpen});
    }

    render() {
        const drawer = (
            <div>
                <List>
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/settings">Setting</Link>
                </List>
            </div>
        );

        return (
            <div>
                <div>
                    <AppBar>
                        <Toolbar>
                            <IconButton
                                color="contrast"
                                aria-label="open drawer"
                                onClick={this.handleDrawerToggle}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography type="title" color="inherit" noWrap>
                                ResponsiveDrawer
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Hidden mdUp>
                        <Drawer
                            type="temporary"
                            anchor={'left'}
                            open={this.state.mobileOpen}
                            onRequestClose={this.handleDrawerToggle}
                            ModalProps={{
                                keepMounted: true
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <Hidden mdDown implementation="css">
                        <Drawer
                            type="permanent"
                            open
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <main>
                        <Typography type="body1" noWrap>
                            {'You think water moves fast? You should see ice.'}
                        </Typography>
                    </main>
                </div>
            </div>
        );
    }
}

const Page = ({title}) => (
    <div className="App">
        <div className="App-header">
            <h2>{title}</h2>
        </div>
        <p className="App-intro">
            this is the {title} page.
        </p>
        <p>
            <Link to="/">Home</Link>
        </p>
        <p>
            <Link to="/about">About</Link>
        </p>
        <p>
            <Link to="/settings">Setting</Link>
        </p>
    </div>
);

const Home = () => (
    <Page title="Home"/>
);

const About = () => (
    <Page title="About"/>
);

const Settings = () => (
    <Page title="Settings"/>
);

export default App;
