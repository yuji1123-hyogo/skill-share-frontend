import React, { useState } from "react";
import Tabs from "../molecules/TabSwitcher";
import UserForm from "../forms/user/UserForm";
import UserProfile from "../organisms/User/UserProfile";
import { useSelector } from "react-redux";


const ProfileTemplate = ({ targetUserId,posts }) => {
  const [activeTab, setActiveTab] = useState("user-profile");
  const currentUserId = useSelector(state => state.auth.userId)

  const tabs = [
    { label: "プロフィール", value: "user-profile" },
    targetUserId === currentUserId && { label: "プロフィール編集", value: "user-edit" },
  ].filter(Boolean);


  return (
    <div>
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      {activeTab === "user-profile" && <UserProfile targetUserId={targetUserId} posts={posts} />}
      {activeTab === "user-edit" && <UserForm setActiveTab={setActiveTab}/>}
    </div>
  );
};

export default ProfileTemplate;
