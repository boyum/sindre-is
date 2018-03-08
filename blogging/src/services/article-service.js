/* eslint-disable import/prefer-default-export */
export function getArticle(id) {
  return fetch(`firebase/get/article/${id}`);
}
