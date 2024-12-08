import React, { useContext, useEffect, useRef, useState } from 'react';
import Message from './Message/Message';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';
import "./DirectMessage.css"
import { useSelector } from 'react-redux';
import { fetchChatMessageApiCrient } from '../../../model/httpApiCrients/chatApiCrient';
import DirectMessageForm from './DirectMessageForm/DirectMessageForm'


//ユーザーカードからのnavigate
function DirectMessage() {
    const [chat, setChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const currentUser = useSelector((state) => state.user);
    const location = useLocation();
    const chatId = new URLSearchParams(location.search).get('query');
    //再レンダリングのたびにソケットIDが変更されてしまうのを抑える
    const socketRef = useRef(null);
    const messagesEndRef = useRef();


    useEffect(() => {
        socketRef.current = io(process.env.REACT_APP_API_BASE_URL);
        console.log("Socket.IOが初期化されました");

        const handleChatMessage = (newMessage) => {
            console.log(`chat messageイベント(メッセージの送受信)を取得しました:`, newMessage);
            setMessages((prevMessages) => [...prevMessages, newMessage])
        };

        const handleJoinConfirmation = (response) => {
            console.log(`join confirmation イベントを取得しました。socketサーバーからのレスポンス:`, response);
            window.alert(response)
        };

        socketRef.current.on("chat message", handleChatMessage);
        socketRef.current.on("join confirmation", handleJoinConfirmation);

        return () => {
            if (socketRef.current) {
                socketRef.current.off("chat message", handleChatMessage);
                socketRef.current.off("join confirmation", handleJoinConfirmation);
                socketRef.current.disconnect();
                console.log("Socket.IOが切断されました");
            }
        };
    }, []);


    //チャットの初期画面の取得
    useEffect(() => {
        if (!chatId) {
            console.error("chatIdが存在しません");
            return;
        }

        const fetchChatRoomById = async () => {
            try {
                //初期メッセージの取得
                const response = await fetchChatMessageApiCrient(chatId)
                setChat(response.data);
                setMessages(response.data.messages);
                //websocketの参加イベントを送信
                socketRef.current.emit("join room", {
                    chatId: chatId,
                    username: currentUser.username
                });
            } catch (e) {
                console.log("チャットルーム取得エラー:", e.ressponse);
            }
        };

        fetchChatRoomById();
    }, [chatId]); 



    //送信時最新メッセージにスクロール
    useEffect(() =>{if (messages.length > 0) {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }}, [messages]);


    return (
        <div className='DirectMessage'>
            {chat && chat.participants
            .filter((participantObj)=>participantObj._id !== currentUser.userId)
            .map((filtered)=><h4 key={filtered._id} className="messageTitle">{filtered.username}さんとのメッセージ</h4>)}

            <div className="messageList">    
                {messages.map((msg) => (
                    <Message key={msg._id} content={msg.content} timestamps={msg.timestamps} sender={msg.sender} username={msg.username} />
                ))}
                 <div ref={messagesEndRef} />
            </div>
            <div className="direct-message-send-form">
                <DirectMessageForm socket={socketRef.current} chatId={chatId}/>
            </div>
        </div>
    );
}

export default DirectMessage;
