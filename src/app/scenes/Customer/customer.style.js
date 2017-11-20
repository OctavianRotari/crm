// @flow
//
const HEADER_HEIGHT = 110;

export default (theme: Object) => ({
    pageHeader: {
        height: HEADER_HEIGHT
    },
    pageContent: {
        height: `calc(100% - ${HEADER_HEIGHT}px)`
    },
    paper: {
        width: `calc(100% - ${theme.spacing.unit}px)`,
        marginTop: theme.spacing.unit,
    },
    fullHeight: {
        height: `calc(100% + ${theme.spacing.unit / 2}px)`
    },
    halfHeight: {
        height: `calc(50% + ${theme.spacing.unit / 2}px)`
    },
});
