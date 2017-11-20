// @flow

export default (theme: Object) => ({
    fullHeight: {
        height: `calc(100% + ${theme.spacing.unit}px)`
    },
    halfHeight: {
        height: `calc(50% + ${theme.spacing.unit / 2}px)`
    },
    panelWarning: {
        backgroundColor: '#CB4F4F',
    },
    panelHeaderOutline: {
        display: 'block',
        margin: 'auto',
        padding: theme.spacing.unit / 2
    },
});
