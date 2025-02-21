import React from "react";
import EventBaseInfo from "../../molecules/EventBaseInfo";
import UserSummaryList from "../../molecules/UserSummaryList";
import UpcomingActionsContainer from "./UpcomingActionsContainer";
import OngoingActionsContainer from "./OngoingActionsContainer";
import CompletedActionsContainer from "./CompletedActionsContainer";

const EventCard = ({ event }) => {
  return (
    <div className="group relative bg-gradient-to-br from-purple-800/50 to-dark-secondary rounded-xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-purple-500/20 hover:-translate-y-1">
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      <div className="relative p-6 space-y-4">
        <EventBaseInfo event={event} />
        
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-gray-400 text-sm font-medium">参加者</h3>
            <UserSummaryList users={event.participants} />
          </div>

          <div className="pt-4 border-t border-purple-900/30">
            {event.status === "upcoming" && <UpcomingActionsContainer event={event} />}
            {event.status === "ongoing" && <OngoingActionsContainer event={event} />}
            {event.status === "completed" && <CompletedActionsContainer event={event} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
