import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'

import js from './router/js';
import css from './router/css';
import vue from './router/vue';

const originalPush = Router.prototype.push;
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err);
}

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      redirect: "/VUE",
      children: [
        {
          name: 'VUE',
          path: '/VUE',
          redirect: "/VUEBase",
          component: () => import(/* webpackChunkName: "VUE" */ './template/jsTemp.vue'),
          children: vue
        },
        {
          name: 'RegExp',
          path: '/RegExp',
          component: () => import(/* webpackChunkName: "RegExp" */ './views/RegExp.vue')
        },
        {
          name: 'CSS',
          path: '/CSS',
          redirect: "/CSSSkill",
          component: () => import(/* webpackChunkName: "CSS" */ './template/jsTemp.vue'),
          children: css
        },
        {
          name: 'JS',
          path: '/JS',
          redirect: "/JSMST",
          component: () => import(/* webpackChunkName: "JS" */ './template/jsTemp.vue'),
          children: js
        },
        {
          name: 'Git',
          path: '/Git',
          component: () => import(/* webpackChunkName: "Git" */ './views/Git.vue')
        },
        {
          name: 'Node',
          path: '/Node',
          component: () => import(/* webpackChunkName: "Node" */ './views/Node.vue')
        },
      ]
    }
  ],

  scrollBehavior (to, from, position) {
    return {
      // 返回参数详见官网
      x: 100,
      y: 500,
      selector: '#app',
      offset: 200,
    }
  },

});

/* 全局导航守卫 */
router.beforeEach((to, from, next) => {
  console.log("global beforeEach");
  next();
});

router.beforeResolve((to, from, next) => {
  console.log("global beforeResolve");
  next();
});

router.afterEach((to, from) => {
  // 全局后置守卫,  不会接受 next 函数也不会改变导航本身
  console.log("global afterEach");
})


export default router;
