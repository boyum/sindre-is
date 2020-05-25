const fs = require("fs");
const MarkdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");

const initCollections = require('./_11ty/config/.eleventy.collections.js');
const initFilters = require('./_11ty/config/.eleventy.filters.js');
const initPlugins = require('./_11ty/config/.eleventy.plugins.js');
const initShortcodes = require('./_11ty/config/.eleventy.shortcodes.js');
const initTransforms = require('./_11ty/config/.eleventy.transforms.js');

module.exports = function (eleventyConfig) {
	initCollections(eleventyConfig);
	initFilters(eleventyConfig);
	initPlugins(eleventyConfig);
	initShortcodes(eleventyConfig);
	initTransforms(eleventyConfig);
	
	eleventyConfig.setDataDeepMerge(true);

	eleventyConfig.addLayoutAlias("post", "layouts/post.njk");

	eleventyConfig.addPassthroughCopy("img");
	eleventyConfig.addPassthroughCopy("manifest.json");
	eleventyConfig.addPassthroughCopy("favicon.ico");

	const mdRenderer = MarkdownIt({
		html: true,
		breaks: true,
		linkify: true
	});
	eleventyConfig.setLibrary("md", mdRenderer
		.use(markdownItAnchor, {
			permalink: true,
			permalinkClass: "direct-link",
			permalinkSymbol: "#"
		})
	);

	eleventyConfig.addWatchTarget("./**/*.(js|css)");

	eleventyConfig.setBrowserSyncConfig({
		callbacks: {
			ready: function (err, browserSync) {
				const content_404 = fs.readFileSync('_site/404.html');

				browserSync.addMiddleware("*", (req, res) => {
					// Provides the 404 content without redirect.
					res.write(content_404);
					res.end();
				});
			}
		}
	});

	return {
		templateFormats: [
			"md",
			"njk",
			"html",
			"liquid"
		],

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
			output: "_site"
		}
	};
};