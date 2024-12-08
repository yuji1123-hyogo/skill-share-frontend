import { fetchChatIdListApiCrient, fetchFriendChatIdListApiCrient } from "../httpApiCrients/chatApiCrient"

// ユーザーリストから
// {
//     userId:chatId,
//     userId:chatId,
//     ...
// }の形でチャットIDを取得
export const fetchChatIdList = async({userList,type}) => {
    try{
        if(type === "friendList" ||type ===  "searchList"){
        const response = await fetchFriendChatIdListApiCrient(userList)
        return response.data
        }
    }catch(e){
        console.error("Chat IDリスト取得エラー:", e.response?.data?.message || e.message || "不明なエラー");
        return null; 
    }
}