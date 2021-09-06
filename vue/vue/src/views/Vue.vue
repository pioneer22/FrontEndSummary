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

    <h3>2. 单个作用域插槽可以简写, 不需要template标签。</h3>
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
      除了scrollTop, 可以使用VueRouter给我们提供的scrollBehavior钩子。
      详见router.js

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
      A. beforeRouteEnter
      B. beforeRouteUpdate
      C. beforeRouteLeave

      接受三个参数：
      to: Route即将要进入的目标路由对象
      from: Route当前导航正要离开的路由
      next: Function 一定要调用该方法来resolve这个钩子, 执行效果依赖next方法的调用参数。

      <h3>34. mixins 混入</h3>
      数据, 对象合并, 以组件为优先~
      {{ myMixins }}
      <button @click="btnFn">btnFn</button>
    </pre>
  </div>
</template>

<script>
import VFor from "@/components/VFor.vue";
import render from "@/components/render.vue";
import Toggle from "@/components/Toggle.vue";

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
  },

  watch: {
    "$route.query.id"() {
      console.log("使用引号监听嵌套属性:", this.$route.query.id);
    },

    someComputedProperty(newVal, oldVal) {
      // Do something when the computed prop is updated
      console.log(`监听数据: oldVal:${oldVal}, newVal:${newVal}`);
    },

    list: {
      deep: true,
      handler() {
        console.log("数组或对象发生改变~");
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
      console.log("测试修饰符!");
    },

    handleSomeEvent() {
      console.log("点击了~~");
    },

    fuTempEvent() {
      console.log("父组件触发原生事件通过 .native修饰符~");
    },
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
    console.log("Vue beforeRouteLeave");
    next();
  },
};
</script>

<style lang="scss" scoped></style>
