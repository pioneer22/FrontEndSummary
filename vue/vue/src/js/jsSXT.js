/* 数据类型判断 */
const typeOfThis = function (obj) {
    let str = Object.prototype.toString.call(obj).split(' ')[1];
    str = str.substring(0, str.length - 1).toLowerCase();
    return str;
}

/* 寄生组合继承 */
function Parent(name) {
    this.name = name;
    this.childs = ['a', 'b'];
}
Parent.prototype.getName = function () {
    return this.name;
}
function Child(name, age) {
    Parent.call(this, name);
    this.age = age;
}
/* 封装 */
/* function object(o) {
    function F() { }
    F.prototype = o.prototype;
    return new F();
}
function inheritPrototype(child, parent){
    let prototype = object(parent);
    prototype.constructor = child;
    child.prototype = prototype;
}
inheritPrototype(Child, Parent); */

/* 改成寄生式组合继承 */
Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;

let child1 = new Child('tony', 12);
child1.childs.push('c');
let child2 = new Child('mike', 18);
console.log(child2);

/* class实现继承 */
class Parent1 {
    constructor(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
}
class Child1 extends Parent1 {
    constructor(name, age) {
        super(name);
        this.age = age;
    }
}

/* 数组去重 */
const unique = arr => arr.filter((item, index) => arr.indexOf(item) === index);

/* 数组扁平化 */
const flatten = array => JSON.parse('[' + JSON.stringify(array).replace(/\[|\]/g, '') + ']');

/* 数据类型检测 */
const isTypeOf = data => Object.prototype.toString.call(data).replace(/\[object (\w+)\]/,'$1').toLowerCase();

/* 深拷贝 */
const isObject = target => (typeof target === 'object' || typeof target === 'function') && target !== null;
function deepClone(target, map = new WeakMap()) {
    if (map.get(target)) return target;
    // 获取当前值的构造函数, 获取它的类型
    let constructor = target.constructor;
    // 检测当前对象target是否与正则、日期格式对象匹配
    if (/^(RegExp|Date)$/i.test(constructor.name)) {
        // 创建一个新的特殊对象(正则类/日期类)的实例
        return new constructor(target);
    }

    if (isObject(target)) {
        map.set(target, true); // 为循环引用的对象做标记
        const cloneTarget = Array.isArray(target) ? [] : {};
        for (let prop in target) {
            if (target.hasOwnProperty(prop)) {
                cloneTarget[prop] = deepClone(target[prop], map);
            }
        }
        return cloneTarget;
    } else {
        return target;
    }
}

/* 事件总线(发布订阅模式) */
class EventEmitter {
    constructor() {
        this.cache = {};
    }
    on(name, fn) {
        if (this.cache[name]) {
            this.cache[name].push(fn);
        } else {
            this.cache[name] = [fn];
        }
    }
    off(name, fn) {
        let tasks = this.cache[name];
        if (tasks) {
            const index = tasks.findIndex(f => f === fn || f.callback === fn)
            if (index >= 0) {
                tasks.splice(index, 1)
            }
        }
    }
    emit(name, once = false, ...args) {
        if (this.cache[name]) {
            // 创建副本, 如果回调函数内继续注册相同事件, 会造成死循环
            let tasks = this.cache[name].slice();
            for (let fn of tasks) {
                fn(...args);
            }
            if (once) {
                delete this.cache[name];
            }
        }
    }
}

// 测试
let eventBus = new EventEmitter();
let fn1 = function (name, age) {
    console.log(`${name} ${age}`);
}
let fn2 = function (name, age) {
    console.log(`hello, ${name} ${age}`);
}
eventBus.on('aaa', fn1);
eventBus.on('aaa', fn2);
eventBus.emit('aaa', false, 'mike', 12);

/* 解析URL参数为对象 */
function parseParam(url) {
    const paramStr = /.+\?(.+)$/.exec(url)[1];
    const paramArr = paramStr.split('&');
    let paramObj = {};

    // 将params存到对象中
    paramArr.forEach(param => {
        if (/=/.test(param)) {
            let [key, val] = param.split('=');
            val = decodeURIComponent(val);
            val = /^\d+$/.test(val) ? parseFloat(val) : val;

            if (paramObj.hasOwnProperty(key)) {
                paramObj[key] = [].concat(paramObj[key], val);
            } else {
                paramObj[key] = val;
            }
        } else { // 处理没有value的参数
            paramsObj[param] = true;
        }
    })
    return paramObj;
}

/* 图片懒加载 */
/* let imgList = [...document.querySelectorAll('img')];
let length = imgList.length;

const imgLazyLoad = function () {
    let count = 0;
    return function () {
        let deleteIndexList = [];
        imgList.forEach((img, index) => {
            let rect = img.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                img.src = img.dataset.src;
                deleteIndexList.push(index);
                count++;
                if (count === length) {
                    document.removeEventListener('scroll', imgLazyLoad)
                }
            }
        })
        imgList = imgList.filter((img, index) => !deleteIndexList.includes(index));
    }
} */

// 最好加上防抖处理
// document.addEventListener('scroll', imgLazyLoad);

/* 函数防抖 */
/*
    首次触发立即执行一次
    首次触发后没有再触发, 不进行延时触发
*/
function debounce(func, wait) {
    let timer = null;
    let leadingTimer = null;
    return function (...args) {
        if (timer) {
            clearTimeout(timer);
            clearTimeout(leadingTimer);
            timer = setTimeout(() => {
                func.call(this, false, args);
                leadingTimer = setTimeout(() => {
                    timer = null;
                }, wait);
            }, wait);
        } else {
            func.call(this, true, args);
            // 为了解决只触发一次 会同时触发首次触发和延时触发的问题引入的特殊值
            timer = -1;
        }
    }
}

// 深冻结
export function deepFreeze(obj){
    // 取回定义在obj上的属性名
    let propNames = Object.getOwnPropertyNames(obj);

    // 在冻结自身之前冻结属性
    propNames.forEach(function(name){
        const prop = obj[name];
        // 如果prop是个对象, 冻结它
        if(typeof prop == 'object' && prop !== null){
            deepFreeze(prop);
        }
    });

    // 冻结自身
    return Object.freeze(obj);
}