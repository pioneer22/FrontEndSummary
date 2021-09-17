const vue = [
  {
    name: 'VUEBase',
    path: '/VUEBase',
    component: () => import(/* webpackChunkName: "VUEBase" */ '../views/Vue.vue')
  },
  {
    name: 'VUEMST',
    path: '/VUEMST',
    component: () => import(/* webpackChunkName: "VUEMST" */ '../views/VUEMST.vue'),
    beforeEnter: (to, from, next) => {
      // 路由独享守卫
      next(vm => {
        // 通过 vm 访问组件实例
      });
    }
  },
]

export default vue;