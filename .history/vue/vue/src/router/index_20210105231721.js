import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/view/Home')
    },
    {
      path: '/trans',
      name: 'Transition',
      component: () => import('@/view/ListTransition')
    },
    {
      path: '/slot',
      name: 'Slot',
      component: () => import('@/view/Slot')
    }
  ]
})
