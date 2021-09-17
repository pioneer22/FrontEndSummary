<template>
  <div class="container">
    <h3>1. 将一个prop限制在一个类型的列表中</h3>
    <pre>
      接收一个prop, 如果prop有效或无效, 则返回true或false
      props: {
        title: {
          type: String,
          validator: (s) => ["square", "rounded"].includes(s),
        }
      }
    </pre>

    <h3>2. 插槽</h3>
    <strong>单个作用域插槽可以简写, 不需要template标签。</strong>
    <prop-validator :title="title" :computed="someComputedProperty" ref="child">
      <pre>
          每个vue组件都有一个特殊的$slots对象, 里面是所有的插槽。默认插槽是default,
          任何被命名的插槽都使用其名称作为键。
          const $slots = {
              default: &lt;default slot&gt;
              bottom: &lt;bottom slot&gt;
          }
          通过v-if="$slots.default" 等有条件的渲染插槽, 避免渲染空div。
      </pre>
      <div slot="bottom">BOTTOM</div>
    </prop-validator>

    <pre>
      在向具名插槽提供内容的时候，我们可以在一个 &lt;template&gt; 元素上使用 v-slot 指令，并以 v-slot 的参数的形式提供其名称：

      &lt;template v-slot:xxx&gt;
        ......
      &lt;/template&gt;

      注意 v-slot 只能添加在 &lt;template&gt; 上, 除了独立默认插槽

      &lt;current-user v-slot="slotProps"&gt;
      &#123;&#123; slotProps.xxx &#125; &#125;
      &lt;/current-user&gt;

      v-slot 也有缩写，即把参数之前的所有内容 (v-slot:) 替换为字符 #, 该缩写只在其有参数的时候才可用。
      例如 v-slot:header 可以被重写为 #header

      当我们使用 &lt;todo-list&gt; 组件的时候，我们可以选择为 todo 定义一个不一样的 &lt;template&gt; 
      作为替代方案，并且可以从子组件获取数据
      <todo-list :filteredTodos="filteredTodos"></todo-list>
      <todo-list :filteredTodos="filteredTodos">
        <template #todo="{ todo }">
          <span v-if="todo.isComplete">✓</span>
          {{ todo.text }}
        </template>
      </todo-list>

      slot-scope 声明了被接收的 prop 对象会作为 变量存在于 &lt;template&gt; 作用域中
      <todo-list :filteredTodos="filteredTodos">
        <template slot="todo" slot-scope="{ todo }">
          <span v-if="todo.isComplete">✓</span>
          {{ todo.text }}
        </template>
      </todo-list>
    </pre>

    <h3>3. 如何在Vue之外创建一个具有响应性的变量。</h3>
    <pre>
      使用选项API, 需要的只是将其放在组件的数据部分中。
      const externalVariable = getValue();
      export default {
        data(){
          return {
            reactiveVariable: externalVariable,
          }
        }
      }

      使用Vue3的组合API, 可以直接使用 ref 或 reactive
      import { ref } from 'vue';
      // 可以完全在vue组件之外完成
      const externalVariable = getValue();
      const reactiveVariable = ref(externalVariable);
      console.log(reactiveVariable.value);

      // 使用 reactive 代替
      import { reactive } from 'vue';
      // 可以完全在vue组件之外完成
      const externalVariable = getVal();
      // reactive 只对对象和数组起作用
      const anotherReactiveVariable = reactive(externalVariable);
      console.log(anotherReactiveVariable);

      vue2 可以使用observale而不是reactive来实现
    </pre>

    <h3>4. v-for中的解构</h3>
    <ul>
      <li v-for="{ name, id } in users" :key="id">
        {{ name }}
      </li>

      <li v-for="(value, key, index) in persons" :key="key">
        {{ index + 1 }}. {{ key }}: {{ value }}
      </li>
    </ul>

    <h3>5. 监听组件里的任何东西</h3>
    <pre>
      computed: {
        someComputedProperty(){
          // update the computed prop
        }
      },

      watch: {
        someComputedProperty() {
          // Do something when the computed prop is updated
        }
      },

      可以监听计算属性, props, 嵌套值
      如果使用组合API, 任何值都可以被监视, 只要它是一个ref或reactive对象。
    </pre>

    <h3>6. 窃取组件的prop 类型</h3>
    <pre>
      在组件中使用了其它组件(内组件), 当内组件的prop类型被更新的时候, 我们可能会忘记返回内组件并更新它们。
      会导致组件的prop类型开始偏离内组件中的prop类型时, 就会引入错误。
    </pre>

    <h3>7. 检测元素外部(或内部)的点击</h3>
    <pre>
      检测一个点击是发生在一个特定元素的el内部还是外部。
      window.addEventListener('mousedown',()=>{
        // 获取被点击的元素
        const clickedEl = e.target;
        if(el.contains(clickedEl)){
          // 在'el'里面点击了
        } else {
          // 在'el'外面点击了
        }
      })
    </pre>

    <h3>8. 递归插槽</h3>
    <v-for :list="list"></v-for>

    <v-for :list="list">
      <template v-slot="{ item }">
        <strong>{{ item }}</strong>
      </template>
    </v-for>

    <h3>9. 组件元数据</h3>
    <pre>
      添加元数据, 为其他组件提供更多信息。
      让布局知道每个小组件应该占多少列, 直接在组件上添加元数据。
      export default{
        name: 'XX',
        columns: 3, // 将其作为一个额外的属性添加
        created(){
          console.log(`Using ${this.$options.columns} columns`)
        },
        props:{

        }
      }

      这个元数据是组件的一个属性。
      import XX from 'XX.vue';
      const { columns } = XX;

      可以通过特殊的$options属性从组件内部访问元数据。
    </pre>

    <h3>10. 多文件单文件组件</h3>
    <pre>
      像常规HTML文件一样导入文件, 可以方便分享样式, 文件或其他东西:
      &lt;template src="./template.html"&gt;&lt;/template&gt;
      &lt;script src="./script.js"&gt;&lt;/script&gt;
      &lt;style scoped src="./styles.css"&gt;&lt;/style&gt;
    </pre>

    <h3>11. 从组件外部调用一个方法</h3>
    <pre>
      从组件外部给他一个方法ref来调用一个方法。
      <!-- parent.vue -->
      &lt;template&gt;
        &lt;ChildComponent ref="child" /&gt;
      &lt;/template&gt;

      <!-- Somewhere in Parent.vue -->
      this.$refs.child.method();
      <a-button @click="testRef()">testRef</a-button>
    </pre>

    <h3>12. 监听数组和对象</h3>
    <pre>
      使用对象语法, 而不仅仅是方法
      监听对象或数组, 没有将deep设置为true
      objName / arrName: {
        deep: true,
        handler() {
          console.log("数组或对象发生改变~")
        }
      }
    </pre>

    <h3>13. template标签的另一个用途</h3>
    <p>template标签可以在模板中的任何地方使用。</p>

    <h3>14. 处理错误(和警告)的更好方法</h3>
    <pre>
      为Vue中的错误和警告提供一个自定义处理程序
      Vue.config.errorHandler = err => {
        console.log(err);
      }
    </pre>

    <h3>15. 处理加载状态</h3>
    <pre>
      将组件分成小块, 在需要时才从服务器上加载。
      Vue允许我们将组件定义为一个工厂函数, 异步地解析组件定义。
      Vue只会在组件需要渲染的时候触发工厂函数, 并把结果缓存起来以备后面的重新渲染。
      2.3版的新内容是： 异步组件工厂还可以返回一下格式的对象。
      const AsyncComponent = () => ({
        // 需要加载的组件(应该是一个 Promise 对象)
        component: import('./MyComponent.vue'),
        // 异步组件加载时使用的组件
        loading: LoadingComponent,
        // 加载失败时使用的组件
        error: ErrorComponent,
        // 展示加载时组件的延时时间。 默认值是 200(毫秒)
        delay: 200,
        // 如果提供了超时时间且组件加载也超时了,
        // 则使用加载失败时使用的组件。默认值为: 'Infinity',
        timeout: 3000
      })
    </pre>

    <h3>16. 递归组件</h3>
    <pre>
      组件可以在自己的模板中调用自身, 不过他们只能通过name选项来做这件事
      name: 'unique-name-of-my-component';

      使用Vue.component 全局注册一个组件时, 这个全局的ID会自动设置为该组件的name选项。
      Vue.component('unique-name-of-my-component', {

      })

      稍有不慎, 递归组件就可能导致无限循环
      name: 'stack-overflow',
      template: '&lt;div&gt;&lt;stack-overflow&gt;&lt;/stack-overflow&gt;&lt;/div&gt;'

      类似上面的组件将会导致"max stack size exceeded"错误, 所以请确保递归调用是条件性的
      (例如使用一个最终会得到 false 的 v-if)
    </pre>

    <h3>16. 动态指令参数</h3>
    <p v-pin:[direction]="200">hahahaahhahahahah hahahah hahaha hahahah</p>

    <div v-loading="{ text: '正在加载...', visible }"></div>

    <h3>17. 事件 &amp; 按键修饰符</h3>
    <pre>
      vue提供了相应的前缀可以用于on
      修饰符     前缀
      .passive => &amp;
      .capture => !
      .once => ~
      .capture.once 或 .once.capture => ~!

      on:{
        '!click': xxx,
        '~keyup': xxx,
        '~!mouseover: xxx'
      }

      .stop => event.stopPropagation()
      .prevent => event.preventDefault()
      .self =>  if(event.target !== event.currentTarget) return;
      .enter, .13 => if(event.keyCode !== 13) return;
    </pre>
    <button @click="keyDown()">修饰符Btn</button>

    <h3>18. 样式穿透</h3>
    <pre>
    样式穿透在css预处理器中使用才生效。
    less 使用 /deep/

    scss 使用 ::v-deep

    stylus 使用 >>>

    <h3>19. 小项目用 Vue.observable 手写一个状态管理</h3>
    创建store
    import Vue from 'vue';
    // 通过Vue.observable创建一个可响应的对象
    export const store = Vue.observable({
      userInfo: {},
      roleIds: []
    })

    // 定义mutations, 修改属性
    export const mutations = {
      setUserInfo(userInfo){
        store.userInfo = userInfo;
      },
      setRoleIds(roleIds){
        store.roleIds = roleIds;
      }
    }

    {{userInfo.name}}
    <h3>20. 开发全局组件, Vue.extend</h3>

    <h3>21. 繁乱的template--render函数</h3>
    &lt;h1 v-if="level === 1"&gt;
     &lt;slot&gt;&lt;/slot&gt;
    &lt;/h1&gt;
    &lt;h2 v-if="level === 2"&gt;
      &lt;slot&gt;&lt;/slot&gt;
    &lt;/h2&gt;
    &lt;h3 v-if="level === 3"&gt;
     &lt;slot&gt;&lt;/slot&gt;
    &lt;/h3&gt;

    render(createElement) {
      return createElement("h" + this.level, this.$slots.default);
    }
    <render :level="level">
      <div class="level">666666</div>
    </render>

    <h3>22. 一劳永逸的组件注册</h3>
    借助webpack的require.context()方法来创建自己的模块上下文, 从而实现动态require组件。
    该方法需要3个参数, 要搜索的文件夹目录, 是否还需要搜索它的子目录, 以及一个匹配文件的正则表达式。
    详见global.js

    <h3>23. router key</h3>
    页面切换到同一路由不同参数地址时, 跳转页面数据不更新
    可以通过为router-view组件添加key
    &lt;router-view :key="$route.fullpath"&gt;&lt;/router-view&gt;

    <button v-permission="'admin'">权限按钮1</button>
    <button v-permission="'visitor'">权限按钮2</button>
    <button v-permission="'editor'">权限按钮3</button>

    <h3>24. 动态指令参数</h3>
    <button @[someEvent]="handleSomeEvent()">动态指令</button>

    <h3>25. 过滤器</h3>
    对要显示的数据进行特定格式化后再显示, 并未改变原本的数据, 需要对展现的数据进行包装
    {{ testFilter | capitalize}}
    {{ testFilter | upper}}
    <div :id="rawId | capitalize">v-bind中使用过滤器</div>

    <p>{{usedNotThis}}</p>

    <h3>26. .sync修饰符</h3>
    <Toggle :show.sync="show"></Toggle>

    <h3>27. attr 和 listeners 让我们对一些组件库组件二次封装变得非常好用</h3>
    <h3>28. v-model 修饰符</h3>
    lazy: 可以将@input事件变成@blur事件
    number: 只能输入数字值
    trim: 清除两边空格

    v-model自定义属性, 在子组件绑定value和触发input事件, v-model的默认语法糖。
    &lt;MyInput v-model="msg" /&gt;

    &lt;template&gt;
      &lt;div&gt;
        &lt;input type="text" :value="value" @input="test"&gt;
      &lt;/div&gt;
    &lt;/template&gt;

    export default{
      props: ['value'],
      methods: {
        test(e) {
         this.$emit('input', e.target.value);
        }
      }
    }

    <CustomInput v-model="msg" @click.native="fuTempEvent"></CustomInput>

    <h3>29. 滚动页面</h3>
    当切换到新路由时，想要页面滚到顶部，或者是保持原先的滚动位置，就像重新加载页面那样。
    除了scrollTop, 可以使用VueRouter给我们提供的scrollBehavior钩子。
    详见router.js

    scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置

    // 对于所有路由导航，简单地让页面滚动到顶部
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }

    // 模拟“滚动到锚点”的行为
    if (to.hash) {
      return {
        selector: to.hash,
        // 实现原生平滑滚动
        behavior: 'smooth'
      }
    }

    // 异步滚动
    // 将其挂载到从页面级别的过渡组件的事件上，令其滚动行为和页面过渡一起良好运行是可能的
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ x: 0, y: 0 })
      }, 500)
    })

    第三个参数 savedPosition 当且仅当 popstate 导航 (通过浏览器的 前进/后退 按钮触发) 时才可用。

    检测导航故障
    import VueRouter from 'vue-router';
    const { isNavigationFailure, NavigationFailureType } = VueRouter;

    router.push('/admin').catch(failure => {
      if (isNavigationFailure(failure, NavigationFailureType.redirected)) {
        // 向用户显示一个小通知
        showToast('Login in order to access the admin panel');

        // 导航故障的属性
        failure.to.path // '/admin'
        failure.from.path // '/'
      }
    })

    <h3>30. 子组件定义的原生事件不生效</h3>
    例如在父组件定义一个click事件, 要在子组件通过$emit('click'触发才行)。
    如果就是想在父组件触发, 需要用到native修饰符。
    如上

    <h3>31. keep-alive缓存页面状态</h3>
    keep-alive帮助我们在切换组件的时候, 保留上一个组件不被销毁, 常用于管理后台系统中。

    <h3>32. 事件修饰符</h3>
    事件处理
    如果需要在内联语句处理器中访问原生DOM事件。可以使用特殊变量 $event, 把它传入到methods中的方法中。

    .stop: 等同于JavaScript中的 event.stopPropagation() 防止事件冒泡。
    .prevent: 等同于JavaScript中的 event.preventDefault(), 防止执行预设的行为
    (如果事件可取消, 则取消该事件, 而不阻止事件的进一步传播)
    例如： 我们页面的&lt;a href="#"&gt;标签, 当用户点击时, 通常在浏览器的网址列出#
    .capture: 与事件冒泡的方向相反, 事件捕获由外到内, 触发 父节点 -> 子节点 的点击事件
    .self: 只会触发自己范围内的事件, 不包含子元素。
    .once: 只会触发一次。

    <h3>33. 路由导航守卫</h3>
    组件内守卫:
    A. beforeRouteEnter
    B. beforeRouteUpdate
    C. beforeRouteLeave

    接受三个参数：
    to: Route即将要进入的目标路由对象
    from: Route当前导航正要离开的路由
    next: Function 一定要调用该方法来resolve这个钩子, 执行效果依赖next方法的调用参数。

    全局守卫:
    详见 router.js

    路由独享守卫:
    beforeEnter: (to, from, next) => {
      // ...
      next(vm => {
      // 通过 vm 访问组件实例
      });
    }


    // 一个路由匹配到的所有路由记录会暴露为 $route 对象 (还有在导航守卫中的路由对象) 的 $route.matched 数组。
    {
      path: 'bar',
      component: Bar,
      // a meta field
      meta: { requiresAuth: true }
    }

    router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      // this route requires auth, check if logged in
      // if not, redirect to login page.
      if (!auth.loggedIn()) {
        next({
        path: '/login',
        query: { redirect: to.fullPath }
        })
      } else {
        next()
      }
      } else {
        next() // 确保一定要调用 next()
      }
    })

    <h3>34. mixins 混入</h3>
    数据, 对象合并, 以组件为优先~
    {{ myMixins }}
    <button @click="btnFn">btnFn</button>

    <h3>35. 按键修饰符</h3>
    通过全局 config.keyCodes 对象
    Vue.config.keyCodes.f1 = 112
    <input @keyup.enter="showKey">

    <!-- .exact 修饰符允许你控制由精确的系统修饰符组合触发的事件。 -->
    <button @click.ctrl.exact="onCtrlClick">exact, 有且只有 Ctrl 被按下的时候才触发</button>

    <h3>36. 动态组件</h3>
    动态组件进行切换, 可以通过Vue的 &lt;component&gt;添加一个特殊的 is attribute来实现
    &lt;component :is="currentComponent"&gt;&lt;/component&gt;

    <h3>37. .sync修饰符</h3>
    对一个 prop 进行“双向绑定”
    :xxx.sync="xxx"
    .sync 修饰符的 v-bind 不能和表达式一起使用
    例: :xxx.sync="xxx + '!'" 是无效的
    用一个对象同时设置多个 prop : 可以将这个 .sync 修饰符和 v-bind 配合使用
    v-bind.sync="xxx"

    <h3>38. 异步组件</h3>
    将异步组件和 webpack 的 code-splitting 功能一起配合使用
    Vue.component('async-webpack-example', function (resolve) {
      // 这个特殊的 `require` 语法将会告诉 webpack
      // 自动将你的构建代码切割成多个包，这些包
      // 会通过 Ajax 请求加载
      require(['./my-async-component'], resolve)
    })

    在工厂函数中返回一个 Promise, 把 webpack 2 和 ES2015 语法加在一起
    Vue.component(
      'async-webpack-example',
      // 这个动态导入会返回一个 `Promise` 对象。
      () => import('./my-async-component')
    )

    # 处理加载状态
    异步组件工厂函数： 2.3.0+ , 用于Vue Router上的话 2.4.0+ 
    const AsyncComponent = () => ({
      // 需要加载的组件 (应该是一个 `Promise` 对象)
      component: import('./MyComponent.vue'),
      // 异步组件加载时使用的组件
      loading: LoadingComponent,
      // 加载失败时使用的组件
      error: ErrorComponent,
      // 展示加载时组件的延时时间。默认值是 200 (毫秒)
      delay: 200,
      // 如果提供了超时时间且组件加载也超时了，
      // 则使用加载失败时使用的组件。默认值是：`Infinity`
      timeout: 3000
    })

    <h3>39. 过渡 & 动画</h3>
    v-enter：定义进入过渡的开始状态。
    v-enter-active：定义进入过渡生效时的状态。
    v-enter-to：2.1.8 版及以上定义进入过渡的结束状态。
    v-leave：定义离开过渡的开始状态。 
    v-leave-active：定义离开过渡生效时的状态。
    v-leave-to：2.1.8 版及以上定义离开过渡的结束状态。
    <button @click="transitionShow = !transitionShow">
      Toggle
    </button>
    <transition name="slide-fade">
      <p v-if="transitionShow">hello</p>
    </transition>

    <button @click="transitionShow1 = !transitionShow1">Toggle show</button>
    <transition name="bounce">
      <p v-if="transitionShow1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Mauris facilisis enim libero, at lacinia diam fermentum id. Pellentesque habitant morbi
         tristique senectus et netus.</p>
    </transition>

    <strong>自定义过渡类名</strong>
    可以通过attribute来定义过渡类名, 他们的优先级高于普通的类名, 对于 Vue 的过渡系统和其他第三方 CSS 动画库结合使用十分有用。
    enter-class
    enter-active-class
    enter-to-class
    leave-class
    leave-active-class
    leave-to-class

    <button @click="transitionShow2 = !transitionShow2">
      Toggle render
    </button>
    <transition
      name="custom-classes-transition"
      enter-active-class="animated tada"
      leave-active-class="animated bounceOutRight"
      :duration="200"
    >
      <p v-if="transitionShow2">hello</p>
    </transition>

    <strong>显性过渡持续时间</strong>
    定制进入和移出的持续时间
    :duration="{ enter: 500, leave: 800 }"

    <strong>JavaScript 钩子</strong>
    &lt;transtiona
      @before-enter='beforeEnter'
      @enter='enter'
      @after-enter='afterEnter'
      @enter-cancelled='enterCancelled'

      @before-leave='beforeEnter'
      @leave='leave'
      @after-leave='afterLeave'
      @leave-cancelled='leaveCancelled'
    &gt;   &lt;transtion&gt;

    当只用 JavaScript 过渡的时候，在 enter 和 leave 中必须使用 done 进行回调。
    否则，它们将被同步调用，过渡会立即完成。

    推荐对于仅使用 JavaScript 过渡的元素添加 v-bind:css="false"，Vue 会跳过 CSS 的检测。
    这也可以避免过渡过程中 CSS 的影响。

    可以通过 appear attribute 设置节点在初始渲染的过渡。

    当有相同标签名的元素切换时, 给在 &lt;transition&gt; 组件中的多个元素设置 key 

    <strong>Vue 提供了过渡模式</strong>
    in-out：新元素先进行过渡，完成之后当前元素过渡离开。
    out-in：当前元素先进行过渡，完成之后新元素过渡进入。

    mode="out-in"

    <strong>Shuffle</strong>
    npm i --save lodash
    页面引入：import _ from "lodash/lodash";
    <button v-on:click="shuffle">Shuffle</button>
    <button v-on:click="add">Add</button>
    <button v-on:click="remove">Remove</button>
    <transition-group name="list-complete" tag="p">
      <span
        v-for="item in items"
        v-bind:key="item"
        class="list-complete-item"
      >
        {{ item }}
      </span>
    </transition-group>

    <strong>Velocity</strong>
    npm install velocity-animate --save-dev
    页面引入：import  Velocity from 'velocity-animate'
    <input v-model="query">
    <transition-group
      name="staggered-fade"
      tag="ul"
      v-bind:css="false"
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:leave="leave"
    >
      <li
        v-for="(item, index) in computedList"
        v-bind:key="item.msg"
        v-bind:data-index="index"
      >{{ item.msg }}</li>
    </transition-group>

    <strong>可复用的过渡</strong>
    将 &lt;transition&gt; 或者 &lt;transition-group&gt; 作为根组件，然后将任何子组件放置在其中

    函数式组件
    Vue.component('my-special-transition', {
      functional: true,
      render: function (createElement, context) {
        var data = {
          props: {
            name: 'very-special-transition',
            mode: 'out-in'
          },
          on: {
            beforeEnter: function (el) {
              // ...
            },
            afterEnter: function (el) {
              // ...
            }
          }
        }
        return createElement('transition', data, context.children)
      }
    })

    <input type="range" v-model="fadeInDuration" min="0" v-bind:max="maxFadeDuration">
  </pre>

  </div>
