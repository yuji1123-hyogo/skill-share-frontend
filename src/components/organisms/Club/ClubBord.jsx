import React from "react";


import { useGetClubPostsQuery } from "../../../features/RTKQuery/apiSlice";
import PostForm from "../../forms/post/PostForm";
import PostList from "../Post/PostList";
import LoadingIndicator from "../../atoms/loading/LoadingIndicator";

const ClubBord = ({ clubId }) => {
  const { data, isLoading, error } = useGetClubPostsQuery(clubId);

  if (isLoading) return <LoadingIndicator variant="dot" message="クラブポスト一覧を読み込んでいます..." />;
  if (error) return <p>エラーが発生しました: {error.message}</p>;

  console.log("クラブの掲示板",data)
  return (
    <div className="space-y-8">
      <PostForm clubId={clubId} />
      <PostList posts={data.posts} />
    </div>
  );
};

export default ClubBord;
