import React, { useState } from "react";
import Tabs from "../molecules/TabSwitcher";
import UserForm from "../forms/user/UserForm";
import { useSelector } from "react-redux";
import UserCard from "../organisms/User/UserCard";
import PostFeed from "../organisms/Post/PostFeed";



//UIロジック + ページのメイン部分全体のレイアウト
const ProfileTemplate = ({ targetUser}) => {
  const [activeTab, setActiveTab] = useState("user-profile");
  const currentUserId = useSelector(state => state.auth.userId)
  const isLogedInUser = targetUser.id === currentUserId
  const tabs = [
      { label: "プロフィール", value: "user-profile" },
      isLogedInUser && { label: "プロフィール編集", value: "user-edit" },
    ].filter(Boolean);


  return (
    <div>
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      {activeTab === "user-profile" && 
          <div className="max-w-4xl mx-auto p-4 space-y-8">
          <div className="bg-dark-secondary rounded-xl shadow-xl p-6  border-dark-accent">
            <UserCard targetUserId={targetUser.id}/>
          </div>
          <div className="space-y-4">
            <PostFeed postIdList={targetUser.posts} />
          </div>
        </div>
      }
      {activeTab === "user-edit" && <UserForm setActiveTab={setActiveTab}/>}
    </div>
  );
};

export default ProfileTemplate;
