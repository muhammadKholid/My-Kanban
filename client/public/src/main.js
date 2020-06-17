import Vue from 'vue';
import App from './App.vue';
import GAuth from 'vue-google-oauth2';

const gauthOption = {
  clientId: '53514294555-aricmjap0rbf5d5fpa1c8c1mktap9n81.apps.googleusercontent.com',
};

Vue.use(GAuth, gauthOption);
new Vue({
  render: (h) => h(App),
}).$mount('#app');
