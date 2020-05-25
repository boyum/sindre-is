module.exports = function (eleventyConfig) {
	eleventyConfig.addCollection("tagList", require("../getTagList"));
}