import React, { useState } from "react";
import Tabs from "../molecules/TabSwitcher";
import UserForm from "../forms/user/UserForm";
import { useSelector } from "react-redux";
import UserCard from "../organisms/User/UserCard";
import PostFeed from "../organisms/Post/PostFeed";
import PostForm from "../forms/post/PostForm";



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
      {activeTab === "user-profile" && <PostFeed postIdList={targetUser.posts} />}
      {activeTab === "user-edit" && <UserForm setActiveTab={setActiveTab}/>}
    </div>
  );
};

export default ProfileTemplate;
