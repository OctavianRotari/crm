// @flow
import * as React from 'react';
import { AreaChart, YAxis, Area, XAxis, Tooltip, Legend} from 'recharts';
import sizeMe from 'react-sizeme';

import Panel from './Panel';

type Props = {
    classNamePanelContent: String,
    xAxisDataKey: string,
    chartData: Object,
    legendPayload: Array<Object>,
    theme: Object,
    colors: Object,
    isMobile: Object,
    dataKeys: Array<Object>,
    size: {
        width: number,
        height: number
    }
}

type State = {
    width: null | number,
    height: null | number,
    measured: boolean
}

const styles = {
    chartWrapper: {
        fontSize: '0.625rem',
        color: '#828E9C',
    },
    legendStyle: {
        top: 0,
        left: 0,
        fontSize: '0.75rem',
        textTransform: 'uppercase'
    },
    tooltip: {
        fontSize: '0.75rem',
        textTransform: 'uppercase'
    },
};


class ChartPanel extends React.Component<Props, State> {
    static defaultProps = {
        isMobile: false
    }

    state = {
        width: null,
        height: null,
        measured: false
    };

    componentWillMount() {
        const { height, width } = this.props.size;
        if(height, width) {
            this.setState({height, width}, () => {
                this.setState({measured: true});
            });
        }
    }

    componentWillUnmount() {
        this.setState({measured: false, width: null, height: null});
    }

    render() {
        const { measured, width , height } = this.state;
        const { chartData, isMobile, dataKeys, xAxisDataKey } = this.props;
        if(!measured) {
            return(<h1 className="loading">loading</h1>);
        }

        return (
            <Panel>
                <AreaChart
                    data={chartData}
                    width={width}
                    height={height}
                    style={ styles.chartWrapper }
                    margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                >
                    <Legend
                        align="center"
                        verticalAlign="middle"
                        layout="vertical"
                        payload={this.props.legendPayload}
                        wrapperStyle={ 
                            {
                                top: 0,
                                right: isMobile ? 16 : 0,
                                bottom: isMobile ? 16 : 32,
                                left: isMobile ? 16 : 0,
                                fontSize: '0.75rem',
                                textTransform: 'uppercase'
                            }
                        }
                    />
                    <XAxis
                        interval="preserveStartEnd"
                        scale="auto"
                        tickLine={false}
                        dataKey={xAxisDataKey}
                        allowDataOverflow={true}
                    />
                    <YAxis
                        type="number"
                        hide={true}
                        domain={[0, 'dataMax + 300']}
                    />
                    <Tooltip labelStyle={styles.tooltip}/>
                    {
                        dataKeys.map((dataKey, i) => (
                            <Area
                                key={i}
                                type='natural'
                                dataKey={dataKey.key}
                                stroke={dataKey.color}
                                fillOpacity={1}
                                fill={dataKey.color}
                            />
                        ))
                    }
                </AreaChart>
            </Panel>
        );
    }
}

const sizeMeConfig = {
    monitorWidth: true,
    monitorHeight: true
};

const sizeMeHOC = sizeMe(sizeMeConfig);

export default sizeMeHOC(ChartPanel);
export { ChartPanel as PureChartPanel };
