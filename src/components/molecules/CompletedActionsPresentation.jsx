import React from "react";
import { useNavigate } from "react-router-dom";

const CompletedActionsPresentation = ({ isParticipate, MVP, expDistributed, onDetermineMVP, onDistributeExp, isDetermining, isDistributing, eventId }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      {MVP ? (
        <div className="flex items-center gap-3 p-4 bg-purple-900/20 rounded-lg border border-purple-500/30">
          <img
            src={MVP.profilePicture || '/logo192.png'}
            alt={MVP.username}
            className="w-10 h-10 rounded-full border-2 border-purple-500"
          />
          <div>
            <span className="text-gray-400 text-sm">MVP</span>
            <p className="text-purple-300 font-medium">{MVP.username}</p>
          </div>
        </div>
      ) : isParticipate && (
        <button
          onClick={onDetermineMVP}
          disabled={isDetermining}
          className="w-full py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {isDetermining ? "MVP確定中..." : "MVPを決める"}
        </button>
      )}

      {isParticipate && !expDistributed && (
        <button
          onClick={onDistributeExp}
          disabled={isDistributing || !MVP}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {isDistributing ? "経験値分配中..." : "経験値を分配"}
        </button>
      )}

      {expDistributed && (
        <div className="text-center py-2 px-4 bg-green-900/20 text-green-300 rounded-lg border border-green-500/30">
          経験値分配済み
        </div>
      )}

      <button
        onClick={() => navigate(`/events/${eventId}/feedbacks`)}
        className="w-full p-3 bg-green-600 text-white rounded hover:bg-green-700"
      >
        フィードバックを作成
      </button>
    </div>
  );
};

export default CompletedActionsPresentation;
