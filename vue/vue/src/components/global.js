import Vue from 'vue';

// 放在高频组件的文件夹里, 使用require.context动态将要的高频组件统统打包起来, 然后在main.js里引用该文件。
function changeStr(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const requireComponent = require.context('./', false, /\.vue$/);

// 查找同级目录下以vue结尾的组件
const install = () => {
    requireComponent.keys().forEach(fileName => {
        let config = requireComponent(fileName);
        console.log(config); // ./child1.vue 然后用正则拿到child1
        let componentName = changeStr(fileName.replace(/^\.\//, '').replace(/\.\w+$/, ''));
        Vue.component(componentName, config.default || config);
    })
}

export default {
    install
}