import axios from 'axios';

axios.defaults.withCredentials = true;

const apiClient = axios.create({
    baseURL: "https://skill-share-backend.onrender.com",  
    headers: {
      'Content-Type': 'application/json', //request.bodyがjson形式であることの明示
    },
    withCredentials: true, // クッキーを含める設定
  });
  
  export default apiClient;