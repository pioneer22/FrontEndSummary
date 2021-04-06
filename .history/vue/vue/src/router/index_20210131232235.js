import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout';

import componentsRouter from './modules/components';
import vueRouter from './modules/vue';

export const constantRouters = [
  {
    path: '/',
    component: Layout,
    redirect: '/vue',
    children: [
      {
        path: 'vue',
        component: () => import('@/views/vue/index'),
        name: 'Vue',
        meta: { title: 'Vue', icon: 'vue', affix: true }
      }
    ]
  },
]

export const asyncRouters = [
  {

  },
  componentsRouter,
  vueRouter
]

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/Home')
    },
    {
      path: '/trans',
      name: 'Transition',
      component: () => import('@/views/ListTransition')
    },
    {
      path: '/slot',
      name: 'Slot',
      component: () => import('@/views/Slot')
    },
    {
      path: '/mixin',
      name: 'Mixin',
      component: () => import('@/views/Mixin')
    }
  ]
})
