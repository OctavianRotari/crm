// @flow
import * as React from 'react';
import Typography from 'material-ui/Typography';

import Paper from '../../../components/Paper';
import PanelContent from '../../../components/PanelContent';
import PanelHeader from '../../../components/PanelHeader';

const Tips = () => (
    <Paper fullHeight border>
        <PanelHeader defaultPadding>
            <Typography align="center" type="title">
                Tips
            </Typography>
        </PanelHeader>
        <PanelContent defaultPadding>
            <Typography align="center" type="body1">
                Believe in yourself and what you're adoing to help your customer.
            </Typography>
        </PanelContent>
    </Paper>
);

export default Tips;
