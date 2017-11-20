export default theme => ({
    mainContainer: {
        width: '100%',
        height: '100%',
        zIndex: 1,
        overflow: 'hidden',
    },
    main: {
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '100%',
    },
    navIconHide: {
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
        [theme.breakpoints.down('md')]: {
            width: 'auto',
            height: 'auto',
            paddingRight: theme.spacing.unit,
        },
    },
    pageHeader: {
        position: 'absolute',
        marginLeft: theme.spacing.drawerWidth,
        backgroundColor: theme.palette.common.white,
        borderBottom: theme.palette.border,
        [theme.breakpoints.up('md')]: {
            width: `calc(100% - ${theme.sizes.drawerWidth}px)`,
            height: theme.sizes.headerHeight,
        },
        [theme.breakpoints.down('sm')]: {
            height: theme.sizes.headerHeightMobile,
            padding: 0
        },
    },
    pageContent: {
        backgroundColor: theme.palette.background.default,
        width: '100%',
        padding: theme.spacing.unit,
        marginTop: theme.sizes.headerHeight,
        [theme.breakpoints.up('sm')]: {
            height: `calc(100% - ${theme.sizes.headerHeight}px)`,
            marginTop: theme.sizes.headerHeight,
        },
        [theme.breakpoints.down('sm')]: {
            height: `calc(100% - ${theme.sizes.headerHeightMobile}px)`,
            marginTop: theme.sizes.headerHeightMobile,
            padding: 0
        },
    },
});
