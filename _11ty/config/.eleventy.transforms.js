const htmlmin = require("html-minifier");
const Terser = require("terser");
const CleanCSS = require("clean-css");

module.exports = function(eleventyConfig) {
  eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
    if (outputPath.endsWith(".html")) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });
      return minified;
    }

    return content;
  });

  eleventyConfig.addTransform("cssmin", function(content, outputPath) {
    if (outputPath.endsWith(".css")) {
      return new CleanCSS({}).minify(content).styles;
    }

    return content;
  });

  eleventyConfig.addTransform("jsmin", function(content, outputPath) {
    if (outputPath.endsWith(".js")) {
      let minified = Terser.minify(content);

      if (minified.error) {
        console.log("Terser error: ", minified.error);
        return content;
      }

      return minified;
    }

    return content;
  });
};
