import { useParams } from "react-router-dom";
import { useGetEventDetailQuery, useGetFeedbacksByEventQuery } from "../features/RTKQuery/apiSlice";
import LoadingIndicator from "../components/atoms/loading/LoadingIndicator";
import { canCreateFeedback } from "../utils/event/checkEventStatus";
import FeedbackList from "../components/organisms/Feedback/FeedbackList";
import EventBaseInfo from "../components/molecules/EventBaseInfo";
import { toast } from "react-toastify";
import FeedbackForm from "../components/forms/feedback/FeedbackForm";

const EventFeedbackPage = () => {
  const { eventId } = useParams();
  const { data, isLoading: eventLoading } = useGetEventDetailQuery(eventId);
  const { data: feedbacks, isLoading: feedbacksLoading } = useGetFeedbacksByEventQuery({
    eventId,
    page: 1,
    limit: 10
  });

  if (eventLoading || feedbacksLoading) {
    return <LoadingIndicator />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <EventBaseInfo event={data.event} />
      
      <div className="mt-8">        
        {canCreateFeedback(data.event) ? (
          <div className="mb-8">
            <FeedbackForm
              eventId={eventId}
              onSuccess={() => {
                toast.success("フィードバックを送信しました");
              }}
            />
          </div>
        ) : (
          <p className="text-gray-600 mb-4">
            イベント終了後のみフィードバックを作成できます
          </p>
        )}

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4 text-white">フィードバック一覧</h3>
          {feedbacks?.feedbacks.length > 0 ? (
            <FeedbackList feedbacks={feedbacks.feedbacks} />
          ) : (
            <p className="text-gray-600">まだフィードバックがありません</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventFeedbackPage; 