import apiClient from "./apiCrientSetting";

//login
export const loginApiCrient = async({email,password}) =>{
    const response = await apiClient.post(`/api/auth/login`,{email,password});
    return response
}

//logout
export const logoutApiCrient = async() =>{
    const response = await apiClient.post(`/api/auth/logout`);
    return response
}

//登録
export const registerApiCrient = async(registerInfo) =>{
    const response = await apiClient.post(`/api/auth/register`,registerInfo);
    return response
}

//ユーザー名が既存の物かチェック
export const checkExistUserNameApiCrient = async(username) =>{
    const response = await apiClient.get(`/api/auth/check-Username`, {
        params: { username }
      });
    return response
}

