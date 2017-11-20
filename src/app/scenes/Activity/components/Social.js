// @flow
import * as React from 'react';
import { withStyles } from 'material-ui/styles';
import Divider from 'material-ui/Divider';
import Tabs, { Tab } from 'material-ui/Tabs';
import _ from 'lodash';

import Panel from '../../../components/Panel';
import style from './social.style.js';
import PanelHeader from '../../../components/PanelHeader';
import SocialContent from './SocialContent';

import dummySocial from '../../../dummyData/dummySocial.json';

type Props = {
    classes: Object
}
type State = {
    value: number,
    data: Array<Object>
}

class Social extends React.Component<Props, State> {
    state = {
        value: 0,
        data: []
    }

    componentWillMount() {
        const data = this.setData(this.state.value);
        this.setState({data});
    }

    handleChange = (event: Object, value: number) => {
        this.setState({value, data: this.setData(value)});
    }

    setData = (value) => {
        switch(value) {
            case 0:
                return _.filter(dummySocial, {'social': 'twitter'});
            case 1:
                return _.filter(dummySocial, {'social': 'instagram'});
            case 2:
                return _.filter(dummySocial, {'social': 'facebook'});
        }
    }

    render() {
        const { classes } = this.props;
        const { value, data } = this.state;
        return (
            <Panel>
                <PanelHeader
                    flex
                    verticalCenter
                    defaultPadding
                    defaultHeight
                >
                    <Tabs
                        value={value}
                        onChange={this.handleChange}
                        indicatorClassName={classes.indicator}
                        classes={
                            {
                                root: classes.tabsRoot,
                                flexContainer: classes.tabsFlexContainer
                            }
                        }
                        fullWidth
                    >
                        <Tab
                            classes={
                                {
                                    root: classes.tabRoot,
                                    labelContainer: classes.labelContainer,
                                    rootInheritSelected: classes.rootInheritSelected,
                                    label: classes.label
                                }
                            }
                            label="Twitter"
                        />
                        <Tab
                            classes={
                                {
                                    root: classes.tabRoot,
                                    labelContainer: classes.labelContainer,
                                    rootInheritSelected: classes.rootInheritSelected,
                                    label: classes.label
                                }
                            }
                            label="Instagram"
                        />
                        <Tab
                            classes={
                                {
                                    root: classes.tabRoot,
                                    labelContainer: classes.labelContainer,
                                    rootInheritSelected: classes.rootInheritSelected,
                                    label: classes.label
                                }
                            }
                            label="Facebook"
                        />
                    </Tabs>
                </PanelHeader>
                <Divider/>
                { value === 0 && <SocialContent data={data}/> }
                { value === 1 && <SocialContent data={data}/> }
                { value === 2 && <SocialContent data={data}/> }
            </Panel>
        );
    }
}

export default withStyles(style)(Social);
