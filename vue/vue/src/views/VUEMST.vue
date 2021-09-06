<template>
  <div>
    <pre>
          <h3>1. 对SPA单页面的理解, 优缺点是什么?</h3>
          SPA仅在Web页面初始化时加载相应HTML, Javascript, CSS,一旦加载完成, SPA不会因为用户的操作
          而进行页面的加载或跳转, 取而代之的是利用路由机制实现HTML内容的变换, UI与页面的交互,避免页
          面的重新加载。

          优点：
          A. 用户体验好、快、内容改变不需要加载整个页面, 避免了不必要的跳转和重复渲染。
          B. 基于上面一点, SPA对服务器压力相对较小。
          C. 前后端职责分离, 架构清晰, 前端进行交互逻辑, 后端负责数据处理。

          缺点：
          A. 初次加载耗时多, 它需要在加载页面时将js, css统一加载, 部分页面按需加载。
          B. 前进后退路由管理, 单页面应用在一个页面中显示所有内容, 所以不能使用浏览器前进后退功能,
          所有页面切换需要自己建立堆栈管理。
          C. SEO难度较大, 由于所有内容都在一个页面中动态替换显示, 所以在SEO上其有着天然的弱势。

          <h3>2. v-if和v-show</h3>
          v-if是真正的条件渲染, 它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建,
          也是惰性的。第一次条件变为真时才会开始渲染。

          v-show不管初始条件是什么都会被渲染, 只是简单的进行css的'display'属性进行切换。

          v-if适合那种运行时很少改变条件, 不需要频繁切换条件的场景。
          v-show则适用于需要非常频繁切换条件的场景。

          <h3>3. vue的单向数据流</h3>
          父子组件prop之间形成一个单向下行绑定, 父级prop的更新会向下流动到子组件中, 反过来则不行。
          防止从子组件意外改变父级组件的状态, 从而导致应用数据流难以理解。
          修改可通过子组件利用$emit派发自定义事件, 由父组件接收后修改。

          prop用来传递一个初始值, 子组件接下来希望将其作为一个本地的prop数据来使用。
          这种情况下, 最好定义一个本地的data属性并将这个prop用作其初始值。

          prop以一种原始的值传入并且需要进行转换。
          这种情况下, 最好使用这个prop的值来定义一个<strong>计算属性</strong>。

          <h3>4. computed和watch的区别和运用的场景</h3>
          computed: 计算属性, 依赖其他属性值, 并且computed的值有缓存, 只有它依赖的属性值发生改变,
          下一次获取的computed的值才会重新计算computed的值。

          watch： 更多是观察的作用, 每当监听的数据变化时就会执行回调进行后续操作。

          进行数据计算, 并且依赖其他数据, 应该使用computed, 因为可以利用computed的缓存特性, 避免每次
          获取值时都要重新计算。

          需要在数据变化时执行异步或开销较大的操作时, 应该使用watch, 使用watch选项允许我们执行异步操作,
          限制执行该操作的频率。

          <h3>4. 直接给一个数组项赋值, vue能检测到变化么?</h3>
          由于JavaScript限制, Vue不能检测到以下数组的变动。
          当你利用索引直接设置一个数组项时, 例如： vm.items[indexOfItem] = newValue
          当你修改数组的长度时,例如： vm.items.length = newLength

          第一个问题解决方法：
          // Vue.set
          Vue.set(vm.items, indexOfItem, newValue);

          // vm.$set, Vue.set的一个别名
          vm.$set(vm.items, indexOfItem, newValue);

          // Array.prototype.splice
          vm.items.splice(indexOfItem, 1, newValue);

          第二个问题解决方法：
          // Array.prototype.splice
          vm.items.splice(newLength)

          <h3>5. Vue生命周期</h3>
          Vue实例有一个完整的生命周期, 从开始创建, 初始化数据, 编译模板, 挂载DOM ->
          渲染、更新 -> 渲染、卸载等一系列过程。

          beforeCreate -> created -> (组件实例创建)
          beforeMount -> mounted -> (挂载实例)
          beforeUpdate -> update -> (组件数据更新)
          activited -> deactivated -> (keep-alive专属)
          beforeDestroy -> destroyed (组件销毁)

          <h3>6. 父子组件生命周期函数执行顺序?</h3>
          加载渲染过程
          父beforeCreate -> 父created -> 父beforeMount ->
          子beforeCreate -> 子created -> 子beforeMount -> 子mounted -> 父mounted

          子组件更新过程
          父beforeUpdate -> 子beforeUpdate -> 子updated -> 父updated

          父组件更新过程
          父beforeUpdate -> 父update

          销毁过程
          父beforeDestory -> 子beforeDestory -> 子destroyed -> 父destroyed

          <h3>7. 在哪个生命周期内调用异步请求</h3>
          可在created、beforeMount、mounted中调用。
          在created钩子函数中调用异步请求的优点：
          能更快获取服务端数据，减少页面loading时间。
          ssr不支持beforeMount、 mounted钩子函数, 所以放在created中有助于一致性。

          <h3>8. 在什么阶段才能访问操作DOM</h3>
          在钩子函数mounted被调用前, Vue已经将编译好的模板挂载到页面上, 所以在mounted中可以访问操作DOM。

          <h3>9. 父组件监听到子组件的生命周期？</h3>
          父组件监听到子组件挂载mounted就做一些逻辑处理
          parent
          &lt;child @mounted="doSomething" /&gt;

          child
          mounted(){
              this.$emit("mounted")
          }

          更简单的方式可以在父组件引用子组件时通过@hook来监听即可
          @hook 也可以监听其它的生命周期函数
          &lt;child @hook:@mounted="doSomething" /&gt;

          <h3>10. 对keep-alive的理解</h3>
          keep-alive是vue内置的一个组件, 可以使包含的的组件保留状态, 避免重新渲染, 其有以下特性：
          A. 一般结合路由和动态组件一起使用, 用于缓存组件。
          B. 提供include和exclude属性, 两者都支持字符串或正则表达式, include表示只有名称匹配的
          组件会被缓存, exclude表示任何名称匹配的组件都不会被缓存, exclude优先级比include高。
          C. 对应两个钩子函数 activated 和 deactivated , 当组件激活时触发钩子函数activated, 当
          组件被移除时, 触发钩子函数deactivated。

          <h3>11. data为什么是一个函数?</h3>
          因为组件是用来复用的，且js里的对象是引用关系，如果组件中的data是一个对，那么子组件的data
          属性值会相互影响，如果组件中的data选项是一个函数，那么每个实例可以维护一份被返回对象的独
          立的拷贝，组件实例间的data属性不会相互影响。而new Vue的实例, 是不会被复用的，因此不存在
          引用对象的问题。

          <h3>12. v-model原理</h3>
          v-model指令在表单input, textarea, select等元素上创建双向数据绑定，
          v-model在内部为不同的输入元素使用不同的属性并抛出不同的事件。

          input和textarea元素使用value属性和input事件
          checkbox和radio使用checked属性和change事件
          select字段将value作为prop并将change作为事件

          &lt;input v-model='something'&gt;
          &lt;input :value='something' @input="something = $event.target.value" &gt;

          <input-val v-model="message"></input-val>

          <h3>13. Vue组件间通信有几种方式</h3>
          父子组件通信, 隔代组件通信, 兄弟组件通信
          A. props / $emit 适用父子组件通信
          B. ref 与 $parent / $children 适用父子组件通信
             ref: 在普通的DOM元素上使用， 引用指向就是DOM元素
                  用在子组件上, 引用就指向组件实例。
             $parent / $children: 访问父 / 子实例。
          C. EventBus ($emit/$on) 适用于父子、隔代、兄弟组件通信
             通过一个空的Vue实例作为中央事件总线(事件中心), 用它来触发事件和监听事件, 从而实现组件间的通信
          D. $attrs / $listeners 适用于隔代组件通信
             $attrs：包含了父作用域中不被prop所识别(且获取)的特性绑定(class和style除外)。当一个组件没有声
             明任何prop时, 这里会包含所有父作用域的绑定(class和style除外), 并且可以通过v-bind="$attrs"传
             入内部组件。通常配合inheritAttrs选项一起使用。
             $listeners: 包含了父作用域中的(不含.native修饰器的)v-on事件监听器。它可以通过v-on="$listeners"
             传入内部组件。
          E. provide / inject 适用于隔代组件通信
             祖先组件中通过provider来提供变量, 然后在子孙组件中通过inject来注入变量。
             解决了跨级组件间的通信问题, 它的使用场景主要是子组件获取上级组件的状态, 跨级组件间建立一种主动提供
             与依赖注入关系。
          F. Vuex 适用于父子, 隔代, 兄弟组件通信
             Vuex一个专门为Vue.js应用程序开发的状态管理模式。
             Vuex中的状态存储是响应式的。当vue组件从store中读取状态的时候, 若store中的状态发生变化, 那么相应的
             组件也会相应地得到高效更新。
             改变store中的状态的唯一途径就是显示地提交(commit) mutation。使得我们可以方便地跟踪每一个状态变化。

             State: 定义了应用状态的数据结构, 可以设置默认的初始化状态。
             Getter: 允许组件从store中获取数据, mapGetters辅助函数仅仅是将store中的getter映射到局部计算属性。
             Mutation: 是唯一更改store中状态的方法, 且必须为同步函数。
             Action: 用于提交mutation, 而不是直接更改状态, 可以包含任意异步操作。
             Module: 允许将单一的Store拆分为多个store, 且同时保存在单一的状态树中。

          <h3>14. Vue SSR</h3>
          SSR: vue在客户端将标签渲染成的整个html片段的工作在服务端完成, 服务端形成的html片段直接返回给客户端
          这个过程就叫服务端渲染。

          服务端渲染的优点：
          更好的SEO: SPA页面的内容是通过Ajax获取, 而搜索引擎抓取工具并不会等待Ajax异步完成后再抓取页面内容, 所以
          在SPA中是抓取不到页面通过Ajax获取到的内容; 而SSR是直接由服务端返回已经渲染好的页面(数据已经包含在页面中),
          所以搜索引擎抓取工具可以抓取渲染好的页面。
          首屏加载更快: SPA会等待所有Vue编译后的js文件都下载完成后, 才开始进行页面渲染, 文件下载等需要一定的时间,
          所以首屏渲染需要一定的时间。

          服务端渲染的缺点：
          更多的开发条件限制： 例如服务端渲染只支持beforeCreate和created两个钩子函数, 这会导致一些外部拓展库需要
          特殊处理,才能在服务端渲染应用程序中运行;并且与可以部署在任何静态文件服务器上的完全静态单页面应用程序SPA
          不同, 服务端渲染应用程序, 需要处于Node.js server运行环境。

          更多的服务器负载：
          在Node.js中渲染完整的应用程序, 显然会比仅仅提供静态文件的server更加大量占用CPU资源, 如果预料在高流环境
          下使用, 请准备相应的服务器负载, 并明智地采用缓存策略。

          <h3>15. vue-router路由模式</h3>
          vue-router 有三种路由模式： hash, history, abstract, 对应源码
          switch(mode){
            case 'history':
               this.history = new HTML5History(this, options.base);
               break;
            case 'hash':
               this.history = new HashHistory(this, options.base, this.fallback);
               break;
            case 'abstract':
               this.history = new AbstractHistory(this, options.base);
               break;
            default:
              if(process.env.NODE_ENV !== 'production'){
                assert(false, `invalid mode: ${mode}`)
              }
          }

          hash: hash路由, 支持所有浏览器, 支持所有浏览器, 包括不支持HTML5 History模式
          history: 依赖HTML5 History API 和服务器配置。具体可以查看HTML5 History模式。
          abstract: 支持所有JavaScript运行环境, 如Node.js服务器端。如果发现没有浏览器的API,
          路由会自动强制进入这个模式。

          hash模式实现原理：
          早期前端路由实现是基于location.hash实现的, 实现原理: location.hash的值就是URL中#
          后面的内容。
          hash路由模式的实现主要基于几个特性：
          A. URL中hash值只是客户端的一种状态, 也就是说当向服务器发出请求时, hash部分不会被发送。
          B. hash值的改变, 都会在浏览器访问历史中增加一个记录。因此我们能通过浏览器的回退, 前进按钮控制hash的切换。
          C. 可以通过a标签, 并设置href属性, 当用户点击这个标签后, URL的hash值会发生改变; 或者使用JavaScript来对
          location.hash进行赋值, 改变URL的hash值。
          D. 可以使用hashchange事件来监听hash值的变化, 从而对页面进行跳转。

          history模式实现原理：
          HTML5提供了History API来实现URL的变化。其中最主要的的API有两个, history.pushState()和
          history.replaceState()。这两个API可以在不进行刷新的情况下, 操作浏览器的历史记录。唯一的不同是, 前者是新增一个
          历史记录, 后者是直接替换当前历史记录, 如下所示：
          window.history.pushState(null, null, path);
          window.history.replaceState(null, null, path);
          history路由模式的实现主要基于几个特性：
          A. pushState和replaceState两个API来操作实现URL的变化;
          B. 可以使用popstate事件来监听url的变化, 从而对页面进行跳转(渲染);
          C. history.pushState() 和 history.replaceState() 不会触发popstate事件, 这时我们需要手动触发页面跳转(渲染)。

          <h3>16. 什么是MVVM?</h3>
          Model-View-ViewModel, 是一个软件架构设计模式, 它的出现促进了前后端分离, 极大提高开发效率, MVVM的核心是ViewModel
          层, 它像一个中转站, 负责转换Model中的数据对象来让数据变得更容易管理和使用, 该层向上与视图层进行双向数据绑定, 向下与
          Model层通过接口请求进行数据交互, 起承上启下作用。
          View 视图层, 也就是用户界面。前端主要由 HTML 和 CSS 来构建。
          Model 数据模型, 泛指后端进行的各种业务逻辑处理和数据操控, 对于前端来说就是后端提供api接口。
          ViewModel 视图数据层, 前端开发对从后端获取的Model数据进行转换处理, 做二次封装, 以生成符合View层使用预期的视图数据
          模型。

          <h3>17. Vue如何实现双向数据绑定?</h3>
          双向数据绑定指: 数据变化更新视图, 视图变化更新数据。
          View变化更新Data, 可以通过事件监听的方式来实现, 所以Vue的数据双向绑定主要是如何根据Data变化更新View。
          A. 实现一个监听器Observer: 对数据对象进行遍历, 包括子属性对象的属性, 利用Object.defineProperty()对属性都加上setter
          和getter。这样的话, 给这个对象的某个值赋值, 就会触发setter, 那么就能监听到数据变化。

          B. 实现一个解析器Compile: 解析Vue模板指令, 将模板中的变量都替换成数据, 然后初始化渲染页面视图, 并将每个指令对应的
          节点绑定更新函数, 添加监听数据的订阅者, 一旦数据有变动, 收到通知, 调用更新函数进行数据更新。

          C. 实现一个订阅者Watcher: Watcher订阅者是Observer 和Compile之间通信的桥梁, 主要的任务是订阅Observer中的属性值变化
          的消息。当收到属性值变化的消息时, 触发解析器Compile中对应的更新函数。

          D. 实现一个订阅器Dep:订阅器采用 发布-订阅设计模式, 用来收集订阅者Watcher, 对监听器Observer和订阅者Watcher进行统一
          管理。

          <h3>18. Vue如何实现对象和数组的监听？</h3>
          observeArray(items:Array&lt;any&gt;){
            for(let i=0,l=items.length;i&lt;l;i++){
              observe(items[i]) // observe 功能为监测数组的变化。
            }
          }

          // 对属性进行递归遍历
          let childOb = !shallow && observe(val) // observe功能为监测数据的变化

          Vue是通过遍历数组和递归遍历对象, 从而达到利用Object.defineProperty()也能对对象和数组(部分方法的操作)进行监听。

          <h3>19. Proxy 和 Object.defineProperty 对比</h3>
          Proxy：
            Proxy可以直接监听对象而非属性。
            Proxy可以直接监听数组的变化。
            Proxy有多达13种拦截方法，不限于apply, ownKeys, delereProperty, has等都是Object.defineProperty不具备的。
            Proxy返回的是一个新对象, 我们可以只操作新的对象达到目的, 而Object.defineProperty只能遍历对象属性直接修改。
            Proxy作为新标准将受到浏览器厂商重点的持续优化, 具有新标准性能红利。

          Object.defineProperty:
            兼容性好, 支持IE9, 而Proxy的存在浏览器兼容性问题，无法用polyfill磨平。

          <h3>20. 虚拟DOM</h3>
          优点：

          无需手动操作DOM:
          保证性能下限:
          跨平台:

          缺点：
          无法进行极致优化：

          实现原理：
          用js对象模拟真实DOM树, 对真实DOM进行抽象。
          diff算法-比较两棵虚拟DOM数的差异。
          pach算法-将两个虚拟DOM对象的差异应用到真正的DOM树。

          <h3>21. Vue中的key有什么作用？</h3>
          key是vue中vnode的唯一标记, 通过这个key, 我们的diff操作可以更准确, 更快速。
          更准确：带key就不是就地复用。
          更快速：利用key的唯一性生成map对象来获取对应节点, 比遍历方式更快。

          <h3>22. 对Vue项目进行哪些优化?</h3>
          <strong>代码层面优化</strong>
          v-if与v-show区分使用场景
          computed和watch区分使用场景
          v-for遍历必须为item添加key, 且避免同时使用v-if
          长列表性能优化
          事件的销毁
          图片资源懒加载
          路由懒加载
          第三方插件按需引入
          优化无限列表性能
          服务端渲染SSR or 预渲染

         <strong>webpack层面的优化</strong>
          webpack对图片进行压缩
          减少ES6转为ES5的冗余代码
          提取公共代码
          模板预编译
          提取组件的CSS
          优化SourceMap
          构建结果输出分析
          Vue项目的编译优化

          <strong>基础的Web技术的优化</strong>
          开启gzip压缩
          浏览器缓存
          CDN的使用
          使用Chrome Performance 查找性能瓶颈

          <h3>23. VUE3.0特性</h3>
            监测机制的改变
            3.0将带来基于代理Proxy的observer实现, 提供全语言覆盖的反应性跟踪， 消除了Vue2中基于Object.defineProperty
            的实现所存在的很多限制。
            A. 只能监听属性，不能监听对象。
            B. 检测属性的添加和删除。
            C. 检测数组索引和长度的变更。
            D. 支持Map, Set, WeakMap, WeakSet

            模板方面没有大的变更, 只改了作用域插槽， 2.x的机制导致作用域插槽变了, 父组件会重新渲染，而3.0把作用域插槽改成了
            函数的方式, 这样只会影响子组件的重新渲染, 提升了渲染的性能。
            对于render函数方面， Vue3.0也会进行一系列更改来方便习惯直接使用api来生成vdom。

            对象式的组件声明方式
            vue2中的组件是通过声明的方式传入一系列option, 和TypeScript的结合需要通过一些装饰器的方式来做, 虽然能实现功能，
            但是比较麻烦。Vue3修改了组件的声明方式, 改成了类式的写法，这样使得和TypeScript的结合变得很容易。

            支持自定义渲染器，从而使得weex可以通过自定义渲染器方式来扩展, 而不是直接fork源码来改的方式。
            支持Fragment(多个根节点) 和 Protal(在dom其他部分渲染组建内容)组件，针对一些特殊的场景做了处理。
            基于treeshaking优化，提供了很多内置功能。
        </pre>
  </div>
</template>

<script>
import inputVal from "@/components/inputVal.vue";
export default {
  data() {
    return {
      message: "v-model click me!",
    };
  },

  created() {
    const loading = this.$loading({ text: "正在加载..." });
    // 3秒后关闭
    setTimeout(() => {
      loading.close();
    }, 1000);
  },

  components: {
    inputVal,
  },
};
</script>

<style lang="scss" scoped>
h3 {
  font-weight: bold;
}
</style>
