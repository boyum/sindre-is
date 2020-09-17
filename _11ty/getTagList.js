module.exports = (collection) => {
  const tags =
    collection
        .getAll()
        .map((item) => item.data.tags && item.data.tags.filter(isCustomTag))
        .filter(Boolean);

  const uniqueTags = new Set(...tags);
  return [...uniqueTags];
};

/**
 * Returns whether or not the given tag is custom -
 * i.e. not either "all", "nav", "post" or "posts".
 * @param {string} tag
 * @return {boolean}
 */
function isCustomTag(tag) {
  const systemTags = ['all', 'nav', 'post', 'posts'];
  return systemTags.includes(tag);
}
