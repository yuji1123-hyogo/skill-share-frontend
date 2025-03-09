import React from "react";
import { useEventCard, EventCardProvider } from "./EventCardContext";
import { formatToJST } from "../../../../utils/formatToJST";
import UpcomingActions from "./EventActios/UpcomingActions";
import OngoingActions from "./EventActios/OngoingActions";
import CompletedActions from "./EventActios/CompletedActions";
import LoadingIndicator from "../../../atoms/loading/LoadingIndicator";
import ErrorMessage from "../../../atoms/errors/ErrorMessage";
import EventBaseInfo from "../EventBaseInfo";

// 合成コンポーネントではなく、単一のコンポーネントとして実装
const EventCard = ({ eventId }) => {
  console.log("EventCard rendered with eventId:", eventId);
  return (
    <EventCardProvider eventId={eventId}>
      <EventCardContent />
    </EventCardProvider>
  );
};

// ローディングとエラー処理用のラッパー + コンテンツ
const EventCardContent = () => {
  const { isLoading, error, event, isUpcoming, isOngoing, isCompleted } = useEventCard();
  
  if (isLoading) return <LoadingIndicator message="イベント情報を取得中..." />;
  if (error) return <ErrorMessage message="イベント情報の取得に失敗しました" />;
  if (!event) return <div className="text-gray-400">イベント情報がありません</div>;
  
  return (
    <div className="bg-dark-primary rounded-lg shadow-lg p-6 mb-6 border border-dark-accent">
      {/* イベント基本情報 */}
      <div className="mb-6">
        <EventBaseInfo event={event} />
      </div>
      
      {/* アクション部分 */}
      <div className="pt-4 border-t border-purple-900/30">
        {isUpcoming && <UpcomingActions />}
        {isOngoing && <OngoingActions />}
        {isCompleted && <CompletedActions />}
      </div>
    </div>
  );
};

export default EventCard;