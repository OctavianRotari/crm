// @flow
import * as React from 'react';
import Typography from 'material-ui/Typography';

import Panel from '../../../components/Panel';
import ChartPanel from '../../../components/ChartPanel';
import PanelContent from '../../../components/PanelContent';
import PanelHeader from '../../../components/PanelHeader';
import TextDecorator from '../../../components/TextDecorator';
import { buildChartArray } from '../../../utils/chart';

type Props = {
    header: string,
    data: Array<Object>,
    alias: string,
    isMobile?: boolean,
}

const Chart = (props: Props) => {
    const { data, alias, header} = props;
    const payload = buildChartArray(data, alias);
    return (
        <Panel>
            <PanelHeader
                defaultHeight
                isMobile={props.isMobile}
                flex
            >
                <Typography type="headline">
                    {header}
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
                    isMobile={props.isMobile}
                    legendPayload={payload.legend}
                    chartData={payload.datapoints}
                    xAxisDataKey="month"
                    dataKeys={payload.dataKeys}
                />
            </PanelContent>
        </Panel>
    );
};

export default Chart;
