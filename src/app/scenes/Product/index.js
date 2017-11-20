// @flow
import * as React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import { Link } from 'react-router-dom';
import Grid from 'material-ui/Grid';
import BottomNavigation, { BottomNavigationButton } from 'material-ui/BottomNavigation';

import TrendingUpIcon from 'material-ui-icons/TrendingUp';
import MonetizationOnIcon from 'material-ui-icons/MonetizationOn';
import PhotoLibraryIcon from 'material-ui-icons/PhotoLibrary';

import styles from '../index.style';

import PageContent from '../../components/PageContent';
import Panel from '../../components/Panel';
import Layout from '../../Layout';
import Vitals from './components/Vitals';
import Markenting from './components/Marketing';
import Alternatives from './components/Alternatives';
import Gallery from './components/Gallery';

type Props = {
    classes: Object,
    match: Object
}

type State = {
    value: string,
}

class Product extends React.Component<Props, State> {
    state = {
        value: '0'
    }

    handleChange = (event: Object, value: string) => {
        this.setState({ value });
    };

    renderVitalsAlternatives = () => (
        <Grid container spacing={16} style={{height: '100%'}}>
            <Grid item xs={12} className={this.props.classes.halfHeight}>
                <Panel>
                    <Vitals />
                </Panel>
            </Grid>
            <Grid item xs={12} className={this.props.classes.halfHeight}>
                <Panel>
                    <Alternatives />
                </Panel>
            </Grid>
        </Grid>
    );

    header = () => {
        const { id } = this.props.match.params;
        return (
            <Link to='/products'>
                <Typography type="title" color="default" noWrap>
                    Products / { id }
                </Typography>
            </Link>
        );
    }

    mobileLayout = () => {
        return (
            <PageContent>
                <Panel padding="16" mobileNavPresent>
                    { this.state.value === '0' && this.renderVitalsAlternatives() }
                    { this.state.value === '1' && <Markenting /> }
                    { this.state.value === '2' && <Gallery /> }
                </Panel>
                <BottomNavigation
                    value={this.state.value}
                    showLabels
                    onChange={this.handleChange}
                >
                    <BottomNavigationButton label='Vitals' value='0' icon={<TrendingUpIcon />} />
                    <BottomNavigationButton label='Marketing' value='1' icon={<MonetizationOnIcon />} />
                    <BottomNavigationButton label='Gallery' value='2' icon={<PhotoLibraryIcon />} />
                </BottomNavigation>
            </PageContent>
        );
    }

    desktopLayout = () => (
        <PageContent>
            <Grid container spacing={16} style={{height: '100%'}}>
                <Grid item sm={12} style={{height: '50%'}}>
                    <Grid container spacing={16} style={{height: '100%'}}>
                        <Grid item sm={4}>
                            <Vitals />
                        </Grid>
                        <Grid item sm={4}>
                            <Markenting />
                        </Grid>
                        <Grid item sm={4}>
                            <Alternatives />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sm={12} style={{height: '50%'}}>
                    <Grid container spacing={16} style={{height: '100%'}}>
                        <Grid item sm={12}>
                            <Gallery />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </PageContent>
    );

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

export default withStyles(styles)( Product);
