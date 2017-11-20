// @flow
import * as React from 'react';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Toolbar from 'material-ui/Toolbar';
import MenuIcon from 'material-ui-icons/Menu';
import sizeMe from 'react-sizeme';

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

type State = {
    width: null | number,
    height: null | number,
}

class Layout extends React.Component<Props, State> {
    static defaultProps = {
    }

    state = {
        width: null,
        height: null,
        isMobile: false
    };

    componentWillMount() {
        const { height, width } = this.props.size;
        if(height, width) {
            this.setState({height, width});
        }
        window.addEventListener('resize', this.handleWindowSizeChange);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSizeChange);
    }

    handleDrawerToggle = () => {
        this.setState({mobileOpen: !this.state.mobileOpen});
    }

    handleWindowSizeChange = () => {
        const { height, width } = this.props.size;
        this.setState({width});
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


const sizeMeConfig = {
    monitorWidth: true,
    monitorHeight: true
};

const sizeMeHOC = sizeMe(sizeMeConfig);

export default sizeMeHOC(withStyles(style, {withTheme: true})(Layout));
