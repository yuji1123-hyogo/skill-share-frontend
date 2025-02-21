import { apiClient } from "../apiClient";

/**
 * ✅ Populate されたユーザー情報（イベント関係者）
 * @typedef {Object} UserBasicInfo
 * @property {string} id - ユーザー ID
 * @property {string} username - ユーザー名
 * @property {string} [profilePicture] - プロフィール画像（省略可）
 */

/**
 * ✅ イベントオブジェクト（基本情報）
 * @typedef {Object} Event
 * @property {string} id - イベント ID
 * @property {string} name - イベント名
 * @property {string} [description] - イベントの説明（省略可）
 * @property {string} [date] - イベントの日時（ISO 8601 形式、例: "2024-06-15T12:00:00.000Z"）
 * @property {string} [location] - イベントの場所（省略可）
 * @property {"upcoming" | "ongoing" | "completed"} status - イベントのステータス
 * @property {string} club - クラブ ID
 * @property {string[]} participants - 参加者のユーザー ID 配列
 * @property {string | null} mvp - MVP のユーザー ID（未確定の場合は null）
 * @property {Array<{ voter: string, candidate: string }>} votes - MVP 投票情報
 * @property {string[]} eventtags - イベントのタグ
 */

/**
 * ✅ Populate されたイベントオブジェクト（詳細情報）
 * @typedef {Object} EventWithDetails
 * @property {string} id - イベント ID
 * @property {string} name - イベント名
 * @property {string} [description] - イベントの説明（省略可）
 * @property {string} [date] - イベントの日時（ISO 8601 形式）
 * @property {string} [location] - イベントの場所（省略可）
 * @property {"upcoming" | "ongoing" | "completed"} status - イベントのステータス
 * @property {string} club - クラブ ID
 * @property {UserBasicInfo} host - イベントホスト（`populate` 済み）
 * @property {UserBasicInfo[]} participants - 参加者リスト（`populate` 済み）
 * @property {UserBasicInfo | null} mvp - MVP のユーザー情報（`populate` 済み、未確定時は null）
 * @property {Array<{ voter: UserBasicInfo, candidate: UserBasicInfo }>} votes - MVP 投票情報（`populate` 済み）
 * @property {string[]} eventtags - イベントのタグ
 */

/**
 * ✅ イベントを作成
 * @param {Object} eventData - イベントデータ
 * @param {string} eventData.name - イベント名
 * @param {string} [eventData.description] - イベントの説明（省略可）
 * @param {string} [eventData.date] - イベントの日付（ISO 8601）
 * @param {string} [eventData.location] - イベントの場所（省略可）
 * @param {string} eventData.club - クラブ ID
 * @param {string[]} [eventData.eventtags] - イベントのタグ（省略可）
 * @returns {Promise<{ message: string, event: EventWithDetails }>}
 */
export const createEventAPI = async (eventData) => {
  const response = await apiClient.post("/events", eventData);
  return response.data;
};

/**
 * ✅ イベントの詳細を取得（Populate 済み）
 * @param {string} eventId - イベント ID
 * @returns {Promise<{ message: string, event: EventWithDetails }>}
 */
export const getEventByIdAPI = async (eventId) => {
  const response = await apiClient.get(`/events/${eventId}`);
  return response.data;
};

/**
 * ✅ イベントに参加
 * @param {string} eventId - イベント ID
 * @returns {Promise<{ message: string, event: EventWithDetails }>}
 */
export const participateInEventAPI = async (eventId) => {
  const response = await apiClient.post(`/events/${eventId}/join`);
  return response.data;
};

/**
 * ✅ イベントのステータスを更新
 * @param {string} eventId - イベント ID
 * @returns {Promise<{ message: string, event: EventWithDetails }>}
 */
export const updateEventStatusAPI = async (eventId) => {
  const response = await apiClient.put(`/events/${eventId}/status`);
  return response.data;
};

/**
 * ✅ MVP 投票
 * @param {string} eventId - イベント ID
 * @param {string} candidateId - MVP 候補のユーザー ID
 * @returns {Promise<{ message: string, event: EventWithDetails }>}
 */
export const voteForMVPAPI = async ({eventId, candidateId}) => {
  const response = await apiClient.post(`/events/${eventId}/vote`, { candidate: candidateId });
  return response.data;
};

/**
 * ✅ MVP を確定
 * @param {string} eventId - イベント ID
 * @returns {Promise<{ message: string, event: EventWithDetails }>}
 */
export const determineMVPAPI = async (eventId) => {
  const response = await apiClient.post(`/events/${eventId}/mvp`);
  return response.data;
};

/**
 * ✅ 経験値を分配
 * @param {string} eventId - イベント ID
 * @returns {Promise<{ message: string, updatedUsers: string[], updatedClub?: string }>}
 */
export const distributeExpAPI = async (eventId) => {
  const response = await apiClient.post(`/events/${eventId}/distribute-exp`);
  console.log("response in diatributeExp:",response.data)
  return response.data;
};
