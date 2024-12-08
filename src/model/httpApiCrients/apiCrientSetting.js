import axios from 'axios';


const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,  
    headers: {
      'Content-Type': 'application/json', //request.bodyがjson形式であることの明示
    },
    withCredentials: true, // クッキーを含める設定
  });
  
  export default apiClient;