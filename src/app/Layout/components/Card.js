// @flow
import React from 'react';
import Card, { CardContent } from 'material-ui/Card';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar';

type MyProps = {
    classes: {
        card: String,
        avatar: Object,
        bigAvatar: Object,
        name: Object
    }
}

const styles = (theme) => ({
    card: {
        display: 'flex',
        justifyContent: 'center',
        background: 'transparent',
        boxShadow: 'none',
        textAlign: 'center',
        color: theme.palette.common.white
    },
    avatar: {
        margin: 10,
    },
    bigAvatar: {
        width: 120,
        height: 120,
    },
    name: {
        fontSize: theme.typography.display4,
        color: 'white'
    },
    log: {
        fontSize: theme.typography.display4,
    }
});


const CardProfile = (props: MyProps) => {
    return (
        <Card className={props.classes.card}>
            <CardContent>
                <Avatar
                    alt="Adelle Charles"
                    src="https://i.imgur.com/4X6xDHl.png"
                    className={classNames(props.classes.avatar, props.classes.bigAvatar)}
                />
                <Typography component="h2" className={props.classes.name}>
                    Ben Beneaumont
                </Typography>
                <Link to='/'>
                    <Typography color="primary" component="h2">
                        Log out
                    </Typography>
                </Link>
            </CardContent>
        </Card>
    );
};

export default withStyles(styles)(CardProfile);
