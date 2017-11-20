// @flow

import * as React from 'react';
import Typography from 'material-ui/Typography';
import Tabs, { Tab } from 'material-ui/Tabs';
import namor from 'namor';
import { withStyles } from 'material-ui/styles';
import Divider from 'material-ui/Divider';

import Panel from '../../../components/Panel';
import Table from '../../../components/Table';
import PanelHeader from '../../../components/PanelHeader';
import PanelContent from '../../../components/PanelContent';
import Breakdown from './Breakdown';

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

const styles = (theme) => ({
    tabsRoot: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        display: 'flex',
        width: '100%',
    },
    tabsFlexContainer: {
        height: theme.spacing.unit + 4,
    },
    tabRoot: {
        width: 'auto',
        height: theme.spacing.unit,
        minWidth: 0,
        [theme.breakpoints.up('md')]: {
            minWidth: 0,
        },
    },
    rootInheritSelected: {
        color: theme.palette.primary[500]
    },
    labelContainer: {
        padding: 'inherit',
        paddingLeft: theme.spacing.unit / 2
    },
    label: {
        fontSize: 9
    },
    indicator: {
        width: 0,
        height: 0,
    }
});

type Props = {
    classes: Object
}

type State = {
    value: number,
    data: Array<any>
}

class Products extends React.Component<Props, State> {
    state = {
        data: makeData(),
        value: 0
    };

    handleChange = (event: Object, value: number) => {
        this.setState({value});
    }

    renderTableProducts = () => (
        <Panel>
            <Table withoutHeader data={this.state.data} tHeadData={columnData}/>
        </Panel>
    )

    render() {
        const { value } = this.state;
        const { classes } = this.props;
        return (
            <Panel>
                <PanelHeader verticalCenter flex defaultHeight>
                    <Typography align="left" type="title">
                        Products
                    </Typography>
                    <Tabs
                        value={value}
                        onChange={this.handleChange}
                        indicatorClassName={classes.indicator}
                        classes={
                            {
                                root: classes.tabsRoot,
                                flexContainer: classes.tabsFlexContainer
                            }
                        }
                        fullWidth
                    >
                        <Tab
                            classes={
                                {
                                    root: classes.tabRoot,
                                    labelContainer: classes.labelContainer,
                                    rootInheritSelected: classes.rootInheritSelected,
                                    label: classes.label
                                }
                            }
                            label="Breakdown"
                        />
                        <Tab
                            classes={
                                {
                                    root: classes.tabRoot,
                                    labelContainer: classes.labelContainer,
                                    rootInheritSelected: classes.rootInheritSelected,
                                    label: classes.label,
                                }
                            }
                            label="Current Stock"
                        />
                        <Tab
                            classes={
                                {
                                    root: classes.tabRoot,
                                    labelContainer: classes.labelContainer,
                                    rootInheritSelected: classes.rootInheritSelected,
                                    label: classes.label
                                }
                            }
                            label="Top 10"
                        />
                        <Tab
                            classes={
                                {
                                    root: classes.tabRoot,
                                    labelContainer: classes.labelContainer,
                                    rootInheritSelected: classes.rootInheritSelected,
                                    label: classes.label
                                }
                            }
                            label="Top Missing"
                        />
                    </Tabs>
                </PanelHeader>
                <Divider/>
                <PanelContent headerPresent>
                    { value === 0 && <Breakdown/> }
                    { value === 1 && this.renderTableProducts() }
                    { value === 2 && this.renderTableProducts() }
                    { value === 3 && this.renderTableProducts() }
                </PanelContent>
            </Panel>
        );
    }
}

export default withStyles(styles)(Products);