</template>

<script>
  import VFor from "@/components/VFor.vue";
  import render from "@/components/render.vue";
  import Toggle from "@/components/Toggle.vue";
  import todoList from "@/components/todoList.vue";

  import _ from "lodash/lodash";

  import Velocity from 'velocity-animate'

  import { store, mutations } from "@/utils/observable.js";
  import { mixins } from "@/utils/mixins.js";

  export default {
    name: "Vue",
    mixins: [mixins],
    data() {
      return {
        visible: false,

        title: null,
        users: [
          { name: "john", id: 1 },
          { name: "mike", id: 2 },
        ],
        persons: { name: "Lion King", released: 2019, director: "Jon" },
        list: ["qwer", "asdf", "zxcv"],
        num: 666,

        direction: "left",

        searchValue: "",
        level: 1,

        someEvent: true ? "click" : "dbclick",

        testFilter: "hello",

        rawId: "qwert",

        show: true,

        msg: false,

        baseInput: true,

        filteredTodos: [{
          id: 1, text: "A", isComplete: true
        }, {
          id: 2, text: "B", isComplete: false
        }, {
          id: 3, text: "C", isComplete: true
        }],

        transitionShow: true,
        transitionShow1: true,
        transitionShow2: true,

        items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        nextNum: 10,

        query: '',
        list: [
          { msg: 'Bruce Lee' },
          { msg: 'Jackie Chan' },
          { msg: 'Chuck Norris' },
          { msg: 'Jet Li' },
          { msg: 'Kung Fury' }
        ],

        fadeInDuration: 1000,
        maxFadeDuration: 1500

      };
    },

    provide: {
      foo: "bar",
    },

    components: {
      // 异步组件
      propValidator: () =>
        import(/* webpackChunkName:"propValidator" */ "@/components/propValidator.vue"),
      /*
        完整写法
        propValidator:()=>({
          component: import(/* webpackChunkName:"propValidator" * / "@/components/propValidator.vue"),
          delay: 200, //延迟几毫秒
          timeout: 3000, // 加载几毫秒之后就超时, 触发error组件
          loading: LoadingComponent, //组件未加载回来前显示
          error: ErrorComponent // 组件超时时显示
        }),
      */
      VFor,
      render,
      Toggle,
      todoList,
      CustomInput: () =>
        import(/* webpackChunkName:"CustomInput" */ "@/components/CustomInput.vue"),
    },

    computed: {
      someComputedProperty() {
        // update the computed prop
        return this.num;
      },

      userInfo() {
        return store.userInfo;
      },

      usedNotThis({ $attrs, $route, $store, $listener, $refs }) {
        console.log("$route:", $route);
        console.log("$store:", $store);
        console.log("$refs:", $refs);
        return "computed 第一个参数解构数据";
      },

      computedList: function () {
        var vm = this
        return this.list.filter(function (item) {
          return item.msg.toLowerCase().indexOf(vm.query.toLowerCase()) !== -1
        })
      }
    },

    watch: {
      "$route.query.id"() {
        this.$message.success("使用引号监听嵌套属性:", this.$route.query.id);
      },

      someComputedProperty(newVal, oldVal) {
        // Do something when the computed prop is updated
        this.$message.success(`监听数据: oldVal:${oldVal}, newVal:${newVal}`);
      },

      list: {
        deep: true,
        handler() {
          this.$message.success("数组或对象发生改变~");
        },
      },

      searchValue: {
        handler(newValue, oldValue) {
          if (newValue !== oldValue) {
            // 执行操作
          }
        },


        // 配置立即执行属性
        immediate: true,
      },
    },

    methods: {
      testRef() {
        this.$refs.child.setRef();
        this.num = this.num + 2;
      },

      keyDown() {
        this.$message.success("测试修饰符!");
      },

      handleSomeEvent() {
        this.$message.success("点击了~~");
      },

      fuTempEvent() {
        this.$message.success("父组件触发原生事件通过 .native修饰符~");
      },

      showKey() {
        this.$message.success('按下 Enter 了~');
      },

      onCtrlClick() {
        this.$message.success('只按下 ctrl');
      },

      randomIndex: function () {
        return Math.floor(Math.random() * this.items.length)
      },

      add: function () {
        this.items.splice(this.randomIndex(), 0, this.nextNum++)
      },

      remove: function () {
        this.items.splice(this.randomIndex(), 1)
      },

      shuffle: function () {
        this.items = _.shuffle(this.items);
      },

      beforeEnter: function (el) {
        el.style.opacity = 0
        el.style.height = 0
      },
      enter: function (el, done) {
        var delay = el.dataset.index * 150
        setTimeout(function () {
          Velocity(
            el,
            { opacity: 1, height: '1.6em' },
            { complete: done }
          )
        }, delay)
      },
      leave: function (el, done) {
        var delay = el.dataset.index * 150
        setTimeout(function () {
          Velocity(
            el,
            { opacity: 0, height: 0 },
            { complete: done }
          )
        }, delay)
      }

    },

    created() {
      // 加载指令
      this.visible = true;
      setTimeout(() => {
        this.visible = false;
      }, 1000);

      let that = this;
      document.onkeydown = function (e) {
        e = window.event || e;
        if (e.code.toLowerCase() === "enter") {
          that.keyDown();
        }
      };

      mutations.setUserInfo({
        name: "组件中引用数据",
      });
    },

    mounted() {
      console.log("Vue mounted");
    },

    filters: {
      capitalize: function (value) {
        if (!value) return "";
        value = value.toString();
        return value.charAt(0).toUpperCase() + value.slice(1);
      },
    },

    beforeRouteEnter(to, from, next) {
      console.log("Vue beforeRouteEnter");
      next((vm) => {
        // 钩子执行前组件还未被创建, vm相当与组件的this
        // console.log("vm:", vm);
      });
    },

    beforeRouteUpdate(to, from, next) {
      console.log("Vue beforeRouteUpdate");
      next();
    },

    beforeRouteLeave(to, from, next) {
      // 离开守卫， 用来禁止用户在还未修改保存前离开, 该导航可以通过next(false)来取消
      const answer = window.confirm('Do you really want to leave? you have unsaved changes!');
      if (answer) {
        next();
      } else {
        next(false);
      }
    },
  };
</script>

<style lang="scss" scoped>
  @import url('~@/assets/css/animate.css');

  .slide-fade-enter-active {
    transition: all .3s ease;
  }

  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter,
  .slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }

  /*   --------------- */
  .bounce-enter-active {
    animation: bounce-in .5s;
  }

  .bounce-leave-active {
    animation: bounce-in .5s reverse;
  }

  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }

    50% {
      transform: scale(1.5);
    }

    100% {
      transform: scale(1);
    }
  }

  .list-complete-item {
    transition: all 1s;
    display: inline-block;
    margin-right: 10px;
  }

  .list-complete-enter,
  .list-complete-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }

  .list-complete-leave-active {
    position: absolute;
  }
</style>