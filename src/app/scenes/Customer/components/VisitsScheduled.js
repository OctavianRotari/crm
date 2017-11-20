// @flow
import * as React from 'react';
import Typography from 'material-ui/Typography';

import Paper from '../../../components/Paper';
import PanelContent from '../../../components/PanelContent';
import PanelHeader from '../../../components/PanelHeader';

const VisitsScheduled = () => (
    <Paper fullHeight border>
        <PanelHeader defaultPadding>
            <Typography align="left" type="subheading">
                Visits Scheduled
            </Typography>
        </PanelHeader>
        <PanelContent defaultPadding headerPresent >
            <Typography type="body2">
                Focus will by forward order but we’d like
                to increase of POS size
            </Typography>
        </PanelContent>
    </Paper>
);

export default VisitsScheduled;
