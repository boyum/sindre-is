module.exports = function (eleventyConfig) {
	eleventyConfig.addShortcode("codepen", function (url) {
		const penUrl = url.includes('embed') ? url : url.replace(/(\/full\/|\/details\/|\/pen\/)/ig, '/embed/');
		const html = String.raw;

		return html`
<iframe
  allowtransparency="true"
  frameborder="no"
  height="600"
  src="${penUrl}?height=600&amp;default-tab=result&amp;embed-version=2"
  scrolling="no"
  style="width: 100%;"
></iframe>`;
	});
}