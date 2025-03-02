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

console.log("hello")
  

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