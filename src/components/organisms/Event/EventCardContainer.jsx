import React from 'react'
import { useGetEventDetailQuery } from '../../../features/RTKQuery/apiSlice';
import EventCard from './EventCard';


function EventCardContainer({eventId}) {
    const { data, isLoading, error } = useGetEventDetailQuery(eventId);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>イベント情報を取得できませんでした。</p>;

  return (
    <EventCard event = {data.event}/>
  )
}

export default EventCardContainer