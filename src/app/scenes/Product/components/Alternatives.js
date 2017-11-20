// @flow

import * as React from 'react';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import Table from '../../../components/Table';
import namor from 'namor';

import Panel from '../../../components/Panel';
import PanelContent from '../../../components/PanelContent';
import PanelHeader from '../../../components/PanelHeader';

const columnData = [
    { id: 'id', disablePadding: true, label: 'Id' },
    { id: 'name', disablePadding: false, label: 'Name' },
    { id: 'category', disablePadding: false, label: 'Category' },
    { id: 'price', disablePadding: false, label: 'Price' },
    { id: 'rrp', disablePadding: false, label: 'RRP' },
    { id: 'margin', disablePadding: false, label: 'Margin' }
];


const range = len => {
    const arr = [];
    for (let i = 0; i < len; i++) {
        arr.push(i);
    }
    return arr;
};

const newProduct = () => {
    const statusChance = Math.random();
    return {
        name: namor.generate({ words: 1, numbers: 0 }).toUpperCase(),
        category: namor.generate({ words: 1, numbers: 0 }).toUpperCase(),
        price: `£ ${Math.floor(Math.random() * 200)}`,
        rrp: `£ ${Math.floor(Math.random() * 200)}`,
        margin:  statusChance > 0.66 ? 'Good' : statusChance > 0.33 ? 'V. Good' : 'Bad'
    };
};

function makeData(len = 253): Array<any> {
    return range(len).map((i) => {
        return {
            id: i,
            ...newProduct(),
        };
    });
}

type Props = {
    classes: Object
}

type State = {
    data: Array<any>
}

class Alternatives extends React.Component<Props, State> {
    state = {
        data: makeData(),
    };

    render() {
        return (
            <Panel>
                <PanelHeader
                    verticalCenter
                    flex
                    defaultHeight
                >
                    <Typography align="left" type="title">
                        Alternatives
                    </Typography>
                </PanelHeader>
                <Divider/>
                <PanelContent headerPresent>
                    <Table withoutHeader data={this.state.data} tHeadData={columnData}/>
                </PanelContent>
            </Panel>
        );
    }
}

export default Alternatives;
