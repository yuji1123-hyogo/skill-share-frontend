import React, { useState } from "react";
import Tabs from "../molecules/TabSwitcher";
import MyClubList from "../organisms/Club/MyClubList";
import ClubForm from "../forms/club/ClubForm";


const ClubManagementTemplate = () => {
  const [activeTab, setActiveTab] = useState("list");

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="bg-dark-secondary rounded-xl shadow-xl p-6 border border-dark-accent">
        <h1 className="text-2xl font-bold text-gray-200 mb-6">クラブ管理</h1>
        <Tabs
          tabs={[
            { label: "参加クラブ一覧", value: "list" },
            { label: "クラブ作成", value: "create" },
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
          variant="minimal"
        />
        <div className="mt-6">
          {activeTab === "list" && <MyClubList />}
          {activeTab === "create" && <ClubForm mode="create" />}
        </div>
      </div>
    </div>
  );
};

export default ClubManagementTemplate;
