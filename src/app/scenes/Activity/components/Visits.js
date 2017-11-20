// @flow
import * as React from 'react';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

import Panel from '../../../components/Panel';
import PanelContent from '../../../components/PanelContent';
import PanelHeader from '../../../components/PanelHeader';
import DirectionsCarIcon from 'material-ui-icons/DirectionsCar';

import visits from '../../../dummyData/visits';

const Visits = () => (
    <Panel>
        <PanelHeader
            flex
            verticalCenter
            defaultPadding
            defaultHeight
        >
            <Typography align="left" type="title">
                Visits
            </Typography>
        </PanelHeader>
        <Divider/>
        <PanelContent
            headerPresent
            paddingTop
            defaultPadding
            overflowYScroll
        >
            {
                visits.map((visit, i) => {
                    return (
                        <ListItem disableGutters key={i}>
                            <ListItemIcon>
                                <DirectionsCarIcon />
                            </ListItemIcon>
                            <ListItemText primary={`${visit.name} ${visit.time}`} secondary={visit.type}/>
                        </ListItem>
                    );
                })
            }
        </PanelContent>
    </Panel>
);

export default Visits;
