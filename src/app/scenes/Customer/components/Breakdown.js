// @flow
import * as React from 'react';
import { PieChart, Pie, Cell, Legend } from 'recharts';
import sizeMe from 'react-sizeme';

import Panel from '../../../components/Panel';

const data = [
    {name: 'Male', value: 400},
    {name: 'Female', value: 300},
];
const COLORS = ['#0088FE', '#F35959'];

type Props = {
    size: {
        width: number,
        height: number
    }
}

type State = {
    width: number,
    height: number,
    measured: boolean
}

const style = {
    leggend: {
        left: 16 / 2,
        top: 16 / 2,
        fontSize: '12px',
        textTransform: 'uppercase'
    }
};


class Breakdown extends React.Component<Props, State> {
    static defaultProps = {
        isMobile: false
    }

    state = {
        width: 0,
        height: 0,
        measured: false
    };

    componentWillMount() {
        const { height, width } = this.props.size;
        this.setState({height, width}, () => {
            this.setState({measured: true});
        });
    }

    componentWillUnmount() {
        this.setState({measured: false, width: 0, height: 0});
    }

    render() {
        const { measured, width , height } = this.state;
        const isMobile = width <= height;
        if(!measured) {
            return(<h1>loading</h1>);
        }
        return (
            <Panel >
                <PieChart width={width} height={height}>
                    <Legend
                        align="center"
                        verticalAlign="middle"
                        layout="vertical"
                        wrapperStyle={ style.leggend }
                    />
                    <Pie
                        data={data}
                        outerRadius={isMobile ? width / 2 - 16 : height / 2 - 16}
                        fill="#8884d8"
                        dataKey='value'
                    >
                        {
                            data.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]}/>)
                        }
                    </Pie>
                </PieChart>
            </Panel>
        );
    }
}

const sizeMeConfig = {
    monitorWidth: true,
    monitorHeight: true
};

const sizeMeHOC = sizeMe(sizeMeConfig);

export default sizeMeHOC(Breakdown);
