// @flow
import { createMuiTheme } from 'material-ui/styles';
import WebFont from 'webfontloader';
import { red } from 'material-ui/colors';

WebFont.load({
    google: {
        families: ['Montserrat:100,200,300,400,500,600,700,800,900', 'sans-serif']
    }
});

export default createMuiTheme({
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
