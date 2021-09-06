<template>
  <div>
    <pre class="mst-container">
          <strong>1. 扁平化数组</strong>
             A. flat方法
                array.flat(Infinity)
             B. 利用正则
                JSON.parse('[' + JSON.stringify(array).replace(/\[|\]/g, '') + ']');
             C. 使用reduce
                const flatten = array => array.reduce((pre, cur)=> pre.concat(Array.isArray(cur) ? flatten(cur) : cur), [])
             D. 函数递归
                const fn = arr => {
                    let array = []
                    for(let i = 0; i &lt; arr.length; i++){
                        if(Array.isArray(arr[i]))
                            fn(arr[i]);
                        else
                            array.push(arr[i]);
                    }
                }
          <strong>2. 数组去重</strong>
             A. 利用set
                Array.from(new Set(array))
             B. 两层for循环 + splice
                const unique = arr => {
                  let len = arr.length;
                  for(let i = 0;i &lt; len; i++){
                    for(let j = i + 1; j &lt; len; j++){
                      if(arr[i] === arr[j]){
                        arr.splice(j, 1);
                        // 每删除一个数, j--保证j的值经过自加后不变。同时, len--, 减少循环次数提升性能。
                        len--;
                        j--;
                      }
                    }
                  }
                }
              C. 使用indexOf
                const unique = arr => {
                  const res = [];
                  for(let i = 0; i &lt; arr.length; i++){
                    if(res.indexOf(arr[i]) === -1){
                      res.push(arr[i])
                    }
                  }
                  return res;
                }
              D. 使用include
                const unique = arr => {
                  const res = [];
                  for(let i = 0;i &lt; arr.length; i++){
                    if(!res.include(arr[i])){
                      res.push(arr[i]);
                    }
                  }
                  return res;
                }
              E. 使用filter
                const unique = arr => arr.filter((item, index)=> arr.indexOf(item) === index);
              F. 使用Map
                const unique = arr => {
                  const map = new Map();
                  const res = [];
                  for(let i = 0; i &lt; arr.length; i++){
                    if(!map.has(arr[i])){
                      map.set(arr[i], true);
                      res.push(arr[i]);
                    }
                  }
                  return res;
                }
          <strong>3. 类数组转化为数组</strong>
              类数组具有length属性, 但不具有数组原型上的方法。常见的类数组有arguments、DOM操作方法返回的结果。
              A. Array.from
                Array.from(document.querySelectorAll('div'))
              B. Array.prototype.slice.call()
                Array.prototype.slice.call(document.querySelectorAll('div'))
              C. 拓展运算符
                [...document.querySelectorAll('div')]
              D. concat
                Array.prototype.concat.apply([], document.querySelectorAll('div'))
          <strong>4. Array.prototype.filter()</strong>
              Array.prototype.filter = function(callback, thisArg) {
                if (this == undefined) {
                  throw new TypeError('this is null or not undefined')
                }
                if(typeof callback !== 'function'){
                  throw new TypeError(callback + 'is not a function');
                }
                const res = [];
                // 让O成为回调函数的对象传递(强制转换对象)
                const O = Object(this);
                // >>>0 保证len为number, 且为正整数
                const len = O.length >>> 0;
                for(let i = 0; i &lt; 0; i++){
                  // 检查i是否在O的属性(会检查原型链)
                  if(i in O){
                    // 回调函数调用传参
                    if(callback.call(thisArg, O[i], i, O)){
                      res.push(O[i]);
                    }
                  }
                }
                return res;
              }

          <strong>5. Array.prototype.map()</strong>
            Array.prototype.map =  function(callback, thisArg){
              if (this == undefined) {
                throw new TypeError('this is null or not undefined')
              }
              if(typeof callback !== 'function'){
                throw new TypeError(callback + 'is not a function');
              }

              const res = [];
              const O = Object(this);
              const len = O.length >>> 0;
              for(let i = 0; i &lt; len; i++){
                if(i in O){
                  // 调用回调函数并传入新数组
                  res[i] = callback.call(thisArg, O[i], i, this);
                }
              }
              return res;
            }

          <strong>7. Array.prototype.reduce()</strong>
            Array.prototype.reduce =  function(callback, initialValue){
              if (this == undefined) {
                throw new TypeError('this is null or not undefined')
              }
              if(typeof callback !== 'function'){
                throw new TypeError(callbackfn + 'is not a function');
              }

              const O = Object(this);
              const len = this.length >>> 0;
              let accumulator = initialValue;
              let k = 0;
              // 如果第二个参数为undefined的情况下
              // 则数组的第一个有效值作为累加器的初始值
              if(accumulator === undefined){
                while(k &lt; len && !(k in O)){
                  k++;
                }

                // 如果超出数组界限还没有找到累加器的初始值, 则TypeError
                if(k >= len){
                  throw new TypeError('Reduce of empty array with no initial value');
                }
                accumulator = O[k++];
              }
              while(k &lt; len){
                if(k in O){
                  accumulator = callback.call(undefined, accumulator, O[k], k, O);
                }
                k++;
              }
              return accumulator;
            }

          <strong>8. Function.prototype.apply</strong>
            第一个参数是绑定的this, 默认为window, 第二个参数是数组或类数组
            Function.prototype.apply = function(context = window, args){
              if(typeof this !== 'function'){
                throw new TypeError('Type Error');
              }
              const fn = Symbol('fn');
              context[fn] = this;

              const res = context[fn](...args);
              delete context[fn];
              return res;
            }

          <strong>9. Function.prototype.call</strong>
            call()方法接收的是一个参数列表
            Function.prototype.call = function(context = window, ...args){
              if(typeof this !== 'function'){
                throw new TypeError('Type Error');
              }
              const fn = Symbol('fn');
              context[fn] = this;

              const res = context[fn](...args);
              delete context[fn];
              return res;
            }

          <strong>10. Function.prototype.bind</strong>
            Function.prototype.bind = function(context, ...args){
              if(typeof this !== 'function'){
                throw new TypeError('Type Error');
              }

              // 保存this的值
              var self = this;

              return function F(){
                // 考虑 new 情况
                if(this instanceof F){
                  return new self(...args, ...arguments);
                }

                return self.apply(context, [...args, ...arguments]);
              }
            }

          <strong>11. debounce(防抖)</strong>
            触发高频时间后n秒内函数只会执行一次, 如果n秒内高频时间再次触发, 重新计算时间
            通常用于用户进行搜索输入节约请求资源, window触发resize事件时进行防抖只触发一次
            const debounce = (fn, time) => {
              let timeout = null;
              return function(){
                clearTimeout(timeout);
                timeout = setTimeout(()=>{
                  fn.apply(this, arguments);
                }, time)
              }
            }

          <strong>12. throttle(节流)</strong>
            高频时间触发, 但n秒内只会执行一次, 所以节流会稀释函数的执行频率。
            通常用于鼠标不断点击触发、监听滚动事件。
            const throttle = (fn, time) => {
              let flag = true;
              return function(){
                if(!flag) return;
                flag = false;
                setTimeout(()=>{
                  fn.apply(this, arguments);
                  flag = true;
                }, time)
              }
            }

          <strong>13. 函数柯里化</strong>
            将一个接受多个参数的函数变为接受一个参数返回一个函数的固定形式, 便于再次调用 例如f(1)(2)
            实现add(1)(2)(3)(4) = 10;add(1)(1,2,3)(2) = 9;
            function add(){
              const _args = [...arguments];

              function fn(){
                _args.push(...arguments);
                return fn;
              }

              fn.toString = function(){
                return _args.reduce((sum,cur) => sum + cur);
              }

              return fn;
            }

          <strong>14. 模拟 new 操作</strong>
            A. 以ctor.prototype为原型创建一个对象。
            B. 执行构造函数并将this绑定到新创建的对象。
            C. 判断构造函数执行返回的结果是否是引用数据类型, 若是则返回构造函数执行的结果, 否则返回创建的对象。

            function newOperator(ctor, ...args){
              if(typeof ctor !== 'function'){
                throw new TypeError('TypeError');
              }

              const obj = Object.create(ctor.prototype);
              const res = ctor.apply(obj, args);

              const isObject = typeof res === 'object' && res !== null;
              const isFunction = typeof res === 'function';
              return isObject || isFunction ? res : obj;
            }

          <strong>15. instanceof</strong>
            instanceof运算符用于检测构造函数的prototype属性是否出现在某个实例对象的原型链上。
            const myInstanceof = (left, right) => {
              // 基本数据类型都返回false
              if(typeof left !== 'object' || left === null)
                return false;
              let proto = Object.getPrototypeOf(left);
              while(true){
                if(proto === null)
                  return false;
                if(proto === right.prototype)
                  return true;
                proto = Object.getPrototypeOf(proto);
              }
            }

          <strong>16. 原型继承</strong>
            寄生组合继承
            function Parent(){
              this.name = 'parent';
            }

            function Child(){
              Parent.call(this);
              this.type = 'children';
            }

            Child.prototype = Object.create(Parent.prototype);
            Child.prototype.constructor = Child;

          <strong>17. Object.is</strong>
          Object.is 主要解决 +0 === -0 // true, NaN === NaN // false
          const is = (x, y) => {
            if(x === y){
              return x !== 0 || y !== 0 || 1/x === 1/y;
            } else {
              return x !== x && y !== y;
            }
          }

          <strong>18. Object.assign</strong>
          Object.assign() 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象(该操作为浅拷贝)
          Object.defineProperty(Object, 'assign', {
            value: function(targrt, ...args){
              if(target === null){
                return new TypeError('Cannot convert undefined or null to object');
              }

              // 目标对象需要统一是引用数据类型, 若不是会自动转换
              const to = Object(target);
              for(let i = 0; i &lt; args.length; i++){
                // 每一个源对象
                const nextSource = args[i];
                if(nextSource !== null){
                  // 使用for...in 和hasOwnProperty双重判断, 确保只拿到本身的属性、 方法(不包含继承的)
                  for(const nextKey in nextSource){
                    if(Object.prototype.hasOwnProperty.call(nextSource, nextKey)){
                      to[nextKey] = nextSource[nextKey];
                    }
                  }
                }
              }
              return to;
            },
            // 不可枚举
            enumerable: false,
            writable: true,
            configurable: true,
          })

          <strong>19. 深拷贝</strong>
          递归完整版本, 考虑到Symbol属性
          const cloneDeep = (target, hash = new WeakMap()) => {
            // 对于传入的参数处理
            if(typeof target !== 'object' || target === null){
              return target;
            }
            // 哈希表中存在直接返回
            if(hash.has(target)){
              return hash.get(target);
            }

            const cloneTarget = Array.isArray(target) ? [] : {};
            hash.set(target, cloneTarget);

            // 针对Symbol属性
            const symKeys = Object.getOwnPropertySymbols(target);
            if(symKeys.length){
              symKeys.forEach(symKey => {
                if(typeof target[symKey] === 'object' && target[symKey] !== null){
                  cloneTarget[symKey] = cloneDeep(target[symKey]);
                }else{
                  cloneTarget[symKey] = target[symKey];
                }
              })
            }

            for(const i in target){
              if(Object.prototype.hasOwnProperty.call(target, i)){
                cloneTarget[i] = typeof target[i] === 'object' && target[i] !== null ? cloneDeep(target[i], hash) : target[i];
              }
            }
            return cloneTarget;
          }

          <strong>20. Promise</strong>
          Promise 利用三大手段解决回调地狱：
          A. 回调函数延迟绑定
          B. 返回值穿透
          C. 错误冒泡

          // 定义三种状态
          const PENDING = 'PENDING'; // 进行中
          const FULFILLED = 'FULFILLED'; // 已成功
          const REJECTED = 'REJECTED'; // 已失败

          class Promise {
            constructor(exector) {
              // 初始化状态
              this.status = PENDING;
              // 将成功、失败结果放在this上, 便于then、 catch访问
              this.value = undefined;
              this.reason = undefined;

              // 成功回调函数队列
              this.onFulfilledCallbacks = [];
              // 失败回调函数队列
              this.onRejectedCallbacks = [];

              const resolve = value => {
                // 只有进行中状态才能更改状态
                if(this.status === PENDING){
                  this.status = FULFILLED;
                  this.value = value;

                  // 成功函数依次执行
                  this.onFulfilledCallbacks.forEach(fn => fn(this.value));
                }
              }

              const reject = reason => {
                // 只有进行中状态才能更改状态
                if(this.status === PENDING){
                  this.status = REJECTED;
                  this.reason = reason;

                  // 失败态函数依次执行
                  this.onRejectedCalllbacks.forEach(fn => fn(this.reason));
                }
              }

              try{
                // 立即执行exector
                // 把内部的resolve和reject传入exector, 用户可调用resolve和reject
                exector(resolve, reject);
              }catch(e){
                 // exector执行出错, 将错误内容reject抛出去
                 reject(e);
              }
            }

            then(onFulfilled, onRejected){
              onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
              onRejected = typeof onRejected === 'function' ? onRejected : reason => {
                throw new Error(reason instanceof Error ? reason.message : reason)
              }

              // 保存this
              const self = this;
              return new Promise((resolve, reject) => {
                if(self.status === PENDING){
                  self.onFulfilledCallbacks.push(()=>{
                    // try捕获错误
                    try{
                      // 模拟微任务
                      setTimeout(()=>{
                        const result = onFulfilled(self.value);
                        // 分两种情况
                        // A. 回调函数返回值是Promise, 执行then操作
                        // B. 如果不是Promise, 调用新的Promise的resolve函数

                        result instanceof Promise ? result.then(resolve, reject) : resolve(result);
                      })
                    } catch(e) {
                      reject(e);
                    }
                  });

                  self.onRejectedCallbacks.push(() => {
                    // 同理
                    try{
                      setTimeout(()=>{
                        const result = onRejected(self.reason);
                        // 不同点, 此时是reject
                        result instanceof Promise ? result.then(resolve, reject) : resolve(result);
                      })
                    }catch(e){
                      reject(e);
                    }
                  })
                } else if(self.status === FULFILLED) {
                  try {
                    setTimeout(()=>{
                      const result = onFulfilled(self.value);
                      result instanceof Promise ? result.then(resolve, reject) : resolve(result);
                    })
                  } catch(e) {
                     reject(e);
                  }
                 } else if(self.status === REJECTED) {
                   try {
                    setTimeout(()=>{
                      const result = onRejected(self.reason);
                      result instanceof Promise ? result.then(resolve, reject) : resolve(result);
                    })
                  } catch(e) {
                     reject(e);
                  }
                 }
              });
            }

            catch(onRejected) {
              return this.then(null, onRejected);
            }

            static resolve(value) {
              if(value instanceof Promise) {
                // 如果是Promise实例, 直接返回
                return value;
              } else {
                // 如果不是Promise实例, 返回一个新的Promise对象, 状态为FULFILLED
                return new Promise((resolve, reject) => resolve(value));
              }
            }

            static reject(reason) {
              return new Promise((resolve, reject) => {
                reject(reason);
              })
            }

            static all(promiseAll) {
              const len = promiseAll.length;
              const values = new Array(len);
              // 记录已经成功执行的promise个数
              let count = 0;
              return new Promise((resolve, reject)=>{
                for(let i = 0;i &lt; 0; i++){
                  // Promise.resolve 处理, 确保每一个都是promise实例
                  Promise.resolve(promiseArr[i]).then(val=>{
                    values[i] = val;
                    count++;
                    // 如果全部执行完, promise的状态就可以改变了
                    if(count === len)
                      resolve(values);
                  }, err => reject(err));
                }
              })
            }

            static race(promiseArr) {
              return new Promise((resolve, reject) => {
                promiseAll.forEach(p => {
                  Promise.resolve(p).then(
                    val => resolve(val),
                    err => reject(err),
                  )
                })
              })
            }
          }

        <strong>21. Promise.all</strong>
        Promise支持链式调用, 本质就是返回一个Promise实例, 通过resolve和reject 来改变实例状态。
        Promise.myAll = function(promiseArr){
          return new Promise((resolve, reject) => {
            const ans = [];
            let index = 0;
            for(let i = 0; i &lt; promiseAll.length; i++){
              promiseArr[i].then(res => {
                ans[i] = res;
                index++;
                if(index === promiseArr.length){
                  resolve(ans);
                }
              }).catch(err => reject(err));
            }
          })
        }

        <strong>22. Promise.race</strong>
        Promise.race = function(promiseArr){
          return new Promise((resolve, reject) => {
            promiseArr.forEach(p => {
              // 如果不是Promise实例, 需要转化为Promise实例
              Promise.resolve(p).then(val => resolve(val), err => reject(err))
            })
          })
        }

        <strong>23. Promise并行限制</strong>
        实现有并行限制的Promise调度器问题。
        class Scheduler{
          constructor(){
            this.queue = [];
            this.maxCount = 2;
            this.runCounts = 0;
          }

          add(promiseCreator){
            this.queue.push(promiseCreator);
          }

          taskStart() {
            for(let i = 0; i &lt; this.maxCount; i++){
              this.request();
            }
          }

          request(){
            if(!this.queue || !this.queue.length || this.runCounts >= this.maxCount){
              return;
            }

            this.runCounts++;
            this.queue.shift()().then(()=>{
              this.runCounts--;
              this.request();
            })
          }
        }


        const timeout = time => new Promise(resolve => {
          setTimeout(resolve, time);
        })

        const scheduler = new Scheduler();
        const addTask = (time, order) => {
          scheduler.add(() => timeout(time).then(()=>console.log(order)));
        }

        addTask(1000, '1');
        addTask(500, '2');
        addTask(300, '3');
        addTask(400, '4');
        scheduler.taskStart();

        <strong>24. JSONP</strong>
        const jsonp = ({url, params, callbackName}) => {
          const generateUrl = () => {
            let dataSrc = '';
            for(let key in params){
              if(Object.prototype.hasOwnProperty.call(params, key)) {
                dataSrc += `${key}=${params[key]}&`;
              }
            }

            dataSrc += `callback=${callbckName}`;
            return `${url}?${dataSrc}`;
          }

          return new Promise((resolve, reject) => {
            const scriptEle = document.createElement('script');
            scriptEle.src = generateUrl();

            document.body.appendChild(scriptEle);
            window[callbackName] = data => {
              resolve(data);
              document.removeChild(scriptEle);
            }
          })
        }

        <strong>25. AJAX</strong>
        const getJSON = function(url){
          return new Promise((resolve, reject) => {
            const xhr = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Mscrosoft.XMLHttp');
            xhr.open('GET', url, false);

            xhr.setRequestHeader('Accept', 'application/json');
            xhr.onreadystatechange = function(){
              if(xhr.readyState !== 4)
                return;
              if(xhr.status === 200 || xhr.status === 304){
                resolve(xhr.responseText);
              } else {
                reject(new Error(xhr.responseText));
              }
            }
            xhr.send();
          })
        }

        <strong>26. event模块</strong>
        node中回调函数的机制, node中回调函数其实是使用了观察者模式。
        观察者模式: 定义了对象一种一对多的依赖关系, 目标对象发生改变时, 所有依赖它的对象Observer都会得到通知。
        function EventEmitter(){
          this.events = new Map();
        }

        // 需要实现一些方法
        // addListener, removeListener, once, removeAllListeners, emit

        // 模拟实现addlistener方法
        const wrapCallback = (fn, once = false) =>({callback: fn, once});
        EventEmitter.prototype.addListener = function(type, fn, once = false){
          const handler = this.events.get(type);
          if(!handler) {
            // 没有 type 绑定事件
            this.events.set(type, wrapCallback(fn, once))
          } else if(handler && typeof handler.callback === 'function'){
            // 目前 type 事件只有一个回调
            this.events.set(type, [handler,wrapCallback(fn, once)]);
          } else {
            // 目前type事件>=2
            handler.push(wrapCallback(fn, once));
          }
        }

        // 模拟实现removeListener
        EventEmitter.prototype.removeListener = function(type, listener) {
          const handler = this.events.get(type);
          if(!handler) return;
          if(!Array.isArray(this.events)){
            if(handler.callback === listener.callback)
              this.events.delete(type);
            else
              return;
          }
          for(let i = 0;i &lt; handler.length; i++){
            const item = handler[i];
            if(item.callback === listener.callback){
              handler.splice(i, 1);
              i--;
              if(handler.length === 1){
                this.events.set(type, handler[0]);
              }
            }
          }
        }

        // 模拟实现 once 方法
        EventEmitter.prototype.once = function(type, listener){
          this.addListener(type, listener,true);
        }

        // 模拟实现emit方法
        EventEmitter.prototype.emit = function(type, ...args){
          const handler = this.events.get(type);
          if(Array.isArray(handler)){
            handler.forEach(item => {
              item.callback.apply(this, args);
              if(item.once){
                this.removeListener(type,item);
              }
            })
          } else {
            handler.callback.apply(this, args);
            if(handler.once){
              this.events.get(type);
            }
          }
          return true;
        }

        EventEmitter.prototype.removeAllListeners = function(type){
          const handler = this.events.get(type);
          if(!handler) return;
          this.events.delete(type);
        }

        <strong>27. 图片懒加载</strong>
        function lazyload(){
          const imgs = document.getElementsByTagName('img');
          const len = imgs.length;
          // 视口高度
          const viewHeight = document.documentElement.clientHeight;
          // 滚动条高度
          const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop;

          for(let i = 0;i &lt; len; i++){
            const offsetHeight = imgs[i].offsetTop;
            if(offsetHeight &lt; viewHeight + scrollHeight){
              const src = imgs[i].dataset.src;
              imgs[i].src = src;
            }
          }
        }

        // 可以使用函数节流优化一下
        window.addEventListener('scroll', lazyload);

        <strong>28. 滚动加载</strong>
        监听页面滚动事件, 分析clientHeight, scrollTop, scrollHeight三者的属性关系。

        window.addEventListener('scroll', function(){
          const clientHeight = document.documentElement.clientHeight;
          const scrollTop = document.documentElement.scrollTop;
          const scrollHeight = document.documentElement.scrollHeight;
          if(clientHeight + scrollTop >= scrollHeight){
            // 检测到滚动到页面底部, 进行后续操作

          }
        }, false);

        <strong>29. 渲染几万条数据不卡住页面</strong>
        渲染大数据, 合理使用createDocumentFragment 和 requestAnimationFrame, 将操作且分为一小段一小段执行。
        setTimeout(()=>{
          // 插入10万条数据
          const total = 100000;
          // 一次插入的数据
          const once = 20;
          // 插入数据需要的次数
          const loopCount = Math.ceil(total / once);
          let countOfRender = 0;
          const ul = document.querySelector('ul');

          // 添加数据的方法
          function add(){
            const fragment = document.createDocumentFragment();
            for(let i = 0; i &lt; once; i++){
              const li = document.createElement('li');
              li.innerText = Math.floor(Math.random() * total);
              fragment.appendChild(li);
            }

            ul.appendChild(fragment);
            countOfRender += 1;
            loop();
          }

          function loop(){
            if(countOfRender &lt; loopCount) {
              window.requestAnimationFrame(add);
            }
          }

          loop();
        }, 0);

        <strong>30. 打印当前网页使用了多少种html元素</strong>
        const fn = () => [...new Set([...document.querySelectorAll('*')].map(el => el.tagName))].length;

        <strong>31. 将VirtualDom转化为真实DOM结构</strong>
        当前SPA应用的核心概念之一。
        // vnode结构
        /*
          {
            tag,
            attrs,
            children
          }
         */

         // Virtual DOM => DOM
         function render(vnode,container){
           container.appendChild(_render(vnode));
         }

         function _render(vnode){
           // 如果是数字类型转化为字符串
           if(typeof vnode === 'number'){
             vnode = String(vnode);
           }
           // 如果是字符串类型直接就是文本节点
           if(typeof vnode === 'string'){
             return document.createTextNode(vnode);
           }
           // 普通DOM
           const dom = document.createElement(vnode.tag);
           if(vnode.attrs){
             // 遍历属性
            Object.keys(vnode.attrs).forEach(key => {
              const value = vnode.attrs[key];
              dom.setAttribute(key, value);
            })
           }

            // 子数组进行递归操作
            vnode.children.forEach(child=> render(child, dom));
            return dom;
         }

         <strong>32. 字符串解析问题</strong>
         var a = {
           b : 123,
           c : '456',
           e : '789'
         }
         var str = `a{a.b}aa{a.c}aa{a.d}aaaa`;

         实现函数使得将str字符串中的{}内的变量替换, 如果属性不存在保存原样
         const fn = (str, obj) => {
           let res = '';
           // 标志位, 前面是否有{
           let flag = false;
           let start;
           for(let i = 0; i < str.length; i++){
             if(str[i] === '{'){
               flag = true;
               start = i + 1;
               continue;
             }
             if(!flag) res += str[i];
             else {
               if(str[i] === '}'){
                 flag = false;
                 res += match(str.slice(start, i), obj);
               }
             }
           }
           return res;
         }

         // 对象匹配操作
         const match = (str, obj) => {
           const keys = str.split('.').slice(1);
           let index = 0;
           let o = obj;
           while(index < keys.length){
             const key = keys[index];
             if(!o[key]){
               return `{${str}}`;
             } else {
               o = o[key];
             }
             index++;
           }
           return o;
         }

         <strong>33. 偏函数</strong>
         将一个n参的函数转换成固定x参的函数, 剩余参数(n-x)将在下次调用全部转入
         例如：
         function add(a,b,c){
           return a+b+c;
         }
         let particalAdd = partical(add, 1);
         particalAdd(2,3);

         function partical(fn, ...args){
           return (...arg)=>{
             return fn(...args,...arg);
           }
         }
      </pre>
  </div>
