// @flow
import * as React from 'react';
import Typography from 'material-ui/Typography';

import Paper from '../../../components/Paper';
import PanelHeader from '../../../components/PanelHeader';
import PanelContent from '../../../components/PanelContent';

const RangeProposals = () => (
    <Paper fullHeight border>
        <PanelHeader defaultPadding>
            <Typography align="left" type="subheading">
                Range Proposal
            </Typography>
        </PanelHeader>
        <PanelContent defaultPadding headerPresent >
            <Typography type="body2">
                Proposal: £ 4309
            </Typography>
        </PanelContent>
    </Paper>
);

export default RangeProposals;
