import vue from 'vue';

export default {
    install: (Vue) => {
        Vue.prototype.$HR = new vue();
    }
}
