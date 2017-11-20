// @flow
import * as React from 'react';
import Typography from 'material-ui/Typography';

import Paper from '../../../components/Paper';
import PanelContent from '../../../components/PanelContent';
import PanelHeader from '../../../components/PanelHeader';

const Alerts = () => (
    <Paper fullHeight border warning>
        <PanelHeader defaultPadding>
            <Typography style={{color: 'white'}} align="center" type="title">
                Alert
            </Typography>
        </PanelHeader>
        <PanelContent defaultPadding>
            <Typography style={{color: 'white'}} align="center" type="body1">
                MTVB 500 Helmet II arrived in UK warehourse and being prepared for shipping to customers.
            </Typography>
        </PanelContent>
    </Paper>
);

export default Alerts;
