// @flow

import * as React from 'react';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import { GridList, GridListTile, GridListTileBar } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorderIcon from 'material-ui-icons/StarBorder';

import Panel from '../../../components/Panel';
import PanelContent from '../../../components/PanelContent';
import PanelHeader from '../../../components/PanelHeader';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        background: theme.palette.background.paper,
        height: '100%'
    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
        height: '100%'
    },
    title: {
        color: theme.palette.primary[200],
    },
    titleBar: {
        background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
});

const tileData = [
    {
        title: 'Bicycle',
        img: 'https://source.unsplash.com/500x500/?bicycle'
    },
    {
        title: 'Cyclist',
        img: 'https://source.unsplash.com/500x500/?cyclist'
    },
    {
        title: 'Cycling',
        img: 'https://source.unsplash.com/500x500/?cycling'
    }
];

type Props = {
    classes: Object
}

class Gallery extends React.Component<Props> {
    // handleImageLoad = (event) => {
    //     console.log('Image loaded ', event.target);
    // };

    render() {
        const { classes } = this.props;
        return (
            <Panel>
                <PanelHeader
                    flex
                    verticalCenter
                    defaultHeight
                >
                    <Typography align="left" type="title">
                        Gallery
                    </Typography>
                </PanelHeader>
                <PanelContent headerPresent paddign='none'>
                    <GridList className={classes.gridList} cols={2.5}>
                        {tileData.map((tile, i) => (
                            <GridListTile key={i} style={{height: '100%'}}>
                                <img src={tile.img} alt={tile.title} />
                                <GridListTileBar
                                    title={tile.title}
                                    classes={{
                                        root: classes.titleBar,
                                        title: classes.title,
                                    }}
                                    actionIcon={
                                        <IconButton>
                                            <StarBorderIcon className={classes.title} />
                                        </IconButton>
                                    }
                                />
                            </GridListTile>
                        ))}
                    </GridList>
                </PanelContent>
            </Panel>
        );
    }
}

export default withStyles(styles)(Gallery);
