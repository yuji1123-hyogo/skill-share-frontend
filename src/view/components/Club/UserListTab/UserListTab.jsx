import React, { useEffect, useState } from "react";

const UserListTab = ({club}) => {
 

  return (
    <div className="user-list-tab">
      <h2>参加中のユーザー</h2>
      {club.members.length === 0 ? (
        <p>参加中のユーザーはいません。</p>
      ) : (
        <ul className="user-list">
          {club.members.map((user) => (
            <li key={user._id} className="user-item">
              <div className="user-info">
                <p>{user.username}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserListTab;
