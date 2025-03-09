import React from "react";
import { useClubActions } from "../../../../../hooks/club/useClubActions";
import { useSelector } from "react-redux";




const ClubCardActionButtons = ({ clubId, members }) => {
  const { handleNavigateToClubDetail, handleJoinClub } = useClubActions(clubId);
  const currentUserId = useSelector((state) => state.auth.userId);
  const isParticipate = members.some((member) => member.id === currentUserId);
  const isHost = members[0]?.id === currentUserId;

  console.log(currentUserId)
  console.log(members)
  console.log("再レンダリング in clubCardActionButtons",isParticipate,isHost)
  
  return (
    <div className="flex gap-4">
      {isParticipate && (
        <button
          onClick={handleNavigateToClubDetail}
          className="flex-1 py-2 px-4 bg-dark-accent text-gray-200 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          クラブ詳細へ
        </button>
      )}
      {!isParticipate && (
        <button
          onClick={handleJoinClub}
          className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          クラブに参加
        </button>
      )}
    </div>
  );
};

export default ClubCardActionButtons;
