// @ts-check
import { readFileSync } from "fs";
import MarkdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";
import { markdownItImageSize } from "markdown-it-image-size";
import initCollections from "./_11ty/config/.eleventy.collections.js";
import initFilters from "./_11ty/config/.eleventy.filters.js";
import initPlugins from "./_11ty/config/.eleventy.plugins.js";
import initShortcodes from "./_11ty/config/.eleventy.shortcodes.js";
import initTransforms from "./_11ty/config/.eleventy.transforms.js";

/**
 * @param {EleventyConfig} eleventyConfig
 * @returns {EleventyFinalConfig}
 */
export default function (eleventyConfig) {
  initCollections(eleventyConfig);
  initFilters(eleventyConfig);
  initPlugins(eleventyConfig);
  initShortcodes(eleventyConfig);
  initTransforms(eleventyConfig);

  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.addLayoutAlias("post", "layouts/post.njk");

  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("favicon.ico");

  const mdRenderer = MarkdownIt({
    html: true,
    breaks: true,
    linkify: true,
  });
  eleventyConfig.setLibrary(
    "md",
    mdRenderer
      .use(markdownItAnchor, {
        permalink: true,
        permalinkClass: "direct-link",
        permalinkSymbol: "#",
      })
      .use(markdownItImageSize),
  );

  eleventyConfig.addWatchTarget("./**/*.(js|css)");

  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function (err, browserSync) {
        const content_404 = readFileSync("_site/404.html");

        browserSync.addMiddleware("*", (req, res) => {
          // Provides the 404 content without redirect.
          res.write(content_404);
          res.end();
        });
      },
    },
  });

  return {
    templateFormats: ["md", "njk", "html", "liquid"],

    // If your site lives in a different subdirectory, change this.
    // Leading or trailing slashes are all normalized away, so don’t worry about it.
    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for URLs (it does not affect your file structure)
    pathPrefix: "/",

    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    passthroughFileCopy: true,
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
  };
}
