import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import EventAction from './EventAction/EventAction';
import "./EventDetail.css"
import Tag from '../../../../parts/Tag/Tag';
import { getEventById } from '../../../../../model/httpApiCrients/eventApiClient';

function EventDetail({eventId,setEventsList,events,setClub,club}) {
    const [event,setEvent] = useState(null);
    const currentUser = useSelector((state)=>state.user)
    const currentUserId = currentUser.userId

    useEffect(()=>{
        const fetchEvent=async()=>{
            try{
                //event:イベントの詳細。eventsと分けた理由:データベースとの一貫性&小回り
                const res = await getEventById(eventId)
                setEvent(res)
            }catch(e){
                console.log(e)
            }
        }
        fetchEvent()
    },[events])

    if(!event){
        return <p>読み込み中...</p>}

  return (
    <div className="event-detail-container">
        <div className='event-detail-container-top'>
            <h3 className='event-title'>{event.name}</h3>
            <div className="event-detail-container-top-right">
                {
                event.status ==="upcoming" && <span className='event-status upcoming'>未開催</span>||
                event.status ==="ongoing" && <span className='event-status ongoing'>開催中</span> ||
                event.status ==="completed" && <span className='event-status completed'>終了</span> 
                }
                {event.participants.some((participant)=>participant.user._id === currentUserId) && <span className='event-status-participation'>参加済み</span>}
           </div>
        </div>
        
        <div className='event-detail-container-center'>
            <div className='event-detail-container-center-host'>
                <p><strong>開催クラブ</strong>: {event.club.name}</p>
                <p><strong>主催者</strong>: {event.participants[0].user.username}</p>
            </div>
 
            <p><strong>開催予定日</strong>: {new Date(event.date).toLocaleString()}</p>
            <p><strong>場所</strong>: {event.location}</p>
            <p><strong>詳細</strong>: {event.description || "なし"}</p>
            <div className="event-participants">
            <strong>参加者:</strong>
            {event.participants.map((participant,index) => (
                <span className="event-participants-username" key={participant.user._id}>
                    {index !== 0 && ","}
                    {participant.user.username}
                </span>
            ))}
           </div>     
           <div className="event-tags">
            {event.tags?.map((tag) => (
                <Tag key={tag._id} tag={tag} />
            ))}
            </div>
            {event.mvp && (
            <div className='event-mvp'>
                <strong>MVP:</strong>
                <p > {event.mvp.username}</p>
            </div>
            )}
        </div>



        <div className="event-options">
        <EventAction
            setClub={setClub}
            event={event}
            currentUserId={currentUserId}
            setEvent={setEvent}
            setEventsList={setEventsList}
            events={events}
            club={club}
        />
        </div>
    </div>
  )
}

export default EventDetail