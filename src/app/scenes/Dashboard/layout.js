export const desktopLayout = {
    component: 'Grid',
    props: { container: true, spacing: 16, style: {height: '100%'} },
    children: [
        {
            component: 'Grid',
            props: { item: true, sm: 6, style: {height: 'calc(50% + 8px)'} },
            children: [ { component: 'SpringSummerChart' } ]
        },
        {
            component: 'Grid',
            props: { item: true, sm: 6, style: {height: 'calc(50% + 8px)'} },
            children: [ { component: 'YearToDateChart' } ]
        },
        {
            component: 'Grid',
            props: { item: true, sm: 6, style: {height: 'calc(50% + 8px)'} },
            children: [ { component: 'AutumnWinterChart' } ]
        },
        {
            component: 'Grid',
            props: { container: true, spacing: 16, style: {height: '100%'} },
            children: [
                {
                    component: 'Grid',
                    props: { item: true, md: 12, style: {height: 'calc(100% - 100px)' } },
                    children: [
                        {
                            component: 'Grid',
                            children: [ { component: 'VisitsChart' } ]
                        }
                    ]
                },
                {
                    component: 'Grid',
                    props: { item: true, md: 12, style: {height: '100px' } },
                    children: [
                        {
                            component: 'Grid',
                            children: [ { component: 'Margin' } ]
                        }
                    ]
                },
                {
                    component: 'Grid',
                    props: { item: true, md: 12, style: {height: '100px' } },
                    children: [
                        {
                            component: 'Grid',
                            children: [ { component: 'Rotation' } ]
                        }
                    ]
                }
            ]
        }
    ]
};

export const mobileLayout = {
};
