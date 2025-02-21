import React from "react";

const UpcomingActionsPresentation = ({ isHost, isParticipate, onParticipate, onStartEvent, isParticipating, isStarting }) => {
  return (
    <div className="flex gap-4">
      {!isParticipate && (
        <button
          onClick={onParticipate}
          disabled={isParticipating}
          className="flex-1 py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          {isParticipating ? "参加中..." : "参加する"}
        </button>
      )}
      {isHost && (
        <button
          onClick={onStartEvent}
          disabled={isStarting}
          className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          {isStarting ? "イベント開始中..." : "イベント開始"}
        </button>
      )}
    </div>
  );
};

export default UpcomingActionsPresentation;
