import React from "react";
import { useParams } from "react-router-dom";


import ProfileTemplate from "../components/templates/ProfileTemplate";
import { useGetUserPostsQuery } from "../features/RTKQuery/apiSlice";
import LoadingIndicator from "../components/atoms/loading/LoadingIndicator";


const ProfilePage = () => {
  const { userId: targetUserId } = useParams(); // URL から対象ユーザーIDを取得

  // ✅ プロフィール対象ユーザーの投稿一覧を取得
  const { data, error, isLoading} = useGetUserPostsQuery(targetUserId);

  if (isLoading) return <LoadingIndicator message="プロフィールをを読み込んでいます..." />;
  if (error) return <p>エラーが発生しました: {error.message} </p>;

  return (
    <ProfileTemplate
      targetUserId={targetUserId}
      posts={data.posts || []} 
    />
  );
};

export default ProfilePage;

