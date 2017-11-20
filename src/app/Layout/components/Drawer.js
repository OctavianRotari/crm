// @flow
import * as React from 'react';
import { withStyles } from 'material-ui/styles';
import MuiDrawer from 'material-ui/Drawer';
import Hidden from 'material-ui/Hidden';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { Link } from 'react-router-dom';
import Divider from 'material-ui/Divider';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';

import GpsFixedIcon from 'material-ui-icons/GpsFixed';
import StoreIcon from 'material-ui-icons/Store';
import PeopleIcon from 'material-ui-icons/People';
import TodayIcon from 'material-ui-icons/Today';
import FlagIcon from 'material-ui-icons/Flag';

import style from './drawer.style.js';
import CardProfile from './Card';

type Props = {
    classes: Object,
    theme: Object,
    handleDrawerToggle: Function,
    mobileOpen: boolean,
    location: Object
}

type State = { }

const icons = {
    'GpsFixedIcon': GpsFixedIcon,
    'StoreIcon': StoreIcon,
    'PeopleIcon': PeopleIcon,
    'TodayIcon': TodayIcon,
    'FlagIcon': FlagIcon
};

const navigationLinks = [
    {
        to: '/dashboard',
        label: 'Performance',
        icon: 'GpsFixedIcon'
    },
    {
        to: '/activity',
        label: 'Activity',
        icon: 'FlagIcon'
    },
    {
        to: '/customers',
        label: 'Customers',
        icon: 'PeopleIcon'
    },
    {
        to: '/products',
        label: 'Products',
        icon: 'StoreIcon'
    },
    {
        to: '/schedule',
        label: 'Schedule',
        icon: 'TodayIcon'
    },
];

const externalLinks = [
    {
        to: 'https://www.endurasport.com/',
        label: 'Extranet',
    },
    {
        to: 'https://www.endurasport.com/',
        label: 'B2B',
    },
    {
        to: 'https://www.endurasport.com/',
        label: 'Custom',
    },
];

class Drawer extends React.Component<Props, State> {
    renderNavList = () => {
        return navigationLinks.map((link, i) => {
            const Icon = icons[link.icon];
            const isActive = link.to === this.props.location.pathname && this.props.classes.buttonActive;
            return (
                <Link to={link.to} key={i}>
                    <ListItem button classes={{button: classNames(this.props.classes.buttonRoot, isActive)}}>
                        <ListItemIcon classes={{root: this.props.classes.listItemIcon}}>
                            <Icon />
                        </ListItemIcon>
                        <ListItemText classes={{text: this.props.classes.listItemText}} primary={link.label} />
                    </ListItem>
                </Link>
            );
        });
    }

    renderExternalLinks = () => {
        const { classes } = this.props;
        return externalLinks.map((link, i) => (
            <a href={link.to} key={i}>
                <ListItem
                    button
                    classes={{button: classNames(classes.buttonRoot)}}
                    style={{paddingLeft: 55}}
                >
                    <ListItemText classes={{text: classes.listItemText}} primary={link.label} />
                </ListItem>
            </a>
        ));
    }

    render() {
        const { classes, theme, handleDrawerToggle, mobileOpen } = this.props;
        return (
            <div className={classes.mainNavigation}>
                <Hidden mdUp>
                    <MuiDrawer
                        type="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        classes={{ paper: classes.navList }}
                        onRequestClose={handleDrawerToggle}
                        ModalProps={{keepMounted: true}}
                    >
                        <CardProfile/>
                        <List>
                            {this.renderNavList()}
                            <Divider style={{backgroundColor: 'white'}}/>
                            {this.renderExternalLinks()}
                        </List>
                    </MuiDrawer>
                </Hidden>
                <Hidden mdDown implementation="css">
                    <MuiDrawer
                        type="permanent"
                        open
                        classes={{ paper: classes.navList }}
                    >
                        <CardProfile/>
                        <List>
                            {this.renderNavList()}
                            <Divider style={{backgroundColor: 'white'}}/>
                            {this.renderExternalLinks()}
                        </List>
                    </MuiDrawer>
                </Hidden>
            </div>
        );
    }
}

export default withStyles(style, {withTheme: true})(withRouter(Drawer));
