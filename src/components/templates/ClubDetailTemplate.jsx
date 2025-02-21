import React, { useState } from "react";
import { useSelector } from "react-redux";
import Tabs from "../molecules/TabSwitcher";
import ClubBord from "../organisms/Club/ClubBord";
import ClubMenberList from "../organisms/Club/ClubMemberList";
import ClubForm from "../forms/club/ClubForm";
import EventManagement from "../organisms/Event/EventManagement";
import ClubCard from "../organisms/Club/ClubCard";


const ClubDetailTemplate = ({ clubDetail }) => {
  const [activeTab, setActiveTab] = useState("posts");
  const currentUserId = useSelector(state => state.auth.userId);

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="bg-dark-secondary rounded-xl shadow-xl p-6 border border-dark-accent">
        <h1 className="text-2xl font-bold text-gray-200 mb-6">{clubDetail.name}</h1>
        <Tabs
          tabs={[
            { label: "掲示板", value: "posts" },
            { label: "メンバー一覧", value: "members" },
            { label: "イベント", value: "events" },
            { label: "クラブ情報", value: "info" },
            clubDetail.members[0].id === currentUserId && { 
              label: "クラブ編集",
              value: "edit"
            },
          ].filter(Boolean)}
          activeTab={activeTab}
          onChange={setActiveTab}
          variant="pills"
        />
        <div className="mt-6">
          {activeTab === "posts" && <ClubBord clubId={clubDetail.id} />}
          {activeTab === "members" && <ClubMenberList members={clubDetail.members} />}
          {activeTab === "events" && <EventManagement clubId={clubDetail.id} />}
          {activeTab === "info" && <ClubCard clubId={clubDetail.id} />}
          {activeTab === "edit" && <ClubForm initialData={clubDetail} mode="edit" />}
        </div>
      </div>
    </div>
  );
};

export default ClubDetailTemplate;
