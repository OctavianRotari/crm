// @flow

import * as React from 'react';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';

import Panel from '../../../components/Panel';
import PanelContent from '../../../components/PanelContent';
import PanelHeader from '../../../components/PanelHeader';

const Marketing = () => (
    <Panel>
        <PanelHeader
            flex
            verticalCenter
            defaultHeight
        >
            <Typography align="left" type="title">
                Marketing
            </Typography>
        </PanelHeader>
        <Divider/>
        <PanelContent headerPresent paddign='none'>
            <img
                src='https://source.unsplash.com/1000x1000/?cycling'
                alt='cycling'
                style={{height: '100%', width: '100%', objectFit: 'cover'}}
            />
        </PanelContent>
    </Panel>
);

export default Marketing;

