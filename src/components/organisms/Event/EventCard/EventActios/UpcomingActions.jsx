import { useSelector } from "react-redux";
import { useEventCard } from "../EventCardContext";
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";

// 開催前のイベントのアクション
const UpcomingActions = () => {
    const context = useEventCard();
    const navigate = useNavigate();
    // Provider外で使用された場合のガード
    if (!context || !context.event) {
      console.error("UpcomingActionsはEventCardProvider内で使用してください");
      return null;
    }
    
    const { event, actions, isLoading, isParticipant, isOwner } = context;

    return (
      <div className="space-y-4">
        <div className="flex flex-wrap gap-3">
          {!isParticipant && (
            <button
              onClick={actions.joinEvent}
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? '参加処理中...' : 'イベントに参加'}
            </button>
          )}
          
          {isOwner && (
            <button
              onClick={actions.startEvent}
              disabled={isLoading}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
            >
              イベントを開始
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => navigate(`/events/${event.id}/articles`)}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            技術記事共有ページへ
          </button>
        </div>
      </div>
    );
  };
  
  export default UpcomingActions;