import React, { useState } from "react";
import { useGetClubEventsQuery } from "../../../features/RTKQuery/apiSlice";
import Tabs from "../../molecules/TabSwitcher";
import EventCardContainer from "./EventCardContainer";



const EventList = ({ clubId }) => {
    const { data, isLoading, error } = useGetClubEventsQuery(clubId);
    const [activeTab, setActiveTab] = useState("upcoming");

    if (isLoading) return (
        <div className="animate-pulse space-y-4">
            {[1, 2, 3].map(i => (
                <div key={i} className="h-40 bg-dark-accent rounded-lg"></div>
            ))}
        </div>
    );

    if (error) return (
        <div className="text-red-500 bg-red-500/10 p-4 rounded-lg">
            イベント一覧を取得できませんでした。
        </div>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
