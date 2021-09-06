import Vue from 'vue';

import LoadingComponent from '@/components/loading.vue';

import { checkArray } from './array.js';

// 使用 Vue.extend构造组件子类
const LoadingConstructor = Vue.extend(LoadingComponent);

Vue.directive('pin', {
    bind(el, binding, vnode) {
        // 指令第一次绑定到元素时调用, 只执行一次, 这里可以进行一次性的初始化设置
        el.style['margin-' + binding.arg] = binding.value + 'px';
    },

    inserted() {
        //被绑定的元素, 插入到父节点的DOM中时调用(仅保证父节点存在)
    },

    update() {
        // 组件更新时调用
    },

    componentUpdated() {
        // 组件与子组件更新时调用
    },

    unbind(el) {
        //指令与元素解绑时调用, 只执行一次
    }
});


// 定义一个名为loading的指令
Vue.directive('loading', {
    /**
     * 只调用一次, 在指令第一次绑定到元素时调用
     * @param {*} el 指令要绑定的元素
     * @param {*} binding 指令传入的信息, 包括{name: '指令名称', value: '指令绑定的值', arg: '指令参数 v-bind:text 对应text'}
     */
    bind(el, binding) {
        const instance = new LoadingConstructor({
            el: document.createElement('div'),
            data: {}
        });

        el.appendChild(instance.$el);
        el.instance = instance;
        Vue.nextTick(() => {
            el.instance.visible = binding.value.visible;
            el.instance.text = binding.value.text || '正在加载中...';
        });
    },
    /**
     * 所在组件的VNode 更新时调用
     * @param {*} el
     * @param {*} binding
     */
    update(el, binding) {
        // 通过对比值的变化判断loading是否显示
        if (binding.oldValue.visible !== binding.value.visible) {
            el.instance.visible = binding.value.visible;
        }
    },
    /**
     * 只调用一次, 在指令与元素解绑时使用
     * @param {*} el
     */
    unbind(el) {
        const mask = el.instance.$el;
        if (mask.parentNode) {
            mask.parentNode.removeChild(mask);
        }
        el.instance.$destroy();
        el.instance = undefined;
    }
});

Vue.directive('permission', {
    inserted(el, binding){
        let permission = binding.value;
        if(permission) {
            let hasPermission = checkArray(permission);
            if(!hasPermission) {
                // 没有权限 移除DOM元素
                el.parentNode && el.parentNode.removeChild(el);
            }
        }
    }
})
