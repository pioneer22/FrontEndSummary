import Vue from 'vue';
import LoadingComponent from '@/components/loading.vue';

// 通过Vue.extend将组件包装成一个子类
const LoadingConstructor = Vue.extend(LoadingComponent);

let loading = undefined;
LoadingConstructor.prototype.close = function () {
    // 如果loading 有引用, 则去掉引用
    loading && (loading = undefined);
    // 先隐藏组件
    this.visible = false;
    // 延迟300毫秒, 等待loading关闭动画执行完之后销毁组件。
    setTimeout(() => {
        // 移除挂载的DOM元素
        if (this.$el && this.$el.parentNode) {
            this.$el.parentNode.removeChild(this.$el);
        }
        // 调用组件的$destory方法进行组件销毁
        this.$destroy();
    }, 300)
}

const Loading = (options = {}) => {
    // 如果组件已渲染, 则返回即可
    if (loading) {
        return loading;
    }
    // 要挂载的元素
    const parent = document.body;
    // 组件属性
    const opts = {
        text: "",
        ...options
    }
    // 通过构造函数初始化组件, 相当于new Vue()
    const instance = new LoadingConstructor({
        el: document.createElement('div'),
        data: opts
    })
    // 将loading元素挂到parent上面
    parent.appendChild(instance.$el);
    // 显示loading
    setTimeout(() => {
        Vue.nextTick(() => {
            instance.visible = true
        })
    })
    // 将组件实例赋值给loading
    loading = instance;
    return instance;
}
Vue.prototype.$loading = Loading;
export default Loading;