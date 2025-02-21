import React, { useState } from "react";
import Modal from "react-modal";
import MVPSelectBox from "./MVPSelectBox";
import { useNavigate } from "react-router-dom";

// アクセシビリティのためにルート要素を指定
Modal.setAppElement("#root");

const OngoingActionsPresentation = ({ 
  isHost, 
  isParticipate, 
  isVoted, 
  votedUser, 
  participants, 
  onEndEvent, 
  onVoteMVP, 
  isEnding, 
  isVoting,
  eventId
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      {/** イベント終了ボタン */}
      {isHost && (
        <button
          onClick={() => setIsModalOpen(true)}
          disabled={isEnding}
          className="w-full py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          {isEnding ? "イベント終了中..." : "イベント終了"}
        </button>
      )}

      {/** MVP 投票ボックス */}
      {isParticipate && !isVoted && (
        <MVPSelectBox participants={participants} onVoteMVP={onVoteMVP} isVoting={isVoting} />
      )}

      {/** 投票済みの表示 */}
      {isVoted && votedUser && (
        <div className="text-center py-2 px-4 bg-purple-900/30 text-purple-300 rounded-lg">
          投票済み
        </div>
      )}

      {/** 確認モーダル */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="bg-dark-secondary p-6 rounded-xl border border-dark-accent max-w-sm mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black/50 flex items-center justify-center"
      >
        <h3 className="text-xl font-bold text-gray-200 mb-4">イベントを終了しますか？</h3>
        <div className="flex gap-4">
          <button
            onClick={() => { setIsModalOpen(false); onEndEvent(); }}
            className="flex-1 py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
          >
            はい
          </button>
          <button
            onClick={() => setIsModalOpen(false)}
            className="flex-1 py-2 px-4 bg-dark-accent text-gray-200 rounded-lg hover:bg-gray-700 transition-colors duration-200"
          >
            キャンセル
          </button>
        </div>
      </Modal>

      <button
        onClick={() => navigate(`/events/${eventId}/articles`)}
        className="w-full p-3 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        技術記事を共有
      </button>
    </div>
  );
};

export default OngoingActionsPresentation;
