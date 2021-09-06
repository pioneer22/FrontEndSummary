const js = [
    {
        name: 'JSMST',
        path: '/JSMST',
        component: () => import(/* webpackChunkName: "JSMST" */ '../views/JSMST/JSMST.vue')
    },
    {
        name: 'JSSXT',
        path: '/JSSXT',
        component: () => import(/* webpackChunkName: "JSSXT" */ '../views/JSMST/JSSXT.vue')
    }

]

export default js;