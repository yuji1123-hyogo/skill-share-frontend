import { useParams } from "react-router-dom";
import { useGetEventDetailQuery, useGetSharedArticlesByEventQuery } from "../features/RTKQuery/apiSlice";
import SharedArticleForm from "../components/forms/sharearticle/SharedArticleForm";
import LoadingIndicator from "../components/atoms/loading/LoadingIndicator";
import ErrorMessage from "../components/atoms/errors/ErrorMessage";
import { canShareArticle } from "../utils/event/checkEventStatus";
import SharedArticleList from "../components/organisms/SharedArticle/SharedArticleList";
import EventBaseInfo from "../components/molecules/EventBaseInfo";
import { toast } from "react-toastify";

const EventSharedArticlesPage = () => {
  const { eventId } = useParams();
  const { data: eventResponse, isLoading: eventLoading } = useGetEventDetailQuery(eventId);
  const { data: articlesResponse, isLoading: articlesLoading } = useGetSharedArticlesByEventQuery({
    eventId,
    page: 1,
    limit: 10
  });

  if (eventLoading || articlesLoading) {
    return <LoadingIndicator />;
  }


  return (
    <div className="container mx-auto px-4 py-8">
      {eventResponse.event.name}
      <EventBaseInfo event={eventResponse.event} />
      
      <div className="mt-8">
      <h2 className="text-2xl font-bold text-white mb-6">技術記事共有</h2>
        
        {canShareArticle(eventResponse.event) ? (
          <div className="mb-8">
            <SharedArticleForm 
              eventId={eventId}
              onSuccess={() => {
                toast.success("記事を共有しました");
              }}
            />
          </div>
        ) : (
          <p className="text-gray-600 mb-4">
            イベント開催前または開催中のみ記事を共有できます
          </p>
        )}

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4 text-white">共有された記事一覧</h3>
          {articlesResponse?.articles.length > 0 ? (
            <SharedArticleList articles={articlesResponse.articles} />
          ) : (
            <p className="text-gray-600">まだ記事が共有されていません</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventSharedArticlesPage; 