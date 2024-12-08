import React, { useEffect, useState } from "react";

import "./ClubHome.css";
import EventRegistrationTab from "../../components/Event/EventRegisterrationTab/EventRegistrationTab";
import EventOverviewTab from "../../components/Event/EventOverviewTab/EventOverviewTab";
import UserListTab from "../../components/Club/UserListTab/UserListTab";
import ClubDetailsTab from "../../components/Club/ClubDetailsTab/ClubDetailsTab";
import { useParams } from "react-router-dom";
import { getClubById } from "../../../model/httpApiCrients/clubApiClient";
import { useSelector } from "react-redux";
import EditForm from "../../components/Edditer/EditForm/EditForm";
import ClubBord from "../../components/Club/ClubBord/ClubBord";



const ClubHome = () => {
  const [club,setClub]=useState()
  const [activeTab, setActiveTab] = useState("chat"); 
  const {clubId} = useParams();
  const currentUser = useSelector((state)=>state.user)

  useEffect(()=>{
    const fetchClubdata=async()=>{
      try{
        const res = await getClubById(clubId)
        console.log(res)
        setClub(res)
      }catch(e){
        console.error(e)
        alert("クラブの取得に失敗しました")
      }
    }
    fetchClubdata()
  },[clubId])


  return (
    <div className="club-page">
      {/* ヘッダー */}
      <header className="club-header">
        <h1 className="club-title">{club?.name}</h1>
        <nav className="club-nav">
          <button
            className={activeTab === "chat" ? "active" : ""}
            onClick={() => setActiveTab("chat")}
          >
            チャット
          </button>
          <button
            className={activeTab === "event-registration" ? "active" : ""}
            onClick={() => setActiveTab("event-registration")}
          >
            イベント登録
          </button>
          <button
            className={activeTab === "event-overview" ? "active" : ""}
            onClick={() => setActiveTab("event-overview")}
          >
            開催中のイベント
          </button>
          <button
            className={activeTab === "event-overview-finished" ? "active" : ""}
            onClick={() => setActiveTab("event-overview-finished")}
          >
            終了済みのイベント
          </button>
          <button
            className={activeTab === "club-details" ? "active" : ""}
            onClick={() => setActiveTab("club-details")}
          >
            クラブ詳細
          </button>
          {
            club?.members[0]._id === currentUser.userId &&(
            <button
              className={activeTab === "club-eddit" ? "active" : ""}
              onClick={() => setActiveTab("club-eddit")}
            >
              クラブ詳細編集
            </button>
            )
          }
        </nav>
      </header>

      {/* タブの切り替え */}
      <main className="club-main">
        {activeTab === "chat" && <ClubBord clubId={clubId}/>}
        {activeTab === "event-registration" && <EventRegistrationTab club={club} setClub={setClub}/>}
        {activeTab === "event-overview" && <EventOverviewTab club={club} type={"not-finished"} setClub={setClub}/>}
        {activeTab === "event-overview-finished" && <EventOverviewTab club={club} type={"finished"}/>}
        {activeTab === "user-list" && <UserListTab type={"clubUserList"} club={club}/>}
        {activeTab === "club-details" && <ClubDetailsTab club={club}/>}
        {activeTab === "club-eddit" && <EditForm club={club} edditType={"club-update"} setClub={setClub}/>}
      </main>
    </div>
  );
};

export default ClubHome;
