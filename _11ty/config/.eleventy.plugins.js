// @ts-check
/// <reference path="../../index.d.ts" />

const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginPWA = require("eleventy-plugin-pwa");
const UpgradeHelper = require("@11ty/eleventy-upgrade-help");

/**
 * @param {EleventyConfig} eleventyConfig
 */
module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);
  eleventyConfig.addPlugin(UpgradeHelper);

  eleventyConfig.addPlugin(pluginPWA, {
    clientsClaim: true,
    skipWaiting: true,
    runtimeCaching: [
      {
        urlPattern: /\/img\/.+\.(?:png|gif|jpg|jpeg|webp|svg)$/,
        handler: "cacheFirst",
      },
      {
        urlPattern: "/service-worker.js",
        handler: "networkFirst",
      },
    ],
  });
};
