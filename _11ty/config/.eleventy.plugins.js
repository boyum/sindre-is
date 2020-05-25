const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginPWA = require('eleventy-plugin-pwa');

module.exports = function (eleventyConfig) {
	eleventyConfig.addPlugin(pluginRss);
	eleventyConfig.addPlugin(pluginSyntaxHighlight);

	eleventyConfig.addPlugin(pluginPWA, {
		clientsClaim: true,
		skipWaiting: true,
		runtimeCaching: [{
			urlPattern: /\/img\/.+\.(?:png|gif|jpg|jpeg|webp|svg)$/,
			handler: "cacheFirst",
		},
		{
			urlPattern: "/service-worker.js",
			handler: "networkFirst",
		}
		],
	});
};
