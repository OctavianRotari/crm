// @flow
import * as React from 'react';
import Grid from 'material-ui/Grid';

import VisitsScheduled from './VisitsScheduled';
import RangeProposals from './RangeProposals';
import Visits from './Visits';
import FwdOrder from './FwdOrder';
import LockInOrder from './LockInOrder';

const Funnel = () => (
    <Grid container spacing={16} style={{height: '110px'}}>
        <Grid item xs>
            <VisitsScheduled />
        </Grid>
        <Grid item xs>
            <RangeProposals />
        </Grid>
        <Grid item xs>
            <Visits />
        </Grid>
        <Grid item xs>
            <FwdOrder />
        </Grid>
        <Grid item xs>
            <LockInOrder />
        </Grid>
    </Grid>
);

export default Funnel;
