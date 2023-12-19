// @ts-check
/// <reference path="../../index.d.ts" />
import micromatch from "micromatch";

/**
 * Filters a collection by a glob pattern.
 *
 * @param {string} glob - The glob pattern to filter by
 * @returns {(item: CollectionItem) => boolean} A function that can be used to filter a collection by the given glob pattern
 */
function filterByGlob(glob) {
  return item => {
    // Remove `./` from the input path to let micromatch match the glob pattern
    const pathWithoutRelative = item.inputPath.slice(2);

    return micromatch.isMatch(pathWithoutRelative, glob);
  };
}

/**
 * Post paths are prefixed with `xxx-` to make sure the post files
 * are ordered correctly. We don't want to include this prefix in
 * the URL, so we remove it here.
 *
 * @param {CollectionItem} item
 * @returns {CollectionItem} The same item, but with the `xxx-` prefix removed from the URL
 */
function removePostIndexFromPaths(item) {
  item.fileSlug = item.fileSlug.replace(/^\d\d\d-/, "");
  item.outputPath = item.outputPath.replace(/\d\d\d-/, "");
  item.url = item.url.replace(/\d\d\d-/, "");

  return item;
}

/**
 * @param {EleventyConfig} eleventyConfig
 */
export default function (eleventyConfig) {
  eleventyConfig.addCollection("posts", collection => {
    return collection.items
      .filter(filterByGlob("sometimes-blogging/*.md"))
      .map(removePostIndexFromPaths);
  });
}
