// @flow
import * as React from 'react';
import Typography from 'material-ui/Typography';

import Panel from '../../../components/Panel';
import ChartPanel from '../../../components/ChartPanel';
import PanelContent from '../../../components/PanelContent';
import PanelHeader from '../../../components/PanelHeader';
import chartData from '../../../dummyData/charts.json';
import TextDecorator from '../../../components/TextDecorator';
import { buildChart } from '../../../utils/chart';

type Props = {
    isMobile?: boolean
}

type State = {}

class SpringSummerChart extends React.Component<Props, State> {
    render() {
        const { data } = chartData.data.springSummer;
        const peersData = buildChart(data, {searchBy: 'peers', value: 'uk-peers'});
        return (
            <Panel>
                <PanelHeader
                    defaultHeight
                    isMobile={this.props.isMobile}
                    flex
                >
                    <Typography type="headline">
                        S/S FWD Orders
                    </Typography>
                    <Typography type="display3" align="right" style={{marginLeft: 'auto'}}>
                        £ 197,435 (<TextDecorator success>131%</TextDecorator>)
                        <Typography type="body2">
                            Target £150000 (<TextDecorator success>ahead</TextDecorator>)
                        </Typography>
                        <Typography type="body2">
                            Peers (<TextDecorator warning>behind</TextDecorator>)
                        </Typography>
                    </Typography>
                </PanelHeader>
                <PanelContent headerPresent>
                    <ChartPanel
                        isMobile={this.props.isMobile}
                        legendPayload={chartData.legend}
                        chartData={peersData.payload}
                        xAxisDataKey="month"
                        dataKeys={peersData.dataKeys}
                    />
                </PanelContent>
            </Panel>
        );
    }
}

export default SpringSummerChart;
