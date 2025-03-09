import { useEventCard } from "../EventCardContext";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserProfileSummary from "../../../../molecules/UserProfileSummary";

// 終了したイベントのアクション
const CompletedActions = () => {
  const context = useEventCard();
  
  // Provider外で使用された場合のガード
  if (!context || !context.event) {
    console.error("CompletedActionsはEventCardProvider内で使用してください");
    return null;
  }
  
  const { event, actions, isLoading, isOwner } = context;

  return (
    <div className="space-y-4">
      {event?.mvp ? (
        <div className="flex gap-3 p-4 bg-purple-900/20 rounded-lg border border-purple-500/30">
            <div className="flex  items-center">
              <span className="text-gray-400 text-sm">MVP</span>
            </div>
            <div className="flex items-center justify-center">
              <UserProfileSummary 
                username={event?.mvp?.username}
                profilePicture={event?.mvp?.profilePicture}
              />
            </div>
        </div>
      ) : isOwner && (
        <button
          onClick={actions.determineMVP}
          disabled={isLoading}
          className="w-full py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {isLoading ? "MVP確定中..." : "MVPを決める"}
        </button>
      )}

      {isOwner && !event?.expDistributed && (
        <button
          onClick={actions.distributeExp}
          disabled={isLoading || !event?.mvp}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
            {isLoading ? "経験値分配中..." : "経験値を分配"}
        </button>
      )}

      {event?.expDistributed && (
        <div className="text-center py-2 px-4 bg-green-900/20 text-green-300 rounded-lg border border-green-500/30">
          経験値分配済み
        </div>
      )}

      <button
        onClick={actions.navigateToFeedback}
        className="w-full p-3 bg-green-600 text-white rounded hover:bg-green-700"
      >
        フィードバックを作成
      </button>
    </div>
  );
};

export default CompletedActions;