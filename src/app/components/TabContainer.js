// @flow
import * as React from 'react';

type Props = {
    children: Array<React$Element<any>> | React$Element<any>
}

const TabContainer = (props: Props) => {
    return <div style={{height: 'inherit'}}>{props.children}</div>;
};

export default TabContainer;
