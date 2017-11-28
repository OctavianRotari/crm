// @flow
import * as React from 'react';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import BottomNavigation, { BottomNavigationButton } from 'material-ui/BottomNavigation';

import TodayIcon from 'material-ui-icons/Today';
import DateRangeIcon from 'material-ui-icons/DateRange';

import Panel from '../../components/Panel';
import Layout from '../../Layout';
import PageContent from '../../components/PageContent';

import Calendar from './components/Calendar';
import Agenda from './components/Agenda';

type Props = {}

type State = {
    slotInfo: {},
    value: string
}

function CalendarExeption(message, error) {
    this.message = message;
    this.error = error;
    this.name = 'CalendarExeption';
}

class Schedule extends React.Component<Props, State> {
    state = {
        slotInfo: {},
        value: '0'
    }

    componentDidCatch(error, info) {
        this.setState({hasError: true}, () => {
            throw {info, error};
        })
    }

    header = () => (
        <Typography type="title" color="default" noWrap>
            Calendar
        </Typography>
    );

    handleOnClickDate = (slotInfo: Object) => {
        const isMobile = this.layoutContainer.offsetWidth <= 600;
        this.setState({slotInfo}, () => {
            if(isMobile) {
                this.handleChange({}, '1');
            }
        });
    }

    handleChange = (event: Object, value: string) => {
        this.setState({ value });
    };

    desktopLayout = () => (
        <Grid
            container
            spacing={16}
            style={{height: '100%'}}
        >
            <Grid item md={6} sm={12}>
                <Calendar onClickDate={this.handleOnClickDate}/>
            </Grid>
            <Grid item md={6} sm={12}>
                <Agenda slotInfo={this.state.slotInfo}/>
            </Grid>
        </Grid>
    );

    mobileLayout = () => (
        <PageContent>
            <Panel padding='16' mobileNavPresent>
                { this.state.value === '0' && <Calendar onClickDate={this.handleOnClickDate}/> }
                { this.state.value === '1' && <Agenda slotInfo={this.state.slotInfo}/> }
            </Panel>
            <BottomNavigation
                value={this.state.value}
                showLabels
                onChange={this.handleChange}
            >
                <BottomNavigationButton label='Calendar' value='0' icon={<TodayIcon />} />
                <BottomNavigationButton label='Agenda' value='1' icon={<DateRangeIcon />} />
            </BottomNavigation>
        </PageContent>
    );

    render() {
        if(this.state.hasError) {
            return <h1>Something went wrong</h1>
        }
        return (
            <Layout
                ref={node => {this.layoutContainer = node}}
                header={this.header}
                desktopLayout={this.desktopLayout}
                mobileLayout={this.mobileLayout}
            />
        );
    }
}

export default Schedule;
