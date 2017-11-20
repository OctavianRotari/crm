// @flow

import * as React from 'react';
import { withStyles } from 'material-ui/styles';
import List, { ListItem } from 'material-ui/List';

import PanelContent from '../../../components/PanelContent';
import FacebookPost from './FacebookPost';
import InstagramPost from './InstagramPost';
import TwitterPost from './TwitterPost';

const styles = theme => ({
    snackbar: {
        margin: theme.spacing.unit / 2,
        padding: theme.spacing.unit / 2,
        [theme.breakpoints.up('md')]: {
            minWidth: 250,
            maxWidth: 568,
            borderRadius: 2,
        },
    },
});

type Props = {
    classes: Object,
    data: Array<Object>
}

const SocialContent = (props: Props) => (
    <PanelContent headerPresent overflowYScroll>
        <List disablePadding>
            {props.data.map((post, i) => (
                <ListItem disableGutters key={i}>
                    {post.social === 'facebook' && <FacebookPost post={post}/>}
                    {post.social === 'instagram' && <InstagramPost post={post}/>}
                    {post.social === 'twitter' && <TwitterPost post={post}/>}
                </ListItem>
            ))}
        </List>
    </PanelContent>
);

export default withStyles(styles)(SocialContent);
