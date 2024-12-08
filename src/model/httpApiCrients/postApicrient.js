import apiClient from "./apiCrientSetting";

//タイムライン(フォローしているユーザーの投稿も含めて)取得
export const fetchTimelineApiCrient = async () =>{
    const response = await apiClient.get(`/api/posts/timeline`);
    return response
}

export const fetchClubPostApiCrient = async (clubId) =>{
    const response = await apiClient.get(`/api/posts/clubpost/${clubId}`);
    return response
}


export const fetchPostCommentsApiCrient = async (postId) =>{
    const response = await apiClient.get(`/api/posts/${postId}/comments`);
    return response
}

export const commentToPostApiCrient= async({postId,content})=>{
    const response = await apiClient.post(`/api/posts/${postId}/comments`,{content});
    return response
}

//投稿
export const createPostApiCrient = async(newpost) =>{
    const response = await apiClient.post(`/api/posts`,newpost);
    return response
}

//編集
export const updatePost = async(postId,updatepost) =>{
    const response = await apiClient.get(`/api/posts/${postId}`,updatepost);
    return response.data
}

//削除
export const deletePost = async(postId) =>{
    const response = await apiClient.get(`/api/posts/${postId}`);
    return response.data
}

//特定の投稿の取得
export const fetchPost = async(postId) =>{
    const response = await apiClient.put(`/api/posts/${postId}`);
    return response.data
}

//いいね
export const likePost = async(postId) =>{
    const response = await apiClient.put(`/api/posts/${postId}/like`);
    return response.data
}
