import { createApp } from './app';

export default context => new Promise((resolve, reject) => {
  const { app, router, store } = createApp();

  router.push(context.url);

  /* eslint-disable-next-line */
  router.onReady(() => {
    const matchedComponents = router.getMatchedComponents();

    if (matchedComponents.length === 0) {
      return reject({ code: 404 });
    }

    /* eslint-disable-next-line */
    Promise.all(matchedComponents.map((Component) => {
      if (Component.asyncData) {
        return Component.asyncData({
          store,
          route: router.currentRoute,
        });
      }
    })).then(() => {
      /* eslint-disable-next-line */
      context.state = store.state;
      resolve(app);
    }).catch(reject);
  }, reject);
});
