import React, { useContext, useEffect, useState } from 'react'
import "./Usercard.css"
import { Link, useNavigate } from 'react-router-dom'
import { checkChatIdApiCrient, createChatRoomApiCrient} from '../../../../model/httpApiCrients/chatApiCrient'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import Tag from '../../../parts/Tag/Tag'

import { followActionCreater } from '../../../../model/redux/currentUserSlice'
import Picture from '../../../parts/Picture/Picture'


//ユーザーカードの役割:ユーザー情報の表示,currentuserと相手とのchatIdの確認


function Usercard({page,user}){
    const navigate = useNavigate();
    const [chatId,setChatId] = useState(null);
    const currentUser = useSelector((state)=>state.user)
    const dispatch = useDispatch();


    const createChatRoom=async(toId)=>{
        try{
            const ressponse = await createChatRoomApiCrient(toId)
            const chatId= ressponse.data.chatId
            console.log(`チャットルームが作成されました${chatId}`)
            navigateToChatRoom(chatId)
        }catch(e){
            console.log(e.ressponse?.data || "chatroomが作成できませんでした")
        }
    }
    
    const navigateToChatRoom =(chatId)=>{
        navigate(`/dm?query=${chatId}`)
    }

    const handleFollow=()=>{
        dispatch(followActionCreater(user._id))
    }

     // チャットIDを確認
     useEffect(() => {
       console.log(`usercard`,user)
        const fetchChatId = async () => {
            try {
                const response = await checkChatIdApiCrient(user._id)
                if (response.data.chatId) {
                    setChatId(response.data.chatId);
                } 
            } catch (e) {
                if(e.response.status === 404){
                    setChatId("新しくやり取りを始める")
                }else{
                    setChatId("チャットの取得に失敗しました")
                    console.error("チャット確認中にエラーが発生しました:", e.response);
                }
            }
        };
        fetchChatId();
    }, []);

    
    return (
    <>
        <div className="user-card">
            {!user && <p>チャット中のユーザーは存在しません</p>}
            <div className="user-card-info">
            {/* プロフィール情報 */}
                <div className="user-card-basic">
                    <Picture parts={"usercard"} edditType={"user-update"} user={user} edditable={false}/>
                    <p className="user-card-name">{user.username}</p>
                </div>


                {user.hobbies && user.hobbies.length > 0 ?
                (
                    
                    <div className="user-card-hobbies-wrapper">
                        <p className="user-card-hobbies-title">趣味</p>
                         <div className="user-card-hobbies">
                         {user.hobbies.map((hobby) => (
                            <Tag key={hobby._id ? hobby._id : hobby} tag={hobby} className={"user-card-hobby"}/>
                            ))}
                         </div>
                    </div>
                ):
                (
                    <p>趣味タグが登録されていません</p>
                )}

            {/* 最終メッセージ（ChatListページのみ表示） */}
            {page === "ChatList" && user.lastMessage && (
                <div className="user-card-last-message">
                    <p>最終メッセージ: {user.lastMessage.timestamp}</p>
                    <p>{user.lastMessage.content}</p>
                </div>
            )}
            </div>

            {/* アクションボタン */}
            <div className="user-card-actions">
                <Link to={`/profile?query=${user._id}`}>
                    <button className="user-card-button">プロフィール</button>
                </Link>


                {/* フォローボタンー後々リファクタリング必須 */}
                
                    {currentUser?.userId !== user._id
                    && (
                        <>
                            <button
                            className="user-card-button"
                            onClick={() =>
                            chatId === "新しくやり取りを始める" 
                            ? createChatRoom(user._id)
                            : navigateToChatRoom(chatId)}
                            >

                            {chatId === null ? "確認中...":
                            (chatId === "チャットの取得に失敗しました" && "チャットの取得に失敗しました" ||
                            chatId === "新しくやり取りを始める" && "新しくやり取りを始める" || "チャットを再開する")}
                            </button>
                            <button className="user-card-button" onClick={handleFollow}>
                                {
                                    currentUser?.following?.includes(user._id) ? "フォロー解除" :"フォローする"
                                }
                            </button>
                        </>
                    )}
                
            </div>
        </div>
    </>
)}




export default Usercard