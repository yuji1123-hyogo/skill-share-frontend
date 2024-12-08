import React, { useEffect, useState } from 'react'
import { fetchChatIdList } from '../../../model/utils/fetchChatIdList'
import Usercard from '../../components/PrimaryComponents/Usercard/Usercard';
import { fetcChatListApiCrient } from '../../../model/httpApiCrients/chatApiCrient';
//currentUserが含まれるチャットをすべて取得
//チャットの最後のメッセージを表示
function ChatList() {
    const [chattingUsers,setChattingUsers] = useState([]);
     useEffect(()=>{
       const fetchChatUsers = async () => {
            try {
                const response = await fetcChatListApiCrient();
                setChattingUsers(response.data);
            } catch (e) {
                console.error("チャット一覧取得中エラー:", e);
            }
        }
       fetchChatUsers();
     },[])
 
   return (
     <div className='friendlist'>
         <h3 className='friendlist-title'>チャット中のユーザー一覧</h3>
         <div className="friendlist-users">
           {chattingUsers.map((chattingUser)=>{
             return <Usercard page={"ChatList"} user={chattingUser} key={chattingUser._Id} />
           })}
         </div>
     </div>
   )
}

export default ChatList