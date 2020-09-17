const {
  DateTime
} = require('luxon');
const CleanCSS = require('clean-css');
const Terser = require('terser');

module.exports = function(eleventyConfig) {
	eleventyConfig.addFilter('readableDate', dateObj => 
	 DateTime.fromJSDate(dateObj, {
      zone: 'utc'
    }).toFormat('dd LLL yyyy')
  );

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter('htmlDateString', dateObj =>
    DateTime.fromJSDate(dateObj, {
      zone: 'utc'
    }).toFormat('yyyy-LL-dd')
  );

  // Get the first `n` elements of a collection.
  eleventyConfig.addFilter('head', (array, n) => {
    if (n < 0) {
      return array.slice(n);
    }

    return array.slice(0, n);
  });

	eleventyConfig.addFilter('minifyCSS', code => 
		new CleanCSS({}).minify(code).styles
	);

  eleventyConfig.addFilter('minifyJS', code => {
    let minified = Terser.minify(code);
    if (minified.error) {
      console.log('Terser error: ', minified.error);
      return code;
    }

    return minified.code;
  });

  eleventyConfig.addFilter('lowercase', text => text.toLowerCase());
};