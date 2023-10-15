// @ts-check
/// <reference path="../index.d.ts" />

/**
 *
 * @param {TemplateCollection} collection
 * @returns {Array<string>}
 */
module.exports = function (collection) {
  const tagSet = new Set();

  collection.getAll().forEach(item => {
    if (item.data.tags) {
      const systemTags = ["all", "nav", "post", "posts"];
      const tags = item.data.tags.filter(tag => !systemTags.includes(tag));

      for (const tag of tags) {
        tagSet.add(tag);
      }
    }
  });

  return [...tagSet];
};
