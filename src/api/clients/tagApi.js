import { apiClient } from "../apiClient";


/**
 * タグ検索 API
 * @param {string} query - 検索クエリ（必須）
 * @param {number} [threshold=2] - 許容する編集距離（オプション, デフォルト: 2）
 * @param {number} [limit=10] - 取得件数（オプション, デフォルト: 10）
 * @returns {Promise<{ message: string, tags: string[] }>} - 検索結果
 */
export const searchTagsAPI = async (query, threshold = 2, limit = 10) => {
    const response = await apiClient.get("/tags/search", {
      params: { query, threshold, limit },
    });
    return response.data;
};
