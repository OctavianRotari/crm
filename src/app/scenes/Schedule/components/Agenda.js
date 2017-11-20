// @flow
import * as React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip';
import moment from 'moment';
import _ from 'lodash';
import List, { ListItem, ListItemText } from 'material-ui/List';

import Panel from '../../../components/Panel';
import Paper from '../../../components/Paper';
import PanelHeader from '../../../components/PanelHeader';
import PanelContent from '../../../components/PanelContent';
import TextDecorator from '../../../components/TextDecorator';

import vitals from '../../../dummyData/vitals.json';
import events from '../../../dummyData/events';

type Props = {
    slotInfo: Object,
    dateEvents: Object,
    classes: Object
}

type State = {
    dateEvents: Object
}

const styles = () => ({
    listItemRoot: {
        alignItems: 'left'
    }
});

class Agenda extends React.Component<Props, State> {
    static defaultProps = {
        slotInfo: {
            start: moment().calendar()
        },
    }

    state = {
        dateEvents: {}
    }

    componentWillMount() {
        const dateEvents = this.findDateEvents(this.props.slotInfo);
        this.setState({dateEvents});
    }

    componentWillReceiveProps({slotInfo}: Object) {
        const dateEvents = this.findDateEvents(slotInfo);
        this.setState({dateEvents});
    }

    findDateEvents = (slotInfo: Object): Object => {
        const propsToGroupBy = ['start', 'end'];
        const notNull = _.negate(_.isNull);

        const groups = _.groupBy(events, (evt) => {
            return _.find(_.pick(evt, propsToGroupBy), notNull);
        });

        const segmentsArray = _.map(groups, (group) => {
            return {
                start: group[0].start,
                end: group[0].end,
                events: group
            };
        });

        return _.find(segmentsArray, event => {
            const eventDate = event.start.toDateString();
            const currentDate = new Date(moment(slotInfo.start)).toDateString();
            return eventDate === currentDate;
        });
    }

    render() {
        const { dateEvents } = this.state;
        const { slotInfo, classes } = this.props;
        return (
            <Panel>
                <PanelHeader verticalCenter flex defaultHeight>
                    <Typography type="title" align="left">
                        {moment(slotInfo.start).format('dddd, MMMM Do')}
                    </Typography>
                </PanelHeader>
                <Divider/>
                <PanelContent headerPresent overflowYScroll>
                    { dateEvents ? dateEvents.events.map((event, i) => (
                        <Paper>
                            <List disablePadding key={i} style={{display: 'flex', width: '100%'}}>
                                <ListItem
                                    disableGutters
                                    style={{display: 'flex', width: '20%', flexWrap: 'no-wrap', flexDirection: 'column'}}
                                >
                                    <ListItemText
                                        primary={moment(event.start).format('HH:mm')}
                                        style={{padding: 0, textAlign: 'left', flex: 'initial'}}
                                    />
                                    <Chip label={event.visitType} style={{marginTop: 8, fontSize: '0.65rem'}}/>
                                </ListItem>
                                <ListItem
                                    disableGutters
                                    style={{width: '40%', flexWrap: 'no-wrap', flexDirection: 'column', textAlign: 'left'}}
                                    classes={{root: classes.listItemRoot}}
                                >
                                    <ListItemText primary={event.customer} style={{textAlign: 'left', fontSize: '1.125rem', flex: 'initial'}}/>
                                    {event.notes.map( note => (
                                        <Typography type="body1" align="left" color="primary">
                                            { note }
                                        </Typography>
                                    ))}
                                </ListItem>
                                <ListItem
                                    disableGutters
                                    style={{width: '40%'}}
                                    classes={{root: classes.listItemRoot}}
                                >
                                    <List disablePadding>
                                        {vitals.product.map((vital, i) => (
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
                                </ListItem>
                            </List>
                            <Divider/>
                        </Paper>
                    )) : <h1>No events</h1>}
                </PanelContent>
            </Panel>
        );
    }
}

export default withStyles(styles)(Agenda);
