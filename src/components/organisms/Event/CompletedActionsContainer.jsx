import React from "react";
import { useSelector } from "react-redux";
import { useDetermineMVPMutation, useDistributeExpMutation } from "../../../features/RTKQuery/apiSlice";
import CompletedActionsPresentation from "../../molecules/CompletedActionsPresentation";

const CompletedActionsContainer = ({ event }) => {
  const [determineMVP, { isLoading: isDetermining }] = useDetermineMVPMutation();
  const [distributeExp, { isLoading: isDistributing }] = useDistributeExpMutation();

  // ✅ ユーザーの状態を判定
  const currentUserId = useSelector(state => state.auth.userId)
  const isParticipate = event.participants.some((p) => p.id === currentUserId);
  const expDistributed = event.expDistributed;

  const handleDetermineMVP = async () => {
    try {
      await determineMVP(event.id).unwrap();
    } catch (e) {
      console.error("MVP決定エラー", e);
    }
  };

  const handleDistributeExp = async () => {
    try {
      await distributeExp(event.id).unwrap();
    } catch (e) {
      console.error("経験値分配エラー", e);
    }
  };

  return (
    <div className="mt-4 p-4 bg-dark-secondary rounded-lg border border-dark-accent">
      <h4 className="text-lg font-semibold text-gray-200 mb-4">イベント完了アクション</h4>
      <CompletedActionsPresentation
        isParticipate={isParticipate}
        MVP={event.mvp}
        expDistributed={expDistributed}
        onDetermineMVP={handleDetermineMVP}
        onDistributeExp={handleDistributeExp}
        isDetermining={isDetermining}
        isDistributing={isDistributing}
        eventId={event.id}
      />
    </div>
  );
};

export default CompletedActionsContainer;
