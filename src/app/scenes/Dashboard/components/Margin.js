// @flow
import * as React from 'react';
import Typography from 'material-ui/Typography';

import Paper from '../../../components/Paper';
import PanelContent from '../../../components/PanelContent';
import TextDecorator from '../../../components/TextDecorator';

const Margin = () => (
    <Paper fullHeight border>
        <PanelContent fullHeight style={{display: 'inline-grid'}}>
            <Typography align="center" type="subheading">
                Margin
            </Typography>
            <Typography align="center" type="title" component="h2">
                <TextDecorator
                    danger={true}
                >
                    19%
                </TextDecorator>
            </Typography>
            <Typography align="center" type="body1" component="p" >
                Peer avg 18%.
            </Typography>
        </PanelContent>
    </Paper>
);

export default Margin;
