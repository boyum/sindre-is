import Vue from 'vue';
import Router from 'vue-router';

const Frontpage = () =>
  import('../components/Frontpage.vue');
const ArticlePage = () =>
  import('../components/Articlepage.vue');

Vue.use(Router);

/* eslint-disable-next-line import/prefer-default-export */
export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [{
      path: '',
      name: 'Frontpage',
      component: Frontpage,
    },
    {
      path: '/article/:id',
      name: 'Articlepage',
      component: ArticlePage,
    },
    ],
  });
}
