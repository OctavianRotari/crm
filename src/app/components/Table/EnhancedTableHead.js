// @flow

import * as React from 'react';
import {
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
} from 'material-ui/Table';

type Props = {
    onRequestSort: Function,
    order: String,
    orderBy: String,
    tHeadData: Array<Object>
}

class EnhancedTableHead extends React.Component<Props> {
    createSortHandler = (property: String) => (event: Object) => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const { order, orderBy, tHeadData } = this.props;
        return (
            <TableHead>
                <TableRow>
                    {tHeadData.map(column => {
                        return (
                            <TableCell
                                key={column.id}
                                numeric={column.numeric}
                                padding={'none'}
                            >
                                <TableSortLabel
                                    active={orderBy === column.id}
                                    direction={order}
                                    onClick={this.createSortHandler(column.id)}
                                >
                                    {column.label}
                                </TableSortLabel>
                            </TableCell>
                        );
                    }, this)}
                </TableRow>
            </TableHead>
        );
    }
}

export default EnhancedTableHead;
