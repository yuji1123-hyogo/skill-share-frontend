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
 * ユーザー情報の型定義
 * @typedef {Object} User
 * @property {string} id - ユーザー ID
 * @property {string} username - ユーザー名
 * @property {string} [profilePicture] - プロフィール画像（省略可）
 * @property {string} [bio] - ユーザーの自己紹介（省略可）
 * @property {string[]} clubs - 参加しているクラブの ID リスト
 * @property {string[]} following - フォローしているユーザーの ID リスト
 * @property {Tag[]} tags - ユーザーのタグ情報
/**
 * 自分のユーザー情報を取得
 * @returns {Promise<{ message: string, user: User }>} - ユーザーの詳細情報
 */
export const getUserDetailsAPI = async () => {
  const response = await apiClient.get("/users/me");
  return response.data;
};

/**
 * 特定のユーザー情報を取得（公開情報）
 * @param {string} userId - 取得するユーザーの ID
 * @returns {Promise<{ message: string, user: User }>} - 指定ユーザーの詳細情報
 */
export const getPublicUserAPI = async (userId) => {
  console.log("API userId", userId);
  const response = await apiClient.get(`/users/${userId}`);
  return response.data;
};

/**
 * ユーザーのフォロー / フォロー解除
 * @param {string} userId - フォロー / フォロー解除するユーザーの ID
 * @returns {Promise<{ message: string, user: User }>} - 更新後のユーザー情報
 */
export const toggleFollowUserAPI = async (userId) => {
  const response = await apiClient.put(`/users/${userId}/follow`);
  return response.data;
};

/**
 * ユーザーが参加しているクラブID一覧を取得
 * @returns {Promise<{ message: string, clubIds: string[] }>} - クラブの ID リスト
 */
export const getUserClubsAPI = async () => {
  const response = await apiClient.get("/users/me/clubs");
  console.log(response.data)
  return response.data;
};

/**
 * ユーザー情報を更新
 * @param {Object} updateData - 更新するデータ
 * @param {string} [updateData.username] - 新しいユーザー名（省略可）
 * @param {string} [updateData.profilePicture] - 新しいプロフィール画像（省略可）
 * @param {string} [updateData.bio] - 新しい自己紹介（省略可）
 * @param {string[]} [updateData.tags] - 更新するタグのリスト（省略可）
 * @returns {Promise<{ message: string, user: User }>} - 更新後のユーザー情報
 */
export const updateUserAPI = async (updateData) => {
  const response = await apiClient.put("/users/me", updateData);
  return response.data;
};


//整形されたユーザー情報一覧
export const searchUsersAPI = async (params) => {
  const response = await apiClient.get("/users/search", { params });
  return response.data;
};

/**
 * フォローIDリスト取得 API
 * @typedef {Object} FollowListResponse
 * @property {string} message - API のレスポンスメッセージ
 * @property {string[]} following - フォローしているユーザーの ID リスト
 *
 * @returns {Promise<FollowListResponse>}
 */
export const getFollowListAPI = async () => {
  const response = await apiClient.get("/users/me/following");
  return response.data;
};