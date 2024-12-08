import React, { useEffect, useState } from "react";
import "./EventOverviewTab.css";
import { useSelector } from "react-redux";
import EventDetail from "./EventDeatil/EventDetail";
import { fetchClubEvents } from "../../../../model/httpApiCrients/eventApiClient";

const EventOverviewTab = ({ club, type ,setClub}) => {
  const [events, setEvents] = useState([]); // 表示対象のイベント群
  const currentUserId = useSelector((state) => state.user.userId);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // events:クラブが開催するイベントの概要
        const res = await fetchClubEvents(club._id);

        // `type`プロップスに基づいてイベントを分類
        if (type === "not-finished") {
          // 開催中またはこれからのイベント
          const notFinishenEvents = res.filter((event) => event.status === "upcoming" || event.status === "ongoing")
          setEvents(notFinishenEvents);
          console.log("未終了イベントリスト",notFinishenEvents)
        } else if (type === "finished") {
          // 終了したイベント
          const finishedEvents = res.filter((event) => event.status === "completed")
          setEvents(finishedEvents);
          console.log("終了済み",finishedEvents)
        }
      } catch (e) {
        console.error("イベント取得エラー:", e);
      }
    };
    fetchEvents();
  }, [club._id, type]);


   

  return (
    <div className="event-overview-tab">
      <h2>{type === "not-finished" ? "現在のイベント" : "終了したイベント"}</h2>
      {events.length === 0 && (<p>該当するイベントはありません。</p>)}
      {(
        <ul className="event-list">
          {events.map((event) => (
            <li key={event._id} className="event-item">
              <EventDetail eventId={event._id} setEventsList={setEvents} events={events} setClub={setClub} club={club} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventOverviewTab;


