// @flow
import * as React from 'react';
import Typography from 'material-ui/Typography';
import Toolbar from 'material-ui/Toolbar';

import Panel from '../components/Panel';
import PageContent from '../components/PageContent';
import Table from '../components/Table';
import Layout from '../Layout';
import SearchBar from '../components/SearchBar';

import productsData from '../dummyData/products.json';

const columnData = [
    { id: 'name', disablePadding: false, label: 'Name' },
    { id: 'category', disablePadding: false, label: 'Category' },
    { id: 'price', disablePadding: false, label: 'Price' },
    { id: 'rrp', disablePadding: false, label: 'RRP' },
    { id: 'margin', disablePadding: false, label: 'Margin' },
    { id: 'rotation', disablePadding: false, label: 'Rotation' },
    { id: 'status', disablePadding: false, label: 'Status' },
];

const columnDataMobile = [
    { id: 'name', disablePadding: false, label: 'Name' },
    { id: 'margin', disablePadding: false, label: 'Margin' },
];

type Props = {
    history: Object,
    classes: Object
}

type State = {
    data: Array<any>
}

class Products extends React.Component<Props, State> {
    state = {
        data: [],
    };

    componentWillMount() {
        this.setState({data: productsData});
    }


    handleItemClick = (event: Object, id: number) => {
        this.props.history.push(`/product/${id}`);
    }

    header = () => {
        return (
            <Toolbar disableGutters style={{width: '100%'}}>
                <Typography type="title" color="default" noWrap>
                    Products
                </Typography>
                <SearchBar
                    position="right"
                    inputPosition='left'
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
                        displayOnly={['name', 'rotation']}
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

export default Products;
