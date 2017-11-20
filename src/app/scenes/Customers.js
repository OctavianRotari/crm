// @flow
import * as React from 'react';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import Panel from '../components/Panel';
import PageContent from '../components/PageContent';
import Layout from '../Layout';
import Table from '../components/Table';
import SearchBar from '../components/SearchBar';

import customersData from '../dummyData/customers.json';

const columnData = [
    { id: 'customer', disablePadding: false, label: 'Customer' },
    { id: 'fwd', disablePadding: false, label: 'FWD' },
    { id: 'visits', disablePadding: false, label: 'Visits' },
    { id: 'last', disablePadding: false, label: 'Last' },
    { id: 'planned', disablePadding: false, label: 'Planned' },
    { id: 'rotation', disablePadding: false, label: 'Rotation' },
    { id: 'margin', disablePadding: false, label: 'Margin' },
    { id: 'pos', disablePadding: false, label: 'POS' },
    { id: 'credit', disablePadding: false, label: 'Credit' },
    { id: 'status', disablePadding: false, label: 'Status' },
    { id: 'pareto', disablePadding: true, label: 'Pareto' },
];

const columnDataMobile = [
    { id: 'customer', disablePadding: false, label: 'Customer' },
    { id: 'pareto', disablePadding: true, label: 'Pareto' },
];

type Props = {
    history: Array<any>
}

type State = {
    data: Array<Object>
}

class Customers extends React.Component<Props, State> {
    state = {
        data: [],
    }

    componentWillMount() {
        this.setState({data: customersData});
    }

    handleItemClick = (event: Object, id: number) => {
        this.props.history.push(`/customer/${id}`);
    }

    header = () => {
        return (
            <Toolbar disableGutters style={{width: '100%'}}>
                <Typography type="title" color="default" noWrap>
                    Customers
                </Typography>
                <SearchBar
                    position="right"
                    inputPosition='left'
                    text="left"
                    data={this.state.data}
                    onSearch={data => this.setState({data})}
                />
            </Toolbar>
        );
    }

    mobileLayout = () => {
        const { data } = this.state;
        return (
            <PageContent>
                <Panel padding='8'>
                    <Table
                        displayOnly={['customer', 'pareto']}
                        data={data}
                        tHeadData={columnDataMobile}
                        handleClick={this.handleItemClick}
                    />
                </Panel>
            </PageContent>
        );
    }

    desktopLayout = () => {
        const { data } = this.state;
        return (
            <PageContent>
                <Panel padding='16'>
                    <Table
                        displayOnly='all'
                        data={data}
                        tHeadData={columnData}
                        handleClick={this.handleItemClick}
                    />
                </Panel>
            </PageContent>
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

export default Customers;
