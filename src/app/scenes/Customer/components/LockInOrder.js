// @flow
import * as React from 'react';
import Typography from 'material-ui/Typography';

import Paper from '../../../components/Paper';
import PanelHeader from '../../../components/PanelHeader';
import PanelContent from '../../../components/PanelContent';

const LockInOrder = () => (
    <Paper fullHeight border>
        <PanelHeader defaultPadding>
            <Typography align="left" type="subheading">
                Lock In Order
            </Typography>
        </PanelHeader>
        <PanelContent defaultPadding headerPresent >
            <Typography type="body2">
            </Typography>
        </PanelContent>
    </Paper>
);

export default LockInOrder;
