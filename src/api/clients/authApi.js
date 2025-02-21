import { apiClient } from "../apiClient";


/**
 * ✅ タグの型定義
 * @typedef {Object} Tag
 * @property {string} name - タグ名
 * @property {number} level - タグのレベル
 * @property {number} currentExperience - 現在の経験値
 * @property {number} nextLevelExperience - 次のレベルに必要な経験値
 */

/**
 * ✅ ユーザー情報の型定義
 * @typedef {Object} User
 * @property {string} id - ユーザー ID
 * @property {string} username - ユーザー名
 * @property {string} [profilePicture] - プロフィール画像（省略可）
 * @property {string} [bio] - ユーザーの自己紹介（省略可）
 * @property {string[]} clubs - 参加しているクラブの ID リスト
 * @property {string[]} following - フォローしているユーザーの ID リスト
 * @property {Tag[]} tags - ユーザーのタグ情報
 */

/**
 * ✅ ユーザー登録 API
 * @param {Object} userData - 登録情報
 * @param {string} userData.username - ユーザー名
 * @param {string} userData.email - メールアドレス
 * @param {string} userData.password - パスワード
 * @returns {Promise<{ message: string, user: User }>} - 登録成功メッセージとユーザー情報
 */
export const registerUserAPI = async (userData) => {
  const res = await apiClient.post("/auth/register", userData);
  return res.data;
};

/**
 * ✅ ログイン API
 * @param {Object} credentials - 認証情報
 * @param {string} credentials.email - メールアドレス
 * @param {string} credentials.password - パスワード
 * @returns {Promise<{ message: string, user: User }>} - ログイン成功メッセージとユーザー情報
 */
export const loginUserAPI = async (credentials) => {
  const res = await apiClient.post("/auth/login", credentials);
  return res.data;
};

/**
 * ✅ ログアウト API
 * @returns {Promise<{ message: string }>} - ログアウト成功メッセージ
 */
export const logoutUserAPI = async () => {
  const res = await apiClient.post("/auth/logout");
  return res.data;
};

/**
 * ✅ メールアドレス存在チェック API
 * @param {string} email - 確認するメールアドレス
 * @returns {Promise<{ message: string, exists: boolean }>} - メールの存在確認結果
 */
export const checkEmailExistsAPI = async (email) => {
  const res = await apiClient.get(`/auth/check-email?email=${encodeURIComponent(email)}`);
  return res.data;
};

/**
 * ✅ ユーザー名存在チェック API
 * @param {string} username - 確認するユーザー名
 * @returns {Promise<{ message: string, exists: boolean }>} - ユーザー名の存在確認結果
 */
export const checkUsernameExistsAPI = async (username) => {
  const res = await apiClient.get(`/auth/check-username?username=${encodeURIComponent(username)}`);
  return res.data;
};
