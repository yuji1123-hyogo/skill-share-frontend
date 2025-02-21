import React from "react";
import UserCard from "../organisms/User/UserCard";


const FollowingListTemplate = ({ followIdList }) => {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-dark-secondary rounded-lg p-6 shadow-lg border border-dark-accent">
        <h2 className="text-2xl font-bold text-gray-200 mb-4">フォロー中のユーザー</h2>
        <div className="space-y-4">
          {followIdList && followIdList.length > 0 ? (
            followIdList.map((userId) => (
              <UserCard key={userId} targetUserId={userId} />
            ))
          ) : (
            <p className="text-gray-400 text-center py-8 italic">
              フォロー中のユーザーはいません
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FollowingListTemplate;
