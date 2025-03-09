import React from "react";
import { useParams } from "react-router-dom";


import ProfileTemplate from "../components/templates/ProfileTemplate";
import { useGetUserPostsQuery } from "../features/RTKQuery/apiSlice";
import LoadingIndicator from "../components/atoms/loading/LoadingIndicator";


const ProfilePage = () => {
  const { userId: targetUserId } = useParams(); // URL から対象ユーザーIDを取得
  const { data, error, isLoading} = useGetPublicUserQuery(targetUserId);

  if (isLoading) return <LoadingIndicator message="プロフィールをを読み込んでいます..." />;
  if (error) return <p>エラーが発生しました: {error.message} </p>;

  return (
    <ProfileTemplate
      targetUser={data.targetUser} 
    />
  );
};

export default ProfilePage;

