import React, { useState } from "react";
import "./ClubManagementPage.css";
import ClubList from "../../components/Club/ClubList/ClubList";
import ModeSwitcherNav from "../../components/PrimaryComponents/ModeSwitcherNav/ModeSwitcherNav";
import EditForm from "../../components/Edditer/EditForm/EditForm"

const ClubManagementPage = () => {
  const [activeMode, setMode] = useState("clubcreation"); 
  const modelist = [
    {key: "clubcreation",label:"クラブ作成`"},
    {key: "clublist",label:"参加クラブ一覧`"},
  ]

  return (
    <div className="club-management-page">
      <nav className="club-management-page-navigation">
        <ModeSwitcherNav modelist={modelist} handleClick={setMode} activeMode={activeMode}/>
      </nav>

      {/* 各機能を切り替え */}
      <main className="club-management-page-main">
        {activeMode === "clubcreation" && <EditForm edditType = {"club-creation"}/>}
        {activeMode === "clublist" && <ClubList />}
      </main>
    </div>
  );
};

export default ClubManagementPage;
