import React from 'react';
import './Message.css';
import { useSelector } from 'react-redux';

function Message({ content, timestamps, sender, username }) {
  const currentUser = useSelector((state) => state.user);
  const currentUserId = currentUser.userId;
  const isSender = currentUserId === sender;

  return (
    <div className={`message-container ${isSender ? 'message-container--sender' : 'message-container--receiver'}`}>
      <span className="message-container__username">
        {username}さん
      </span>
      <div className={`message ${isSender ? 'message--sender' : 'message--receiver'}`}>
        <p className="message__content">{content}</p>
        <span className="message__timestamp">{timestamps}</span>
      </div>
    </div>
  );
}

export default Message;
