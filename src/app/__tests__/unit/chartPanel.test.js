import React from 'react';
import { shallow } from 'enzyme';
import { PureChartPanel } from '../../components/ChartPanel';

describe('<ChartPanel/>', () => {
    it('renders loading if no sizes', () => {
        const props = {
            chartData: {data: []},
            colors: { peers: '', you: '', lastYear: '' },
            size: { width: null, height: null }
        };

        const wrapper = shallow(<PureChartPanel {...props}/>);
        expect(wrapper.text()).toEqual('loading');
    });

    it('renders children if sizes', () => {
        const props = {
            chartData: {data: []},
            colors: { peers: '', you: '', lastYear: '' },
            size: { width: 300, height: 300 }
        };

        const wrapper = shallow(<PureChartPanel {...props}/>);
        expect(wrapper.state().measured).toEqual(true);
    });
});
