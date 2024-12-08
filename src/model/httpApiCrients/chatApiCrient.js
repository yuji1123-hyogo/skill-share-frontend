import apiClient from "./apiCrientSetting";

//入室時の取得チャット取得(クラブ)
export const createPost = async() =>{
    const response = await apiClient.get(`/chats/clubchat`);
    return response
}

//入室時の取得チャット取得(DM)
export const fetchChatMessageApiCrient = async(chatId) =>{
    const response = await apiClient.get(`/chats/userchat/${chatId}`);
    return response
}

//チャットルームの作成(クラブ)
export const deletePost = async() =>{
    const response = await apiClient.post(`/chats/clubchat`);
    return response
}

//チャットルームの作成(個人)
export const createChatRoomApiCrient = async(toId) =>{
    const response = await apiClient.post(`/api/chats/userchat/${toId}`);
    return response
}

//フレンドのIDリストからチャットIDリストを取得
export const fetchFriendChatIdListApiCrient = async(followingsIdList) =>{
    const response = await apiClient.post(`/api/chats/chatListOfFollowings`,followingsIdList);
    return response
}

export const fetcChatListApiCrient = async () =>{
    const response = await apiClient.get(`/api/chats/chatList`)
    return  response
}

//chatidのチェック
export const checkChatIdApiCrient = async (userId) =>{
    const response = await apiClient.get(`/api/chats/exist-between-users/${userId}`)
    return  response
}

