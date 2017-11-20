// @flow
import _ from 'lodash';
import moment from 'moment';

type Datapoint = {
    month: string,
    'last-year': number,
    you: number,
    any?: number
}

type ChartArray = {
    datapoints: Array<Datapoint>,
    dataKeys: Array<Object>,
    legend: Array<Object>
}

export const buildChartArray = (dataArray: Array<Object>, param: string): ChartArray => {
    const currentYear = moment().year();
    const lastYear = moment().subtract(1, 'year').year();
    const curretYearData = dataArray[currentYear];
    let chartArray = [];

    for(let month in curretYearData) {
        if(curretYearData[month][param]) {
            chartArray.push({
                month,
                'last-year': dataArray[lastYear][month]['you'],
                'you': curretYearData[month]['you'],
                [ param ]: average(curretYearData[month][param], 'value')
            });
        } else {
            for(let group in curretYearData[month]) {
                const peers = curretYearData[month][group];
                if(typeof(peers) === 'object') {
                    let peerObj = _.find(peers, {'name': param});
                    if(peerObj) {
                        chartArray.push({
                            month,
                            'last-year': dataArray[lastYear][month]['you'],
                            'you': curretYearData[month]['you'],
                            [ param ]: peerObj.value
                        });
                        break;
                    }
                }
            }
        }
    }

    return {
        datapoints: chartArray,
        dataKeys: [
            { key: 'last-year', color: '#828E9C' },
            { key: param, color: '#F35959' },
            { key: 'you', color: '#2F909F' }
        ],
        legend: [
            {value: 'You', id: 'you', type: 'square', color: '#2F909F'},
            {value: param, id: param, type: 'square', color: '#F35959'},
            {value: 'S/S 2016', id: 'lastYear', type: 'square', color: '#828E9C'}
        ]
    };
};

const average = (array, key) => {
    const avg = sum(array, key)/array.length;
    //returns null if 0 because the graph will draw if 0 and it wont if null
    return avg === 0 ? null : avg.toPrecision(3);
};

const sum = (array, key) => {
    let total = 0;
    for(let i = 0; i < array.length; i++) {
        total += array[i][key];
    }
    return total;
};
