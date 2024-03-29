// @ts-check
/// <reference path="../../index.d.ts" />
import CleanCSS from "clean-css";
import { DateTime } from "luxon";

/**
 * @param {EleventyConfig} eleventyConfig
 */
export default function (eleventyConfig) {
  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj, {
      zone: "utc",
    }).toFormat("dd LLL yyyy");
  });

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter("htmlDateString", (/** @type {Date} */ dateObj) => {
    return DateTime.fromJSDate(dateObj, {
      zone: "utc",
    }).toFormat("yyyy-LL-dd");
  });

  // Get the first `n` elements of a collection.
  eleventyConfig.addFilter(
    "head",
    (/** @type {Array<string>} */ array, /** @type {number} */ n) => {
      if (n < 0) {
        return array.slice(n);
      }

      return array.slice(0, n);
    },
  );

  eleventyConfig.addFilter(
    "minifyCSS",
    (/** @type {string} */ code) => new CleanCSS({}).minify(code).styles,
  );
}
