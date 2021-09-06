import Vue from 'vue';

Vue.filter('upper', function (value) {
    if (!value) return;
    return value.toString().toUpperCase();
})