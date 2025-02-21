import React from "react";
import { useParticipateInEventMutation, useUpdateEventStatusMutation } from "../../../features/RTKQuery/apiSlice";
import UpcomingActionsPresentation from "../../molecules/UpcomingActionsPresentation";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const UpcomingActionsContainer = ({ event}) => {
  const [participate, { isLoading: isParticipating }] = useParticipateInEventMutation();
  const [updateStatus, { isLoading: isStarting }] = useUpdateEventStatusMutation();

  // ✅ ユーザーの役割を判定
  const currentUserId = useSelector(state => state.auth.userId)
  const isHost = event.host.id === currentUserId;
  const isParticipate = event.participants.some((p) => p.id === currentUserId);

  const handleParticipate = async () => {
    try{
      await participate(event.id).unwrap();
      toast.success(`イベントに参加しました:${event.name}`);
    }catch(e){
      console.error("イベント参加エラー:",e)
      toast.error(e.message || "イベントに参加できませんでした");
    }
  };

  const handleStartEvent = async () => {
    try{
      console.log(event)
      await updateStatus(event.id).unwrap();
      toast.success(`イベントを開始しました:${event.name}`);
    }catch(e){
      console.error("イベント開始エラー",e)
      toast.error(e.message || "イベントを開始できませんでした");
    }
  };

  return (
    <UpcomingActionsPresentation
      isHost={isHost}
      isParticipate={isParticipate}
      onParticipate={handleParticipate}
      onStartEvent={handleStartEvent}
      isParticipating={isParticipating}
      isStarting={isStarting}
    />
  );
};

export default UpcomingActionsContainer;
