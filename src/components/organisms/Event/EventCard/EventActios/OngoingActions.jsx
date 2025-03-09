import MVPSelectBox from "../../../../molecules/MVPSelectBox";
import { useEventCard } from "../EventCardContext";
import React, { useState } from "react";
  
// 開催中のイベントのアクション
const OngoingActions = () => {
  const context = useEventCard();
  
  // Provider外で使用された場合のガード
  if (!context || !context.event) {
    console.error("OngoingActionsはEventCardProvider内で使用してください");
    return null;
  }
  
  const { event, actions, isLoading, isOwner, isVoted } = context;
  const [selectedCandidate, setSelectedCandidate] = useState(null);


  return (
    <div className="space-y-4">
      <div className="mb-4">
        <h4 className="text-md font-semibold text-gray-300 mb-2">MVP投票</h4>
          {isVoted ? (
            <div className="text-gray-400">
              投票済みです
            </div>
          ) : (
            <MVPSelectBox
              participants={event?.participants}
              onVoteMVP={actions.voteForMVP}
              isVoting={isLoading}
            />
          )}
      </div>
      
      {isOwner && (
        <button
          onClick={actions.completeEvent}
          disabled={isLoading}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
        >
          イベントを終了
        </button>
      )}
    </div>
  );
};

export default OngoingActions;