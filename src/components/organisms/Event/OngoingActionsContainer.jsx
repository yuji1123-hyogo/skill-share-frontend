import React from "react";
import { useSelector } from "react-redux";
import { useUpdateEventStatusMutation, useVoteForMVPMutation } from "../../../features/RTKQuery/apiSlice";
import OngoingActionsPresentation from "../../molecules/OngoingActionsPresentation";
import { toast } from "react-toastify";

const OngoingActionsContainer = ({ event}) => {
  const [updateStatus, { isLoading: isEnding }] = useUpdateEventStatusMutation();
  const [voteMVP, { isLoading: isVoting }] = useVoteForMVPMutation();

  // ✅ ユーザーのステータス判定
  const currentUserId = useSelector(state => state.auth.userId)
  const isHost = event.host.id === currentUserId;
  const isParticipate = event.participants.some((p) => p.id === currentUserId);
  const userVote = event.votes.find((v) => v.voter === currentUserId);
  const isVoted = Boolean(userVote);
  const votedUser = isVoted ? event.participants.find((p) => p.id === userVote.candidate) : null;

  console.log("userVote in ongoing container",event.votes)

  const handleEndEvent = async () => {
    try{
    await updateStatus(event.id).unwrap();
    toast.success(`イベントを終了しました:${event.name}`);
    }catch(e){
      console.error("イベント終了エラー:",e)
      toast.error(e.message || "イベントを終了できませんでした");
    }
  };

  const handleVoteMVP = async (candidateId) => {
    try{
      console.log("candidateId",candidateId)
      const result = await voteMVP({ eventId: event.id, candidateId }).unwrap();
      console.log("MVP投票レスポンス",result)
      toast.success(`MVP投票しました`);
    }catch(e){
      console.error("MVP投票エラー:",e)
      toast.error(e.message || "MVP投票できませんでした");
    }
  };

  return (
    <OngoingActionsPresentation
      isHost={isHost}
      isParticipate={isParticipate}
      isVoted={isVoted}
      votedUser={votedUser}
      participants={event.participants}
      onEndEvent={handleEndEvent}
      onVoteMVP={handleVoteMVP}
      isEnding={isEnding}
      isVoting={isVoting}
      eventId={event.id}
    />
  );
};

export default OngoingActionsContainer;
