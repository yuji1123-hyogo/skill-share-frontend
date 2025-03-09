import React from "react";
import EventBaseInfo from "../organisms/Event/EventBaseInfo";
import SharedArticleForm from "../forms/sharearticle/SharedArticleForm";
import SharedArticleCard from "../organisms/SharedArticle/SharedArticleCard";

const SharedArticleTemplate = ({articles,event,canShareArticle}) => {
  return(
    <div className="flex flex-col items-center  px-4 py-8">
        <EventBaseInfo event={event} />
      
      <div className="mt-8">
      <h2 className="text-2xl font-bold text-white mb-6">技術記事共有</h2>
        
        {canShareArticle ? (
          <div className="mb-8">
            <SharedArticleForm 
              eventId={event.id}
            />
          </div>
        ) : (
          <p className="text-gray-600 mb-4">
            イベント開催前または開催中のみ記事を共有できます
          </p>
        )}

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4 text-white">共有された記事一覧</h3>
          {articles.length > 0 ? (
            <div className="space-y-4">
              {articles.map(article => (
                <SharedArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <p className="text-gray-600">まだ記事が共有されていません</p>
          )}
        </div>
      </div>
    </div>
  )
};

export default SharedArticleTemplate;