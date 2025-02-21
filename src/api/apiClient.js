import axios from 'axios';
// APIのベースURLを環境変数から取得
const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://localhost:5000/api';


// Axios インスタンスを作成
export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, 
});


  
// 共通のエラーハンドリング関数
/**
 * APIエラーを処理し、統一されたエラーメッセージを返す関数
 * @param {Object} error - APIリクエストで発生したエラーオブジェクト
 * @param {XMLHttpRequest} [error.request] - リクエストオブジェクト (存在しない場合もある)
 * @param {Object} [error.response] - レスポンスオブジェクト (存在しない場合もある)
 * @param {number} [error.response.status] - HTTPステータスコード (存在しない場合はデフォルト500)
 * @param {Object} [error.response.data] - サーバーからのレスポンスデータ
 * @param {string} [error.response.data.message] - エラーメッセージ
 * @param {Array} [error.response.data.errors] - 詳細なエラー情報 (配列)
 * @param {string} [error.message] - ネットワークエラーやタイムアウト時のエラーメッセージ
 * @returns {{status: number, message: string, errors: Array}} - 統一されたエラーレスポンスオブジェクト
 */
const handleApiError = (error) => {
  console.log("error", error);
  if (error.request && !error.response) {
    return { status: 0, message: 'ネットワークエラーが発生しました', errors: [] };
  }

  if (!error.request && !error.response) {
    return { status: 0, message: error.message || "タイムアウトまたは設定エラー", errors: [] };
  }

  const { status , data } = error.response;

  switch (status) {
    case 400:
      return { status, message: data.message || 'リクエストが不正です', errors: data.errors || [] };
    case 401:
      return { status, message: data.message || '認証に失敗しました。再ログインしてください', errors: [] };
    case 403:
      return { status, message: data.message || 'アクセス権限がありません', errors: [] };
    case 404:
      return { status, message: data.message || 'リソースが見つかりません', errors: [] };
    case 500:
      return { status, message: 'サーバーエラーが発生しました', errors: [] };
    default:
      return { status, message: '不明なエラーが発生しました', errors: [] };
  }
};


// リクエストのインターセプター（エラーハンドリング適用）
apiClient.interceptors.response.use(
  (response) => {
      return response;
    },
  (error) => {
    //エラーオブジェクトの整形
    return Promise.reject(handleApiError(error));
  }
);