import React from 'react'
import { useGetEventDetailQuery } from '../../../features/RTKQuery/apiSlice';
import EventCard from './EventCard';
import LoadingIndicator from '../../atoms/loading/LoadingIndicator';


function EventCardContainer({eventId}) {
    const { data, isLoading, error } = useGetEventDetailQuery(eventId);

    if (isLoading) return (
      <div className="animate-pulse space-y-4">
          <div className="h-40 bg-dark-accent rounded-lg"></div>
      </div>
    )
    if (error) return <p>イベント情報を取得できませんでした。</p>;

  return (
    <EventCard event = {data.event}/>
  )
}

export default EventCardContainer