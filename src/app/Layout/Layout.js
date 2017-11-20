// @flow
import * as React from 'react';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Toolbar from 'material-ui/Toolbar';
import MenuIcon from 'material-ui-icons/Menu';

import style from './index.style';
import Drawer from './components/Drawer';

type Props = {
    classes: Object,
    theme: Object,
    mobileLayout: Function,
    desktopLayout: Function,
    header: Function
}

type State = {
    mobileOpen: boolean,
    width: number
}

class Layout extends React.Component<Props, State> {
    state = {
        mobileOpen: false,
        width: window.innerWidth,
    }

    componentWillMount() {
        window.addEventListener('resize', this.handleWindowSizeChange);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSizeChange);
    }

    handleDrawerToggle = () => {
        this.setState({mobileOpen: !this.state.mobileOpen});
    }

    handleWindowSizeChange = () => {
        this.setState({width: window.innerWidth});
    }

    renderContent = () => {
        const { width } = this.state;
        const { mobileLayout, desktopLayout, theme } = this.props;
        const isMobile = width <= theme.breakpoints.values.sm;
        if(isMobile) {
            return mobileLayout(isMobile);
        } else {
            return desktopLayout();
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.mainContainer}>
                <div className={classes.main}>
                    <Drawer
                        mobileOpen={this.state.mobileOpen}
                        handleDrawerToggle={this.handleDrawerToggle}
                    />
                    <AppBar elevation={0} className={classes.pageHeader}>
                        <Toolbar>
                            <IconButton
                                aria-label="open drawer"
                                onClick={this.handleDrawerToggle}
                                className={classes.navIconHide}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Toolbar disableGutters style={{width: '100%'}}>
                                {this.props.header()}
                            </Toolbar>
                        </Toolbar>
                    </AppBar>
                    <div className={classes.pageContent}>
                        {this.renderContent()}
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(style, {withTheme: true})(Layout);
