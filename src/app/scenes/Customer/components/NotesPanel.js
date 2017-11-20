// @flow
import * as React from 'react';
import List, { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import { withStyles } from 'material-ui/styles';
import { SnackbarContent } from 'material-ui/Snackbar';

// import Panel from '../../../components/Panel';
import PanelContent from '../../../components/PanelContent';

type Props = {
    classes: Object,
    data: Array<Object>
}

const style = theme => ({
    root: {
        minWidht: 0,
        backgroundColor: '#F35959',
        padding: 0,
        position: 'relative'
    },
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

const NotesPanel = (props: Props) => (
    <PanelContent headerPresent overflowYScroll>
        <List disablePadding>
            {props.data.map((note, i) => (
                <ListItem disableGutters key={i}>
                    <Avatar
                        alt="Adelle Charles"
                        src={note.avatar}
                    />
                    <SnackbarContent
                        className={props.classes.snackbar}
                        message={note.message}
                    />
                </ListItem>
            ))}
        </List>
    </PanelContent>
);

export default withStyles(style)(NotesPanel);
