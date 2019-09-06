import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import store from './store';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: (to, from, next) => {
        if (!store.state.name) {
          return next('/askname');
        }

        return next();
      },
    },
    {
      path: '/askname',
      name: 'askname',
      beforeEnter: (to, from, next) => {
        if (store.state.name) {
          return next('/home');
        }

        return next();
      },
      component: () =>
        import(/* webpackChunkName: "about" */ './views/AskName.vue'),
    },
    { path: '*', redirect: '/' },
  ],
});
