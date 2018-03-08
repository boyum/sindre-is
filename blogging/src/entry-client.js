import Vue from 'vue';
import {
  createApp,
} from './app';

const {
  app,
  router,
  store,
} = createApp();

/* eslint-disable-next-line */
if (window.__INITIAL_STATE__) {
  /* eslint-disable-next-line */
  store.replaceState(window.__INITIAL_STATE__);
}

router.onReady(() => {
  app.$mount('#app');
});

Vue.mixin({
  beforeMount() {
    const {
      asyncData,
    } = this.$options;

    if (asyncData) {
      this.dataPromise = asyncData({
        store: this.$store,
        route: this.$route,
      });
    }
  },
  beforeRouteUpdate(to, from, next) {
    const {
      asyncData,
    } = this.$options;

    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to,
      })
        .then(next)
        .catch(next);
    } else {
      next();
    }
  },
});
