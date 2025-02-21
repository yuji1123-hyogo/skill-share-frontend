import { apiClient } from "../apiClient";

/**
 * @typedef {Object} CommentAuthor
 * @property {string} username - ユーザー名
 * @property {string} [profilePicture] - プロフィール画像
 */

/**
 * @typedef {Object} Comment
 * @property {string} id - コメント ID
 * @property {string} content - コメント本文
 * @property {CommentAuthor} author - コメントの作成者情報
 * @property {string} [post] - 投稿 ID（省略可）
 * @property {string} [sharedArticle] - 共有記事 ID（省略可）
 * @property {string} [feedback] - フィードバック ID（省略可）
 * @property {string} createdAt - 作成日時
 */

/**
 * @typedef {Object} PaginationInfo
 * @property {number} currentPage - 現在のページ番号
 * @property {number} totalPages - 総ページ数
 * @property {number} totalComments - 総コメント数
 */

// 有効なターゲットタイプの定義
export const COMMENT_TARGET_TYPES = {
  POST: 'post',
  ARTICLE: 'article',
  FEEDBACK: 'feedback'
};

// 値の変更を防止
Object.freeze(COMMENT_TARGET_TYPES);

/**
 * ✅ コメントを作成
 * @param {string} targetType - ターゲットタイプ ('post'|'article'|'feedback')
 * @param {string} targetId - ターゲットID
 * @param {string} content - コメント内容
 * @returns {Promise<{ message: string, comment: Comment }>}
 */
export const createCommentAPI = async (targetType, targetId, content) => {
  const response = await apiClient.post(
    `/comments/${targetType}/${targetId}`, 
    { content }
  );
  return response.data;
};

/**
 * ✅ コメント一覧を取得
 * @param {string} targetType - ターゲットタイプ ('post'|'article'|'feedback')
 * @param {string} targetId - ターゲットID
 * @param {Object} options - オプション
 * @param {number} [options.page=1] - ページ番号
 * @param {number} [options.limit=10] - 取得件数
 * @returns {Promise<{ commentIds: string[], pagination: PaginationInfo }>}
 */
export const getCommentsByTargetAPI = async (targetType, targetId, options = {}) => {
  const { page = 1, limit = 10 } = options;
  const response = await apiClient.get(
    `/comments/${targetType}/${targetId}`,
    { params: { page, limit } }
  );
  return response.data;
};

/**
 * ✅ コメント詳細を取得
 * @param {string} commentId - コメント ID
 * @returns {Promise<{ message: string, comment: Comment }>}
 */
export const getCommentByIdAPI = async (commentId) => {
  const response = await apiClient.get(`/comments/${commentId}`);
  return response.data;
};
