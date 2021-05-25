// @ts-check
/// <reference path="../../index.d.ts" />

/**
 * @param {EleventyConfig} eleventyConfig
 */
module.exports = function (eleventyConfig) {
  eleventyConfig.addCollection("tagList", require("../getTagList"));
};
