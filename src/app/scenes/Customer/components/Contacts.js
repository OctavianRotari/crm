// @flow

import * as React from 'react';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import List, { ListItem, ListItemText } from 'material-ui/List';

import Panel from '../../../components/Panel';
import PanelContent from '../../../components/PanelContent';
import PanelHeader from '../../../components/PanelHeader';

import dummyContacts from '../../../dummyData/dummyContacts.json';

const Contacts = () => (
    <Panel>
        <PanelHeader verticalCenter flex defaultHeight>
            <Typography align="left" type="title">
                Contacts
            </Typography>
        </PanelHeader>
        <Divider/>
        <PanelContent headerPresent overflowYScroll>
            <List disablePadding>
                {dummyContacts.map(contact => (
                    <ListItem disableGutters key={contact.id}>
                        <Avatar>
                            <Avatar
                                alt={contact.name}
                                src={contact.avatar}
                            />
                        </Avatar>
                        <ListItemText primary={contact.name} secondary={contact.phoneNumber} />
                    </ListItem>
                ))}
            </List>
        </PanelContent>
    </Panel>
);

export default Contacts;
