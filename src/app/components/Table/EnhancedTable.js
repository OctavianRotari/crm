// @flow
import * as React from 'react';
import _ from 'lodash';
import Table, {
    TableBody,
    TableCell,
    TableRow,
} from 'material-ui/Table';
import { withStyles } from 'material-ui/styles';

import EnhancedTableHead from './EnhancedTableHead';

const stylesTable = (theme) => ({
    tableWrapper: {
        width: '100%',
        height: '100%',
        overflowY: 'scroll',
    },
    tableCellRoot: {
        ...theme.typography.body1,
        color: '#26364A'
    }
});

type DisplayOnly = { type: 'all' } | { type: Array<string> }

type Props = {
    data: Array<Object>,
    tHeadData: Array<Object>,
    handleClick: Function,
    withoutHeader?: boolean,
    displayOnly: DisplayOnly,
    classes: Object
}

type State = {
    order: any,
    orderBy: any,
    data: Array<Object> | Array<any>
}

class EnhancedTable extends React.Component<Props, State> {
    static defaultProps = {
        handleClick: () => {},
        withoutHeader: false,
        displayOnly: 'all'
    }

    state = {
        order: 'asc',
        orderBy: 'customer',
        data: []
    };

    componentWillMount() {
        this.setState({data: this.props.data});
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            data: nextProps.data.sort((a, b) => (a.customer < b.customer ? -1 : 1))
        });
    }

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        const data = order === 'desc' ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)) : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

        this.setState({ data, order, orderBy });
    };

    renderCells = (n) => {
        const { displayOnly } = this.props;
        return _.map(n, (cell, i) => {
            if(i !== 'id') {
                // needs refactor
                if(displayOnly !== 'all' && _.includes(displayOnly, i)) {
                    return (
                        <TableCell
                            key={i}
                            padding="none"
                            classes={{root: this.props.classes.tableCellRoot}}
                        >
                            { typeof(cell) === 'string' ? cell.substring(0, 10) : cell.toString()}
                        </TableCell>
                    );
                } else if (displayOnly === 'all') {
                    return (
                        <TableCell
                            key={i}
                            padding="none"
                            classes={{root: this.props.classes.tableCellRoot}}
                        >
                            { typeof(cell) === 'string' ? cell.substring(0, 10) : cell.toString()}
                        </TableCell>
                    );
                }
            }
            return;
        });
    }

    render() {
        const { classes, tHeadData, withoutHeader } = this.props;
        const { order, orderBy, data } = this.state;
        return (
            <div className={classes.tableWrapper}>
                <Table>
                    { !withoutHeader && <EnhancedTableHead
                        tHeadData={tHeadData}
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={this.handleRequestSort}
                        rowCount={data.length}
                    />
                    }
                    <TableBody>
                        {data.map((n, i) => {
                            return (
                                <TableRow
                                    key={i}
                                    hover
                                    onClick={event => this.props.handleClick(event, n.id)}
                                    role="checkbox"
                                    tabIndex={-1}
                                    style={{cursor: 'pointer'}}
                                >
                                    {this.renderCells(n)}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        );
    }
}

export default withStyles(stylesTable)(EnhancedTable);
