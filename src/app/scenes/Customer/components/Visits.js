// @flow
import * as React from 'react';
import Typography from 'material-ui/Typography';

import Paper from '../../../components/Paper';
import PanelHeader from '../../../components/PanelHeader';
import PanelContent from '../../../components/PanelContent';

const Visit = () => (
    <Paper fullHeight border>
        <PanelHeader defaultPadding>
            <Typography align="left" type="subheading">
                Visit
            </Typography>
        </PanelHeader>
        <PanelContent defaultPadding headerPresent >
            <Typography type="body2">
                Proposal accepted in principle. Tweaks
                made based on feedback and discussion
                ongoing.
            </Typography>
        </PanelContent>
    </Paper>
);

export default Visit;
