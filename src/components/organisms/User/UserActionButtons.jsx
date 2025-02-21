import React from "react";

import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";


import { judgeUserRelation } from "../../../utils/user/judgeRelation";
import { useGetFollowListQuery } from "../../../features/RTKQuery/apiSlice";
import { useUserInteractions } from "../../../hooks/user/useUserInteractions";

const UserActionButtons = ({ targetUserId }) => {
  const { handleFollowToggle, handleNavigateToProfile } = useUserInteractions(targetUserId);
  const location = useLocation();
  const currentUserId = useSelector((state) => state.auth.userId);
  const { data: followListData } = useGetFollowListQuery();
  const { isMyself, isFollow } = judgeUserRelation(targetUserId, currentUserId, followListData);
  const isProfilePage = location.pathname === `/profile/${targetUserId}`;

  return (
    <div className="flex gap-3">
      {!isMyself && (
        <button
          onClick={handleFollowToggle}
          className={`flex-1 py-2 px-4 rounded-lg transition-colors duration-200 ${
            isFollow 
              ? 'bg-purple-500/30 text-purple-300 hover:bg-purple-500/50'
              : "bg-dark-accent hover:bg-gray-500/50 text-gray-200"
          }`}
        >
          {isFollow ? "フォロー解除" : "フォロー"}
        </button>
      )}
      
      {!isProfilePage && (
        <button
          onClick={handleNavigateToProfile}
          className="flex-1 py-2 px-4 bg-blue-500/30 text-white rounded-lg hover:bg-blue-500/50 transition-colors duration-200"
        >
          プロフィールへ
        </button>
      )}
    </div>
  );
};

export default UserActionButtons;

