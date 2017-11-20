// @flow

import * as React from 'react';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';

import Panel from '../../../components/Panel';
import Table from '../../../components/Table';
import PanelContent from '../../../components/PanelContent';
import PanelHeader from '../../../components/PanelHeader';

import customerOrders from '../../../dummyData/customerOrders.json';

const columnData = [
    { id: 'sum', disablePadding: true, label: 'Sum' },
    { id: 'date', disablePadding: false, label: 'Date' },
    { id: 'margin', disablePadding: false, label: 'Margin' },
    { id: 'rotation', disablePadding: true, label: 'Rotation' },
];

type Props = {}
type State = {
    data: Array<any>
}

class Orders extends React.Component<Props, State> {
    state = {
        data: customerOrders
    }

    render() {
        const { data } = this.state;
        return (
            <Panel>
                <PanelHeader verticalCenter flex defaultHeight>
                    <Typography align="left" type="title">
                        Orders
                    </Typography>
                </PanelHeader>
                <Divider/>
                <PanelContent headerPresent >
                    <Table withoutHeader data={data} tHeadData={columnData}/>
                </PanelContent>
            </Panel>
        );
    }
}

export default Orders;
