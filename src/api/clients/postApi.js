import { apiClient } from "../apiClient";

/**
 * ✅ Populate されたユーザー情報（投稿の作者）
 * @typedef {Object} PostAuthor
 * @property {string} username - ユーザー名
 * @property {string} [profilePicture] - プロフィール画像（省略可）
 */

/**
 * ✅ 投稿オブジェクト
 * @typedef {Object} Post
 * @property {string} id - 投稿 ID
 * @property {string} content - 投稿内容
 * @property {string|null} media - メディアの URL（省略可）
 * @property {string|null} club - クラブ ID（省略可）
 * @property {PostAuthor} author - Populate された投稿者情報
 * @property {Array<{ name: string, level: number, currentExperience: number, nextLevelExperience: number }>} tags - 投稿に紐づくタグ
 * @property {string[]} comments - コメント ID のリスト
 * @property {string} createdAt - 投稿の作成日時（ISO8601形式）
 */

/**
 * ✅ 投稿を作成
 * @param {Object} postData - 投稿のデータ
 * @param {string} postData.content - 投稿内容
 * @param {string} [postData.media] - メディアの URL（省略可）
 * @param {string} [postData.club] - クラブ ID（省略可）
 * @returns {Promise<{ message: string, post: Post }>} - 作成された投稿情報
 */
export const createPostAPI = async (postData) => {
  const response = await apiClient.post("/posts", postData);
  return response.data;
};

/**
 * ✅ 投稿の詳細を取得（`author` を populate）
 * @param {string} postId - 投稿 ID
 * @returns {Promise<{ message: string, post: Post }>} - 投稿の詳細情報
 */
export const getPostDetailsAPI = async (postId) => {
  const response = await apiClient.get(`/posts/${postId}`);
  return response.data;
};

/**
 * ✅ ユーザーの投稿一覧を取得
 * @param {string} userId - ユーザー ID
 * @returns {Promise<{ message: string, postIdList: string[] }>} - ユーザーの投稿 ID 一覧
 */
export const getUserPostsAPI = async (userId) => {
  const response = await apiClient.get(`/posts/users/${userId}`);
  return response.data;
};

/**
 * ✅ クラブの投稿一覧を取得
 * @param {string} clubId - クラブ ID
 * @returns {Promise<{ message: string, postIdList: string[] }>} - クラブの投稿 ID 一覧
 */
export const getClubPostsAPI = async (clubId) => {
  const response = await apiClient.get(`/posts/clubs/${clubId}`);
  return response.data;
};

/**
 * ✅ ホームフィードの投稿一覧を取得
 * @returns {Promise<{ message: string, postIdList: string[] }>} - ホームフィードの投稿 ID 一覧
 */
export const getHomePostsAPI = async () => {
  const response = await apiClient.get("/posts/home");
  return response.data;
};


//レスポンス例
// {
//   "message": "投稿の詳細情報を取得しました",
//   "post": {
//     "id": "65cdef1234567890abcdef12",
//     "content": "今日は素晴らしい日でした！",
//     "media": "https://example.com/image.jpg",
//     "club": "65b987654321dcba98765432",
//     "author": {
//       "username": "Alice",
//       "profilePicture": "https://example.com/alice.jpg"
//     },
//     "tags": [
//       {
//         "name": "JavaScript",
//         "level": 3,
//         "currentExperience": 50,
//         "nextLevelExperience": 100
//       }
//     ],
//     "comments": ["65b987654321dcba98765433", "65b987654321dcba98765434"],
//     "createdAt": "2024-02-14T12:34:56.789Z"
//   }
// }
