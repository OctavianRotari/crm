// @flow
import * as React from 'react';
import Typography from 'material-ui/Typography';

import Paper from '../../../components/Paper';
import PanelContent from '../../../components/PanelContent';
import TextDecorator from '../../../components/TextDecorator';

const Rotation = () => (
    <Paper fullHeight border>
        <PanelContent fullHeight style={{display: 'inline-grid'}}>
            <Typography align="center" type="subheading">
                Rotation
            </Typography>
            <Typography align="center" type="title" component="h2">
                <TextDecorator
                    success={true}
                >
                    Good
                </TextDecorator>
            </Typography>
            <Typography align="center" type="body1" component="p" >
                Peer avg good.
            </Typography>
        </PanelContent>
    </Paper>
);

export default Rotation;
