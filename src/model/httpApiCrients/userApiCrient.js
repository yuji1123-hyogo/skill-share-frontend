import apiClient from "./apiCrientSetting";

//リロード時、アプリの初回マウント時のフェッチ
//req.body:なし
//res.data:userオブジェクト
export const fetchCurrentUserByCokkieApiCrient = async() =>{
    const response = await apiClient.get(`/api/users`);
    return response
}

//idでの取得
//req.body:なし
//res.data:userオブジェクト
export const fetchUserDataByIdApicrient = async(userId) =>{
    const response = await apiClient.get(`/api/users/${userId}`);
    return response
}

//ユーザー名での取得(検索用、複数件ヒットすることもあり)
//req.body:なし
//res.data:userリスト
export const fetchUserByNameApiCrient = async(username) =>{
    const response = await apiClient.post(`/api/users/search/${username}`);
    return response
}

//編集
//req.body{更新のあった内容}
//res.data{更新後のユーザー情報}
export const updateProfileApiCrient = async(updateProfile) =>{
    const response = await apiClient.put(`/api/users`,updateProfile);
    return response
}

//フォロー、アンフォロー
export const followApicrient = async(userId) =>{
    const response = await apiClient.put(`/api/users/${userId}/follow`);
    return response
}

//フォロー中のユーザーリスト
export const followingUserlistApiCrient = async(userId) =>{
    const response = await apiClient.get(`/api/users/${userId}/followinglist`);
    return response
}

//自身の投稿を全取得
export const fetchProfilePostApiCrient = async(userId) =>{
    const response = await apiClient.get(`/api/users/${userId}/profileposts`);
    return response
}




