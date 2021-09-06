let { log } = console

/* 判断数组 */
let arr = []
log("arr instanceof Array =>", arr instanceof Array)
log("Array.isArray(arr) =>", Array.isArray(arr))
log("arr.constructor === Array =>", arr.constructor === Array)
log("Object.prototype.toString.call(arr) == '[object Array]' =>", Object.prototype.toString.call(arr) == '[object Array]')

let isType = (obj) => {
    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
}

log(isType([]))

/* Array.of 创建数组(es6) */
/* 创建包含所有传入参数的数组, 不管参数的数量与类型 */
let of_arr = Array.of(1, 2, 3)
log('Array.of :', of_arr)

/* Array.from 创建数组(es6) */
/* 将非数组对象转换为数组, 通过第二个参数实现映射转换, 如果映射函数需要在对象上工作, 手动传入第三个参数, 指定映射函数内部this值 */
function arrFrom(...args) {
    // let from_arr = Array.from(args)
    let from_arr = Array.from(args, val => val + 1)
    log('Array.from :', from_arr)
}
arrFrom('one', 2, 'three')

let third_args = {
    value: 5,
    add(value) {
        return value + this.value
    }
}

function translate() {
    // arguments 是一个对应于传递给函数的参数的类数组对象
    return Array.from(arguments, third_args.add, third_args)
}
log(translate('one', 2, 'three'))

/* 数组原型方法 */
/*
    join()
    push()
    pop()
    shift()
    unshift()
    slice()
    splice()
    fill(): 可接收三个参数, 填充位置, 起始位置参数, 结束位置参数(不包含该位置)
    filter()
    concat()
    indexOf(): 第二个参数,查找起点的索引
    lastIndexOf()
    every()
    some()
    includes(): 第二个参数, 开始查找元素的位置, 使用 === 运算符, NaN被认为与自身相等
    sort(): 默认字母升序
    reverse() : 反转顺序
    forEach()
    map()
    copyWithin() : 用于从数组的指定位置拷贝元素到数组的另一个指定位置中
    find(): 返回匹配的值
    findIndex() : 返回匹配位置的索引
    toLocaleString()、toString()
    flat()、flatMap(): 扁平化数组, 展开任意深度的嵌套数组
    entries()、 keys()、 values()
*/

let com_arr = [5, 4, 3, 6, 7, 8, 4, 2]
log("indexOf :", com_arr.indexOf(4, 2))

log("fill :", com_arr.fill('a'))

let every_arr = [2, 4, 6, 8]
log("every :", every_arr.every(val => val % 2 == 0))
log("some :", every_arr.some(val => val > 7))

let includes_arr = [1, NaN, 3]
log(includes_arr.indexOf(NaN))
log(includes_arr.includes(NaN))

let phone = '13633633336'
let sum_reduce = [...phone].reduceRight((acc, val, i, arr) => {
    if ((arr.length - i) % 4 === 0) {
        return ' ' + val + acc
    }
    return val + acc
}, '')
log(sum_reduce)

log("toString :",every_arr.toString())
log("toLocaleString :",every_arr.toLocaleString())

log(every_arr.find((val, key, arr) => val > 2))
log(every_arr.findIndex((val, key, arr) => val > 2))

let copy_arr = [1, 2, 3, 5, 4, 17, 6, 7, 8, 9]
copy_arr.copyWithin(3, 0)
log("copyWithin :",copy_arr)

copy_arr.copyWithin(4, 0, 5)
/*
    索引4的位置开始粘贴
    索引0的位置开始复制
    遇到索引5时停止复制：不包含该位置本身
*/
log(copy_arr)

let flat_arr = [1, 2, [3, [4, 5, [6, 7, 8]]]]
log("flat :",flat_arr.flat(Infinity))

/* 原数组有空位, flat()会跳过空位 */
let flat_arr1 = [1, 2, , 4, 5]
log(flat_arr1.flat())

/* flatMap() 对原数组每个成员执行一个函数, 相当与执行Array.prototype.map(),对返回值组成的数组执行flat()方法 */
let flat_arr2 = [2, 3, 4].flatMap(x => [x, x * 2])
log('[2, 3, 4].flatMap(x => [x, x * 2]) :', flat_arr2)

for (let key of ['a', 'b'].keys()) {
    log("keys:", key)
}

for (let val of ['a', 'b'].values()) {
    log("values:", val)
}

for (let [key, val] of ['a', 'b'].entries()) {
    log("entries:", key, val)
}