</template>

<script>
import { deepFreeze } from "@/js/jsSXT.js";
export default {
  data() {
    return {};
  },
  created() {
    this.ziFuJieXi();

    this.getObj();
  },
  methods: {
    ziFuJieXi() {
      var a = {
        b: 123,
        c: "456",
        e: "789",
      };
      var str = `a{a.b}aa{a.c}aa{a.d}aaaa`;
      console.log(this.fn(str, a));
    },

    fn(str, obj) {
      let res = "";
      // 标志位, 前面是否有{
      let flag = false;
      let start;
      for (let i = 0; i < str.length; i++) {
        if (str[i] === "{") {
          flag = true;
          start = i + 1;
          continue;
        }
        if (!flag) {
          res += str[i];
        } else {
          if (str[i] === "}") {
            flag = false;
            res += this.match(str.slice(start, i), obj);
          }
        }
      }
      return res;
    },

    match(str, obj) {
      const keys = str.split(".").slice(1);
      let index = 0;
      let o = obj;
      while (index < keys.length) {
        const key = keys[index];
        if (!o[key]) {
          return `{${str}}`;
        } else {
          o = o[key];
        }
        index++;
      }
      return o;
    },

    getObj() {
      let obj = {
        a: "qwer",
        b: 123,
      };
      let newObj = Object.create(obj);
      newObj.newItemA = "newItemAVal";
      newObj.newItemB = "newItemBVal";
      console.log("newObj:", newObj);
      // 遍历对象所有的可枚举属性(包括自有属性和继承属性)
      for (let key in newObj) {
        console.log(key);
      }
      console.log("----------------");
      // 将其中一个属性变为不可枚举属性
      Object.defineProperty(newObj, "newItemA", {
        enumerable: false,
      });
      for (let key in newObj) {
        console.log(key);
      }
      console.log("----------------");
      // 不想枚举继承来的属性, 借助Object.prototype.hasOwnProperty()
      for (let key in newObj) {
        if (newObj.hasOwnProperty(key)) {
          console.log(key);
        }
      }
      // 返回可枚举的自有属性名称
      let keys = Object.keys(newObj);
      console.log(keys);
      let values = Object.values(newObj);
      console.log(values);
      console.log("----------------");
      // 返回自有属性名称, 不管是不是可枚举
      let proNames = Object.getOwnPropertyNames(newObj);
      console.log(proNames);
      console.log("----------------");
      /*
        Object.assign(target, ...sources)方法用于将所有可枚举属性的值从一个或多个源对象分配到目标对象,
        将返回目标对象, 常用来合并对象
      */
      let obj1 = { a: 1, b: 2 },
        obj2 = { b: 3, c: 4 };
      let obj3 = Object.assign(obj1, obj2);
      let obj4 = Object.assign({}, obj1); // 克隆了obj1对象
      console.log("obj1:", obj1);
      console.log("obj2:", obj2);
      console.log("obj3:", obj3);
      console.log("obj4:", obj4);
      console.log("----------------");
      // Object.entries
      let obj5 = {
        name: "entries",
        age: 18,
      };

      for (let [key, value] of Object.entries(obj5)) {
        console.log(`${key}: ${value}`);
      }
      console.log(Object.entries(obj5));
      console.log("----------------");
      // 将Object转为Map, new Map()构造函数接受一个可迭代的entries, 借助Object.entries()
      let map = new Map(Object.entries(obj5));
      console.log(map);

      /*
        Object.fromEntries(iterable), 把键值对列表转换为一个对象, 相当于反转了Object.entries()方法返回的数据结构
        参数iterable类似Array,Map或其它实现了可迭代协议的可迭代对象。返回一个由该迭代对象条目提供对应属性的新对象
      */
      let entries = new Map([
        ["foo", "bar"],
        ["baz", 42],
      ]);

      let obj6 = Object.fromEntries(entries);
      console.log(obj6);
      console.log("----------------");
      /*
        Object.freeze(obj)方法可以冻结一个对象, obj: 要被冻结的对象
        一个被冻结的对象再也不能被修改
      */
      let obj7 = {
        aa: 42,
        bb: {
          cc: 12,
        },
      };

      Object.freeze(obj7);
      //  obj7.aa = 55;
      console.log(obj7);

      // 冻结的对象不是常量对象(浅冻结)
      obj7.bb.cc = 32;
      console.log(obj7.bb.cc);

      // 要使对象不可变, 需要递归冻结每个类型为对象的属性(深冻结)
      deepFreeze(obj7);
      // obj7.bb.cc = 52;
      console.log(obj7.bb.cc);
      console.log("----------------");
      // Object.isFrozen(), 判断一个对象是否被冻结。
      // 一个不可拓展的空对象, 同时是一个冻结对象
      console.log(Object.isFrozen(Object.preventExtensions({})));
      console.log(Object.isFrozen(obj7));
    },
  },
};
</script>

<style lang="scss" scoped>
.mst-container::selection,
.mst-container > strong::selection {
  background-color: salmon;
  color: white;
}
</style>
