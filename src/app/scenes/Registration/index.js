// @flow
import * as React from 'react';
import { MuiThemeProvider } from 'material-ui/styles';

import theme from '../../Layout/theme.material';
import Registration from './Registration';

type Props = Object;

const registrationwrapper = (props: Props) => (
    <MuiThemeProvider theme={theme}>
        <Registration {...props} />
    </MuiThemeProvider>
);

export default registrationwrapper;
