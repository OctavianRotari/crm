// @flow
import * as React from 'react';
import { MuiThemeProvider } from 'material-ui/styles';

import theme from './theme.material';
import Layout from './Layout';

type Props = Object;

const LayoutWrapper = (props: Props) => (
    <MuiThemeProvider theme={theme}>
        <Layout {...props} />
    </MuiThemeProvider>
);

export default LayoutWrapper;
