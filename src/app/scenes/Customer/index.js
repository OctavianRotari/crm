// @flow
import * as React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import { Link } from 'react-router-dom';
import Grid from 'material-ui/Grid';
import BottomNavigation, { BottomNavigationButton } from 'material-ui/BottomNavigation';

import PageContent from '../../components/PageContent';
import Panel from '../../components/Panel';
import Layout from '../../Layout';

import Funnel from './components/Funnel';
import Vitals from './components/Vitals';
import Orders from './components/Orders';
import Products from './components/Products';
import Contacts from './components/Contacts';
import Notes from './components/Notes';

import MonetizationOnIcon from 'material-ui-icons/MonetizationOn';
import InfoOutlineIcon from 'material-ui-icons/InfoOutline';
import TrendingUpIcon from 'material-ui-icons/TrendingUp';
import DirectionsBikeIcon from 'material-ui-icons/DirectionsBike';
import CommentIcon from 'material-ui-icons/Comment';

import VisitsScheduled from './components/VisitsScheduled';
import RangeProposals from './components/RangeProposals';
import Visits from './components/Visits';
import FwdOrder from './components/FwdOrder';
import LockInOrder from './components/LockInOrder';

import styles from './customer.style.js';

type Props = {
    classes: Object,
    match: Object
}

type State = {
    value: string,
}

class Customer extends React.Component<Props, State> {
    state = {
        value: '0'
    }

    handleChange = (event: Object, value: string) => {
        this.setState({ value });
    };

    header = () => {
        const { id } = this.props.match.params;
        return (
            <Link to='/customers'>
                <Typography type="title" color="default" noWrap>
                    Customers / {id}
                </Typography>
            </Link>
        );
    }

    renderInfoCustomer = () => (
        <Grid container spacing={16} style={{height: '100%'}}>
            <Grid item xs={12} className={this.props.classes.halfHeight}>
                <Panel>
                    <Vitals />
                </Panel>
            </Grid>
            <Grid item xs={12} className={this.props.classes.halfHeight}>
                <Panel>
                    <Contacts />
                </Panel>
            </Grid>
        </Grid>
    );

    renderFunnel = () => (
        <Grid container spacing={8} style={{height: '100%'}}>
            <Grid item xs={12}>
                <Panel>
                    <VisitsScheduled/>
                </Panel>
            </Grid>
            <Grid item xs={12}>
                <Panel>
                    <RangeProposals/>
                </Panel>
            </Grid>
            <Grid item xs={12}>
                <Panel>
                    <Visits/>
                </Panel>
            </Grid>
            <Grid item xs={12}>
                <Panel>
                    <FwdOrder/>
                </Panel>
            </Grid>
            <Grid item xs={12}>
                <Panel>
                    <LockInOrder/>
                </Panel>
            </Grid>
        </Grid>
    )

    mobileLayout = () => {
        return (
            <PageContent>
                <Panel padding='16' mobileNavPresent>
                    { this.state.value === '0' && this.renderFunnel() }
                    { this.state.value === '1' && <Orders /> }
                    { this.state.value === '2' && this.renderInfoCustomer() }
                    { this.state.value === '3' && <Products /> }
                    { this.state.value === '4' && <Notes /> }
                </Panel>
                <BottomNavigation
                    value={this.state.value}
                    showLabels
                    onChange={this.handleChange}
                >
                    <BottomNavigationButton label='Funel' value='0' icon={<InfoOutlineIcon />} />
                    <BottomNavigationButton label='Vitals' value='1' icon={<TrendingUpIcon />} />
                    <BottomNavigationButton label='Orders' value='2' icon={<MonetizationOnIcon />} />
                    <BottomNavigationButton label='Products' value='3' icon={<DirectionsBikeIcon />} />
                    <BottomNavigationButton label='Notes' value='4' icon={<CommentIcon/>} />
                </BottomNavigation>
            </PageContent>
        );
    }

    desktopLayout = () => {
        const { classes } = this.props;
        return (
            <Grid container spacing={16} className={classes.fullHeight}>
                <Grid item sm={12} className={classes.pageHeader}>
                    <Funnel />
                </Grid>
                <Grid item sm={12} className={classes.pageContent}>
                    <Grid container spacing={16} className={classes.fullHeight}>
                        <Grid item sm={8} className={classes.fullHeight}>
                            <Grid container spacing={16} className={classes.fullHeight}>
                                <Grid item sm={4} className={classes.halfHeight}>
                                    <Vitals />
                                </Grid>
                                <Grid item sm={8} className={classes.halfHeight}>
                                    <Orders />
                                </Grid>
                                <Grid item sm={4} className={classes.halfHeight}>
                                    <Contacts />
                                </Grid>
                                <Grid item sm={8} className={classes.halfHeight}>
                                    <Products />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item sm={4} className={classes.fullHeight}>
                            <Notes />
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

export default withStyles(styles)(Customer);
