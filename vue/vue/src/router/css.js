const css = [
    {
        name: 'CSSSkill',
        path: '/CSSSkill',
        component:() => import(/* webpackChunkName: "CSS" */ '../views/Css.vue')
    },
    {
        name: 'CSSExam',
        path: '/CSSExam',
        component: () => import(/* webpackChunkName: "CSSExam" */ '../views/CSSExample.vue')
    },
]

export default css;