// @flow
import * as React from 'react';
import Typography from 'material-ui/Typography';

import Paper from '../../../components/Paper';
import PanelHeader from '../../../components/PanelHeader';
import PanelContent from '../../../components/PanelContent';

const FwdOrder = () => (
    <Paper fullHeight border>
        <PanelHeader defaultPadding>
            <Typography align="left" type="subheading">
                FWD Order
            </Typography>
        </PanelHeader>
        <PanelContent defaultPadding headerPresent >
            <Typography type="body2">
                Last contact: 2 days ago
                Customer viewed fwd order: 4 days ago
            </Typography>
        </PanelContent>
    </Paper>
);

export default FwdOrder;
