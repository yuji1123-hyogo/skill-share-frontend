import React, { useState } from "react";
import { useGetClubEventsQuery } from "../../../features/RTKQuery/apiSlice";
import Tabs from "../../molecules/TabSwitcher";
import EventCardContainer from "./EventCardContainer";
import LoadingIndicator from "../../atoms/loading/LoadingIndicator";
import ErrorMessage from "../../atoms/errors/ErrorMessage";


const EventList = ({ clubId }) => {
    const { data, isLoading, error } = useGetClubEventsQuery(clubId);
    const [activeTab, setActiveTab] = useState("upcoming");

    if (isLoading) return (
        <LoadingIndicator message='イベント一覧を取得中'/>
    );

    if (error) return (
        <ErrorMessage message="イベント一覧の取得に失敗しました" />
    );

    // updatedAtで並び替え
    const sortedEvents = [...data.events].sort((a, b) => 
        new Date(b.updatedAt) - new Date(a.updatedAt)
    );

    console.log("イベント一覧",data.events)
    return (
        <div className="space-y-6">
            <Tabs
                tabs={[
                    { label: "未開催のイベント", value: "upcoming" },
                    { label: "開催中のイベント", value: "ongoing" },
                    { label: "終了済みのイベント", value: "completed" },
                ]}
                activeTab={activeTab}
                onChange={setActiveTab}
                variant="minimal"
            />

            <div className="grid grid-cols-1 gap-6">
               {sortedEvents.filter(event => event.status === activeTab).length === 0 && (
                    <div className="text-center py-8">
                        <p className="text-gray-400 italic">対象のイベントはありません</p>
                    </div>
                )}
                {sortedEvents
                    .filter(event => event.status === activeTab)
                    .map(filteredEvent => (
                        <EventCardContainer 
                            key={filteredEvent.id} 
                            eventId={filteredEvent.id}
                        />
                    ))}
            </div>
        </div>
    );
};

export default EventList;
