import { apiClient } from "../apiClient";

/**
 * @typedef {Object} Feedback
 * @property {string} id - フィードバックID
 * @property {string} content - フィードバック内容
 * @property {string} [media] - 添付メディア
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
 * @property {number} totalFeedbacks - 総フィードバック数
 */

/**
 * フィードバックを作成
 * @param {string} eventId - イベントID
 * @param {Object} feedbackData - フィードバックデータ
 * @param {string} feedbackData.content - フィードバック内容
 * @param {File} [feedbackData.media] - 添付メディア
 * @returns {Promise<{ message: string, feedback: Feedback }>}
 */
export const createFeedbackAPI = async (eventId, feedbackData) => {
  console.log(feedbackData);
  const response = await apiClient.post(
    `/events/${eventId}/feedbacks`,
    feedbackData
  );
  return response.data;
};

/**
 * イベントのフィードバック一覧を取得
 * @param {string} eventId - イベントID
 * @param {Object} [options] - オプション
 * @param {number} [options.page=1] - ページ番号
 * @param {number} [options.limit=10] - 1ページあたりの件数
 * @returns {Promise<{ feedbacks: Feedback[], pagination: PaginationInfo }>}
 */
export const getFeedbacksByEventAPI = async (eventId, options = {}) => {
  const { page = 1, limit = 10 } = options;
  const response = await apiClient.get(
    `/events/${eventId}/feedbacks`,
    { params: { page, limit } }
  );
  return response.data;
};

/**
 * フィードバックの詳細を取得
 * @param {string} feedbackId - フィードバックID
 * @returns {Promise<{ feedback: Feedback }>}
 */
export const getFeedbackByIdAPI = async (feedbackId) => {
  const response = await apiClient.get(`/feedbacks/${feedbackId}`);
  return response.data;
}; 