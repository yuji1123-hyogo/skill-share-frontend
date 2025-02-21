import React from "react";
import UserProfileSummary from "./UserProfileSummary";

const UserSummaryList = ({ users }) => {
  if (!users.length) return <p>メンバーがいません</p>;

  return (
    <div className="user-summary-list">
      {users.map((user) => (
        <UserProfileSummary key={user.id} username={user.username} profilePicture={user.profilePicture} />
      ))}
    </div>
  );
};

export default UserSummaryList;
