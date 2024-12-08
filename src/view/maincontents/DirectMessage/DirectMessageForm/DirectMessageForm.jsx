import React, { useRef } from 'react';
import './DirectMessageForm.css';
import { useSelector } from 'react-redux';

function DirectMessageForm({ socket, chatId }) {
  const messageRef = useRef();
  const currentUser = useSelector((state) => state.user);
  const currentUserId = currentUser.userId;

  const sendMessage = (e) => {
    e.preventDefault();
    if (!socket || !chatId) {
      console.error('SocketまたはchatIdが未定義です。');
      alert('メッセージを送信できません。接続が切れている可能性があります。');
      return;
    }

    const messageContent = messageRef.current?.value.trim();
    if (!messageContent) {
      alert('メッセージを入力してください。');
      return;
    }

    const newMessage = {
      chatId: chatId,
      content: messageContent,
      timestamps: new Date().toLocaleTimeString(),
      sender: currentUserId,
      username: currentUser.username,
    };

    socket.emit('chat message', newMessage, (response) => {
      if (response?.error) {
        console.error('サーバーエラー:', response.error);
        alert('メッセージの送信に失敗しました。もう一度お試しください。');
      } else {
        console.log('メッセージが送信されました:', response);
      }
    });

    messageRef.current.value = '';
  };

  return (
    <form className="direct-message-form">
      <textarea
        ref={messageRef}
        className="direct-message-form__input"
        placeholder="メッセージを入力"
        aria-label="チャット入力欄"
      ></textarea>
      <button onClick={sendMessage} type="submit" className="direct-message-form__button">
        送信
      </button>
    </form>
  );
}

export default DirectMessageForm;
