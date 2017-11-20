// @flow
import * as React from 'react';
import BottomNavigation, { BottomNavigationButton } from 'material-ui/BottomNavigation';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Toolbar from 'material-ui/Toolbar';
import Input from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';

import AcUnitIcon from 'material-ui-icons/AcUnit';
import WbSunnyIcon from 'material-ui-icons/WbSunny';
import MonetizationOnIcon from 'material-ui-icons/MonetizationOn';
import DirectionsCarIcon from 'material-ui-icons/DirectionsCar';
import TrendingUpIcon from 'material-ui-icons/TrendingUp';

import styles from '../index.style';
import Layout from '../../Layout';
import PageContent from '../../components/PageContent';
import Panel from '../../components/Panel';
import Paper from '../../components/Paper';

import Chart from './components/Chart';

import Margin from './components/Margin';
import Rotation from './components/Rotation';

import chartData from '../../dummyData/charts.json';

type Props = {
    classes: Object
}

type State = {
    value: string,
    alias: string
}

class Dashboard extends React.Component<Props, State> {
    state = {
        value: '0',
        alias: 'uk-peers'
    }

    handleChange = (name: string) => (event: Object) => {
        this.setState({ [name]: event.target.value });
    };

    handleNavigation = (event: Object, value: string) => {
        this.setState({ value });
    }

    renderVitals = () => (
        <Grid container spacing={16} style={{height: '100%'}}>
            <Grid item xs={12} className={this.props.classes.halfHeight}>
                <Paper border padding='16'>
                    <Margin />
                </Paper>
            </Grid>
            <Grid item xs={12} className={this.props.classes.halfHeight}>
                <Paper border padding='16'>
                    <Rotation/>
                </Paper>
            </Grid>
        </Grid>
    )

    header = () => (
        <Toolbar disableGutters style={{width: '100%'}}>
            <Typography type="title" color="default" noWrap>
                Dashboard
            </Typography>
            <FormControl style={ { display: 'flex', position: 'relative', padding: 0, marginLeft: 'auto'} } >
                <Select
                    disableUnderline
                    autoWidth
                    value={this.state.alias}
                    onChange={this.handleChange('alias')}
                    input={<Input id="compareTo" />}
                >
                    <MenuItem value='uk-peers'>UK peers</MenuItem>
                    <MenuItem value='us-peers'>US Peers</MenuItem>
                    <MenuItem value='James Cant'>James Cant</MenuItem>
                </Select>
            </FormControl>
        </Toolbar>
    );

    mobileLayout = (isMobile: boolean) => (
        <PageContent>
            <Panel mobileNavPresent>
                { this.state.value === '0' && <Chart header='S/S FWD Orders' data={chartData.data.springSummer} alias={this.state.alias} isMobile={isMobile}/> }
                { this.state.value === '1' && <Chart header='A/W FWD Orders' data={chartData.data.autumnWinter} alias={this.state.alias} isMobile={isMobile}/> }
                { this.state.value === '2' && <Chart header='YTD FWD Orders' data={chartData.data.yearToDateOrders} alias={this.state.alias} isMobile={isMobile}/> }
                { this.state.value === '3' && <Chart header='Visits' data={chartData.data.visits} alias={this.state.alias} isMobile={isMobile}/> }
                { this.state.value === '4' && this.renderVitals() }
            </Panel>
            <BottomNavigation
                value={this.state.value}
                showLabels
                onChange={this.handleNavigation}
            >
                <BottomNavigationButton label='S/S FWD' value='0' icon={<WbSunnyIcon />} />
                <BottomNavigationButton label='YTD' value='1' icon={<MonetizationOnIcon />} />
                <BottomNavigationButton label='A/W FWD' value='2' icon={<AcUnitIcon />} />
                <BottomNavigationButton label='Visits' value='3' icon={<DirectionsCarIcon/>} />
                <BottomNavigationButton label='Vitals' value='4' icon={<TrendingUpIcon/>} />
            </BottomNavigation>
        </PageContent>
    );

    desktopLayout = () => (
        <Grid container spacing={16} style={{height: '100%'}}>
            <Grid item sm={6} className={this.props.classes.halfHeight}>
                <Chart header='S/S FWD Orders' data={chartData.data.springSummer} alias={this.state.alias} />
            </Grid>
            <Grid item sm={6} className={this.props.classes.halfHeight}>
                <Chart header='A/W FWD Orders' data={chartData.data.autumnWinter} alias={this.state.alias} />
            </Grid>
            <Grid item sm={6} className={this.props.classes.halfHeight}>
                <Chart header='YTD FWD Orders' data={chartData.data.yearToDateOrders} alias={this.state.alias} />
            </Grid>
            <Grid item sm={6} className={this.props.classes.halfHeight}>
                <Grid
                    container
                    spacing={16}
                    className={this.props.classes.fullHeight}
                >
                    <Grid item sm={12} style={{height: 'calc(100% - 100px)'}}>
                        <Chart header='Visits' data={chartData.data.visits} alias={this.state.alias} />
                    </Grid>
                    <Grid item sm={6} style={{height: '100px'}}>
                        <Margin/>
                    </Grid>
                    <Grid item sm={6} style={{height: '100px'}}>
                        <Rotation/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )

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

export default withStyles(styles)(Dashboard);
