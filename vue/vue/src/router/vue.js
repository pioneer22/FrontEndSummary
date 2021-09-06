const vue = [
    {
        name: 'VUEBase',
        path: '/VUEBase',
        component:() => import(/* webpackChunkName: "VUEBase" */ '../views/Vue.vue')
    },
    {
        name: 'VUEMST',
        path: '/VUEMST',
        component: () => import(/* webpackChunkName: "VUEMST" */ '../views/VUEMST.vue')
    },
]

export default vue;