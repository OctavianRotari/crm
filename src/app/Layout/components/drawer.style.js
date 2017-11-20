export default theme => ({
    mainNavigation: {
        backgroundColor: theme.palette.common.faintBlack,
    },
    navList: {
        width: theme.drawerWidth,
        background: '#212731',
        [theme.breakpoints.up('md')]: {
            width: theme.drawerWidth,
            position: 'relative',
            height: '100%',
        },
    },
    listItemIcon: {
        color: theme.palette.common.white,
        margin: 0
    },
    listItemText: {
        color: theme.palette.common.white,
        textTransform: 'none',
        fontSize: '0.875rem',
        fontWeight: 300,
    },
    buttonRoot: {
        paddingLeft: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        '&:hover': {
            backgroundColor: theme.palette.primary[800]
        }
    },
    buttonActive: {
        backgroundColor: theme.palette.primary[500],
    }
});
