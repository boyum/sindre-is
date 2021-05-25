// @ts-check
/// <reference path="../../index.d.ts" />

const htmlmin = require("html-minifier");
const CleanCSS = require("clean-css");

/**
 *
 * @param {EleventyConfig} eleventyConfig
 */
module.exports = function (eleventyConfig) {
  eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
    if (outputPath.endsWith(".html")) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified;
    }

    return content;
  });

  eleventyConfig.addTransform("cssmin", function (content, outputPath) {
    if (outputPath.endsWith(".css")) {
      return new CleanCSS({}).minify(content).styles;
    }

    return content;
  });
};
