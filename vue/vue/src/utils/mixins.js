export const mixins = {
    data(){
        return {
            myMixins: 'mixins 混入~'
        }
    },

    methods: {
        btnFn(){
            // 用于获取data里的数据
            console.log(this.$data);
        }
    }
}