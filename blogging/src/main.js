// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import VueServerRenderer from 'vue-server-renderer';
import express from 'express';
import { createApp } from './app';

Vue.config.productionTip = false;

const server = express();


server.get('*', (req, res) => {
  const context = {
    title: 'Sindre is blogging',
    meta: ``,
    url: req.url,
  };
  const { app } = createApp(context);

  renderer.renderTotring(app, (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error');
      return;
    }

    res.end(`
        ${html}
      `);
  });
});

server.listen(8000);
