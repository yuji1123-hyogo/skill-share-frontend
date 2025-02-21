import React, { useState } from "react";
import Tabs from "../../molecules/TabSwitcher";
import EventForm from "../../forms/event/EventForm";
import EventList from "./EventList";



const EventManagement = ({ clubId }) => {
  const [activeTab, setActiveTab] = useState("event-list");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-200">イベント管理</h2>
        <Tabs
          tabs={[
            { label: "イベント一覧", value: "event-list" },
            { label: "イベント作成", value: "event-creation" },
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
          variant="pills"
        />
      </div>
      <div className="mt-6">
        {activeTab === "event-creation" && <EventForm clubId={clubId} />}
        {activeTab === "event-list" && <EventList clubId={clubId} />}
      </div>
    </div>
  );
};

export default EventManagement;
