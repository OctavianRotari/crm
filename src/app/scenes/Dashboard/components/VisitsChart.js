// @flow
import * as React from 'react';
import Typography from 'material-ui/Typography';

import Panel from '../../../components/Panel';
import ChartPanel from '../../../components/ChartPanel';
import PanelContent from '../../../components/PanelContent';
import PanelHeader from '../../../components/PanelHeader';
import TextDecorator from '../../../components/TextDecorator';

import chartData from '../../../dummyData/charts.json';

type Props = {
    isMobile?: boolean
}

const VisitsChart = (props: Props) => (
    <Panel>
        <PanelHeader
            defaultHeight
            isMobile={props.isMobile}
            flex
        >
            <Typography type="headline">
                Visits
            </Typography>
            <Typography type="display3" align="right" style={{marginLeft: 'auto'}}>
                235 (<TextDecorator success>135%</TextDecorator>)
                <Typography type="body2">
                    Target 200 (<TextDecorator success>ahead</TextDecorator>)
                </Typography>
                <Typography type="body2">
                    Peers (<TextDecorator success>ahead</TextDecorator>)
                </Typography>
            </Typography>
        </PanelHeader>
        <PanelContent headerPresent>
            <h1>Nothing</h1>
        </PanelContent>
    </Panel>
);

export default VisitsChart;

// <ChartPanel
//     isMobile={props.isMobile}
//     colors={chartData.colors}
//     legendPayload={chartData.legend}
//     chartData={chartData.data.visits}
// />
