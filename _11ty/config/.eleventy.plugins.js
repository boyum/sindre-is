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
			urlPattern: /^.*\.(html|jpg|png|gif|webp|ico|svg|woff2|woff|eot|ttf|otf|ttc|json)$/,
			handler: `staleWhileRevalidate`
		},
		{
			urlPattern: "/service-worker.js",
			handler: "networkFirst",
		}
		],
	});
};
