// @flow

export default (theme: Object) => ({
    tabsRoot: {
        justifyContent: 'center',
        display: 'flex',
        width: '100%',
    },
    tabsFlexContainer: {
        height: 35,
        width: '100%'
    },
    tabRoot: {
        width: 'auto',
        height: 35,
        [theme.breakpoints.up('md')]: {
            minWidth: 'auto',
        },
    },
    rootInheritSelected: {
        color: theme.palette.primary[500]
    },
    labelContainer: {
        padding: 'inherit'
    },
    label: {
        fontSize: 12
    },
    indicator: {
        width: 0,
        height: 0,
    }
});
