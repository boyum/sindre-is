const Vue = require('vue');
const {
  createBundleRenderer,
} = require('vue-server-renderer');
const express = require('express');
const fs = require('fs');

Vue.config.productionTip = false;
const server = express();
const template = fs.readFileSync('src/index.template.html', 'utf-8');
const serverBundle = require('../dist/vue-ssr-server-bundle.json');
const clientManifest = require('../dist/vue-ssr-client-manifest.json');

const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false,
  template,
  clientManifest,
});

server.get('*', (req, res) => {
  const context = {
    title: 'Test',
    meta: '',
    url: req.url,
  };

  renderer.renderToString(context, (err, html) => {
    if (err) {
      if (err.code === 404) {
        res.status(404).end('Page not found');
      } else {
        res.status(500).end('Internal Server Error');
        console.log(err);
      }
    } else {
      res.end(html);
    }
  });
});

server.listen(8000);
