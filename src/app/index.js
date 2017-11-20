// @flow
import React, { Component } from 'react';
import { render } from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { red } from 'material-ui/colors';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

import Root from './Root';

import WebFont from 'webfontloader';

WebFont.load({
    google: {
        families: ['Montserrat:100,200,300,400,500,600,700,800,900', 'sans-serif']
    }
});

const theme = createMuiTheme({
    sizes: {
        drawerWidth: 205,
        headerHeight: 64,
        headerHeightMobile: 50,
        bottomNavHeight: 56
    },
    spacing: {
        unit: 16,
    },
    palette: {
        border: '1px solid rgba(149, 152, 154, 0.36)',
        background: {
            default: '#f1f1f1'
        },
        text: {
            white: 'white'
        },
        common: {
            faintBlack: '#212731'
        },
        primary: red,
    },
    typography: {
        fontFamily: 'Montserrat',
        display4: {
            color: '#26364A',
        },
        display3: {
            color: '#828E9C',
            fontSize: '1.5rem',
            fontWeight: '600',
        },
        display2: {
            color: '#26364A'
        },
        display1: {
            color: '#26364A'
        },
        headline: {
            fontSize: '1.125rem',
            color: '#828E9C',
            fontWeight: 300,
            textTransform: 'uppercase'
        },
        title: {
            textTransform: 'uppercase',
            fontSize: '1.125rem',
        },
        subheading: {
            textTransform: 'uppercase',
            color: '#26364A',
            fontWeight: 700,
            fontSize: '0.5625rem',
        },
        body1: {
            color: '#828E9C',
            fontSize: '0.75rem',
        },
        body2: {
            fontSize: '0.5625rem',
            color: '#828E9C',
            fontWeight: 300,
        },
    },
});

type Props = {};
type Status = {};

export default class App extends Component<Props, Status> {
    componentDidMount() {
        const jssStyles = document.getElementById('jss-server-side');
        if(jssStyles && jssStyles.parentNode) {
            jssStyles.parentNode.removeChild(jssStyles);
        }
    }

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <Root />
            </MuiThemeProvider>
        );
    }
}

render(<App />, document.getElementById('root'));
registerServiceWorker();

// "text": {
//     "primary": "rgba(0, 0, 0, 0.87)",
//     "secondary": "rgba(0, 0, 0, 0.54)",
//     "disabled": "rgba(0, 0, 0, 0.38)",
//     "hint": "rgba(0, 0, 0, 0.38)",
//     "icon": "rgba(0, 0, 0, 0.38)",
//     "divider": "rgba(0, 0, 0, 0.12)",
//     "lightDivider": "rgba(0, 0, 0, 0.075)"
// },
