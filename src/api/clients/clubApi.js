import { apiClient } from "../apiClient";

/**
 * タグの型定義
 * @typedef {Object} Tag
 * @property {string} name - タグ名
 * @property {number} level - タグのレベル
 * @property {number} currentExperience - 現在の経験値
 * @property {number} nextLevelExperience - 次のレベルに必要な経験値
 */

/**
 * Populate されたユーザー情報（クラブメンバー）
 * @typedef {Object} ClubMember
 * @property {string} id - ユーザー ID
 * @property {string} username - ユーザー名
 * @property {string} [profilePicture] - プロフィール画像（省略可）
 */

/**
 * Populate されたクラブオブジェクト（詳細情報取得時に適用）
 * @typedef {Object} ClubWithMembers
 * @property {string} id - クラブの ID
 * @property {string} name - クラブ名
 * @property {string} [description] - クラブの説明（省略可）
 * @property {string} [themeImage] - クラブのテーマ画像（省略可）
 * @property {ClubMember[]} members - Populate されたメンバー情報
 * @property {string[]} events - クラブのイベント ID リスト
 * @property {Tag[]} tags - クラブに関連するタグのリスト
 */


/**
 * クラブを作成
 * @param {Object} clubData - クラブのデータ
 * @param {string} clubData.name - クラブ名
 * @param {string} [clubData.description] - クラブの説明（省略可）
 * @param {string} [clubData.themeImage] - クラブのテーマ画像（省略可）
 * @param {string[]} [clubData.tags] - クラブに関連するタグ（省略可）
 * @returns {Promise<{ message: string, club: ClubWithMembers }>} - 作成されたクラブ情報
 */
export const createClubAPI = async (clubData) => {
  console.log("clubData", clubData);
  const response = await apiClient.post("/clubs", clubData);
  return response.data;
};

/**
 * クラブの詳細を取得（メンバー情報を populate）
 * @param {string} clubId - クラブ ID
 * @returns {Promise<{ message: string, club: ClubWithMembers }>} - クラブの詳細情報
 */
export const getClubDetailAPI = async (clubId) => {
  const response = await apiClient.get(`/clubs/${clubId}`);
  return response.data;
};

/**
 * クラブに参加（メンバー情報を populate）
 * @param {string} clubId - クラブ ID
 * @returns {Promise<{ message: string, club: ClubWithMembers ,userId:userId}>} - 参加後のクラブ情報
 */
export const joinClubAPI = async (clubId) => {
  const response = await apiClient.post(`/clubs/${clubId}/join`);
  return response.data;
};


/**
 * クラブ情報を更新（メンバー情報を populate）
 * @param {string} clubId - クラブ ID
 * @param {Object} updateData - 更新するデータ
 * @param {string} [updateData.name] - クラブ名（変更する場合）
 * @param {string} [updateData.description] - クラブの説明（変更する場合）
 * @param {string} [updateData.themeImage] - クラブのテーマ画像（変更する場合）
 * @param {string[]} [updateData.tags] - クラブに関連するタグ（変更する場合）
 * @returns {Promise<{ message: string, club: ClubWithMembers }>} - 更新後のクラブ情報
 */
export const updateClubAPI = async (clubId, updateData) => {
  const response = await apiClient.put(`/clubs/${clubId}`, updateData);
  return response.data;
};


/**
 * クラブのメンバー一覧（ID のみ）を取得
 * @param {string} clubId - クラブ ID
 * @returns {Promise<{ message: string, memberIdList: string[] }>} - クラブのメンバー ID 一覧
 */
export const getClubMembersAPI = async (clubId) => {
  const response = await apiClient.get(`/clubs/${clubId}/members`);
  return response.data;
};



//populateされたイベント一覧を取得
export const getClubEventsAPI = async (clubId) => {
  const response = await apiClient.get(`/clubs/${clubId}/events`);
  return response.data;
};

//populateされたクラブ一覧を取得
export const searchClubsAPI = async (params) => {
  const response = await apiClient.get("/clubs/search", { params });
  return response.data;
};

//地図情報でクラブを検索
export const searchClubsByLocationAPI = async (params) => {
  const response = await apiClient.get("/clubs/search/location", { params });
  return response.data;
};


