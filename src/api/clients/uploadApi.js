import { apiClient } from "../apiClient";

/**
 * ✅ 画像アップロードのレスポンス型
 * @typedef {Object} UploadImageResponse
 * @property {string} message - アップロード成功メッセージ
 * @property {string} imageUrl - アップロードされた画像の URL
 */

/**
 * ✅ Cloudinary へ画像をアップロード
 * @param {File} file - アップロードする画像ファイル
 * @returns {Promise<UploadImageResponse>} - アップロード結果
 */
export const uploadImageAPI = async (file) => {
    const formData = new FormData();
    formData.append("image", file); // サーバー側で `upload.single("image")` に対応

    const response = await apiClient.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });

    return response.data;
};
