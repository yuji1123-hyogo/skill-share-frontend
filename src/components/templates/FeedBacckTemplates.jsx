import React from 'react'
import EventBaseInfo from '../organisms/Event/EventBaseInfo'
import FeedbackForm from '../forms/feedback/FeedbackForm'
import FeedbackList from '../organisms/Feedback/FeedbackList'
import FeedbackCard from '../organisms/Feedback/FeedbackCard'


function FeedBacckTemplates({event,canCreateFeedback,feedbacks}) {
 
 

  return (
    <div className="container mx-auto px-4 py-8">
    <EventBaseInfo event={event} />
    
    <div className="mt-8">
    <h3 className="text-xl font-semibold mb-4 text-white">フィードバック一覧</h3>        
      {canCreateFeedback ? (
        <div className="mb-8">
          <FeedbackForm
            eventId={event.id}
          />
        </div>
      ) : (
        <p className="text-gray-600 mb-4">
          イベント終了後のみフィードバックを作成できます
        </p>
      )}

      <div className="mt-8">
            {feedbacks?.length > 0 ? (
                <div className="space-y-6">
                    {feedbacks.map(feedback => (
                    <FeedbackCard key={feedback.id} feedback={feedback} />
                    ))}
              </div>
        ) : (
          <p className="text-gray-600">まだフィードバックがありません</p>
        )}
      </div>
    </div>
  </div>
  )
}

export default FeedBacckTemplates