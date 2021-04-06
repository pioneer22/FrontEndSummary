import Layout from '@/layout';

const vueRouters = {
  path: '/vue',
  component: Layout,
  redirect: '/vue/slot',
  name: 'Vue',
  meta: { title: 'Vue', icon: 'Vue' },
  children: [
    {
      path: 'mixin',
      component: () => import('@/views/vue/Mixin'),
      name: 'Mixin',
      meta: { title: 'Mixin' }
    },

    {
      path: 'transition',
      component: () => import('@/views/vue/ListTransition'),
      name: 'Transition',
      meta: { title: 'Transition' }
    },

    {
      path: 'slot',
      component: () => import('@/views/vue/Slot'),
      name: 'Slot',
      meta: { title: 'Slot' }
    }
  ]
}

export default vueRouters;