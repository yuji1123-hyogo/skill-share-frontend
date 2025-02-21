import { apiClient } from "../apiClient";

/**
 * @typedef {Object} SharedArticle
 * @property {string} id - 記事ID
 * @property {string} title - 記事タイトル
 * @property {string} url - 記事URL
 * @property {string} [description] - 記事の説明
 * @property {string[]} tags - タグ一覧
 * @property {Object} author - 作成者情報
 * @property {string} author.id - 作成者ID
 * @property {string} author.username - ユーザー名
 * @property {string} [author.profilePicture] - プロフィール画像
 * @property {string} createdAt - 作成日時
 */

/**
 * @typedef {Object} PaginationInfo
 * @property {number} currentPage - 現在のページ
 * @property {number} totalPages - 総ページ数
 * @property {number} totalArticles - 総記事数
 */

/**
 * 技術記事を共有
 * @param {string} eventId - イベントID
 * @param {Object} articleData - 記事データ
 * @param {string} articleData.title - タイトル
 * @param {string} articleData.url - URL
 * @param {string} [articleData.description] - 説明
 * @param {string[]} [articleData.tags] - タグ一覧
 * @returns {Promise<{ message: string, article: SharedArticle }>}
 */
export const createSharedArticleAPI = async (eventId, articleData) => {
  const response = await apiClient.post(
    `/events/${eventId}/articles`,
    articleData
  );
  return response.data;
};

/**
 * イベントの共有記事一覧を取得
 * @param {string} eventId - イベントID
 * @param {Object} [options] - オプション
 * @param {number} [options.page=1] - ページ番号
 * @param {number} [options.limit=10] - 1ページあたりの件数
 * @returns {Promise<{ articles: SharedArticle[], pagination: PaginationInfo }>}
 */
export const getSharedArticlesByEventAPI = async (eventId, options = {}) => {
  const { page = 1, limit = 10 } = options;
  const response = await apiClient.get(
    `/events/${eventId}/articles`,
    { params: { page, limit } }
  );
  return response.data;
};

/**
 * 共有記事の詳細を取得
 * @param {string} articleId - 記事ID
 * @returns {Promise<{ article: SharedArticle }>}
 */
export const getSharedArticleByIdAPI = async (articleId) => {
  const response = await apiClient.get(`/articles/${articleId}`);
  return response.data;
}; 