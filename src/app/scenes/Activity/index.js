// @flow
import * as React from 'react';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import BottomNavigation, { BottomNavigationButton } from 'material-ui/BottomNavigation';

import DirectionsCarIcon from 'material-ui-icons/DirectionsCar';
import ShareIcon from 'material-ui-icons/Share';
import NotificationActiveIcon from 'material-ui-icons/NotificationsActive';
import PeopleIcon from 'material-ui-icons/People';

import Layout from '../../Layout';
import PageContent from '../../components/PageContent';
import Panel from '../../components/Panel';

import Tips from './components/Tips';
import Alerts from './components/Alerts';
import Visits from './components/Visits';
import CustomerChanges from './components/CustomerChanges';
import Social from './components/Social';

import styles from '../index.style';

type Props = {
    classes: Object
}

type State = {
    value: string,
}

class ActivityTab extends React.Component<Props, State> {
    state = {
        value: '0'
    }

    handleChange = (event: Object, value: string) => {
        this.setState({ value });
    };

    renderTipsAlerts = () => (
        <Grid container spacing={16} style={{height: '100%'}}>
            <Grid item xs={12} className={this.props.classes.halfHeight}>
                <Panel>
                    <Tips/>
                </Panel>
            </Grid>
            <Grid item xs={12} className={this.props.classes.halfHeight}>
                <Panel>
                    <Alerts/>
                </Panel>
            </Grid>
        </Grid>
    );

    header = () => (
        <Typography type="title" color="default" noWrap>
            Activity
        </Typography>
    )

    mobileLayout = () => {
        return (
            <PageContent>
                <Panel padding="16" mobileNavPresent>
                    { this.state.value === '0' && <Visits /> }
                    { this.state.value === '1' && this.renderTipsAlerts() }
                    { this.state.value === '2' && <CustomerChanges/> }
                    { this.state.value === '3' && <Social /> }
                </Panel>
                <BottomNavigation
                    value={this.state.value}
                    showLabels
                    onChange={this.handleChange}
                >
                    <BottomNavigationButton label='Visits' value='0' icon={<DirectionsCarIcon />} />
                    <BottomNavigationButton label='Tips & Alerts' value='1' icon={<NotificationActiveIcon />} />
                    <BottomNavigationButton label='Changes' value='2' icon={<PeopleIcon />} />
                    <BottomNavigationButton label='Social' value='3' icon={<ShareIcon/>} />
                </BottomNavigation>
            </PageContent>
        );
    }

    desktopLayout = () => {
        return (
            <Grid container spacing={16} style={{height: 'calc(100% + 16px)'}}>
                <Grid item sm={12}>
                    <Grid container spacing={16}>
                        <Grid item sm={6}>
                            <Tips />
                        </Grid>
                        <Grid item sm={6}>
                            <Alerts />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sm={12} style={{height: 'calc(100% - 105px)'}}>
                    <Grid container spacing={16} style={{height: 'calc(100% + 16px)'}}>
                        <Grid item sm={4}>
                            <Visits />
                        </Grid>
                        <Grid item sm={4}>
                            <CustomerChanges />
                        </Grid>
                        <Grid item sm={4}>
                            <Social />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }

    render() {
        return (
            <Layout
                header={this.header}
                desktopLayout={this.desktopLayout}
                mobileLayout={this.mobileLayout}
            />
        );
    }
}


export default withStyles(styles)(ActivityTab);
