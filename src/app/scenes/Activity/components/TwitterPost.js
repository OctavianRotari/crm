// @flow
import * as React from 'react';
import Typography from 'material-ui/Typography';
import { ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

import Panel from '../../../components/Panel';
import PanelContent from '../../../components/PanelContent';
import PanelHeader from '../../../components/PanelHeader';

type Props = {
    post: Object
}

const TwitterPost = (props: Props) => (
    <Panel>
        <PanelHeader verticalCenter flex defaultHeight>
            <Avatar>
                <Avatar
                    alt={props.post.name}
                    src={props.post.avatar}
                />
            </Avatar>
            <ListItemText primary={props.post.name}/>
        </PanelHeader>
        <PanelContent headerPresent paddingTop>
            <Typography align="left" type="body1">
                {props.post.message}
            </Typography>
            <Typography align="right" type="body1" color="primary" style={{margin: 8}}>
                10 min ago
            </Typography>
        </PanelContent>
    </Panel>
);

export default TwitterPost;
