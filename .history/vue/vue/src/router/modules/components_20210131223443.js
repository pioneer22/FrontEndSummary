import Layout from '@/components/layout';

const componentsRoute = {
  path: '/components',
  comoponent: Layout,
  redirect: 'noRedirect',
  name: 'Component',
  meta: { title: 'Component', icon: 'component' },
  children: [
    {
      path: 'tinymce',
      component: () => import('@/views/components/testvue'),
      name: 'testvue',
      meta: { title: 'testvue' }
    }
  ]
}

export default componentsRoute;