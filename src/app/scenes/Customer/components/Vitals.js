// @flow

import * as React from 'react';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import List, { ListItem } from 'material-ui/List';

import Panel from '../../../components/Panel';
import PanelContent from '../../../components/PanelContent';
import PanelHeader from '../../../components/PanelHeader';
import TextDecorator from '../../../components/TextDecorator';

import vitals from '../../../dummyData/vitals.json';

const Vitals = () => (
    <Panel>
        <PanelHeader verticalCenter flex defaultHeight>
            <Typography align="left" type="title">
                Vitals
            </Typography>
        </PanelHeader>
        <Divider/>
        <PanelContent
            paddingTop
            headerPresent
            overflowYScroll
        >
            <List disablePadding>
                {vitals.customer.map((vital, i) => (
                    <ListItem disableGutters style={{paddingTop: 4, paddingBottom: 4}} key={i}>
                        <Typography align="right" type="body1" style={{flex: 1, marginRight: 4}}>
                            {vital.key}
                        </Typography>
                        <Typography
                            align="left"
                            type="body1"
                            style={{flex: 1, marginLeft: 4, color: 'black'}}
                        >
                            <TextDecorator
                                success={vital.success}
                                danger={vital.danger}
                                warning={vital.warning}
                            >
                                {vital.value}
                            </TextDecorator>
                        </Typography>
                    </ListItem>
                ))}
            </List>
        </PanelContent>
    </Panel>
);

export default Vitals;
