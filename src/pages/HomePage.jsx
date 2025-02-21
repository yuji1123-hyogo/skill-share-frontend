import React from "react";
import HomeTemplate from "../components/templates/HomeTemplate";
import { useGetHomePostsQuery } from "../features/RTKQuery/apiSlice";



const HomePage = () => {
  //ホームページの投稿一覧を取得
  const { data, isLoading, error } = useGetHomePostsQuery();


  if(isLoading) return <p>ホームページ読み込み中...</p>
  if(error) return <p>ホームページの読み込み時にエラーが発生しました</p>

  return (
    <HomeTemplate
      posts={data.posts ?? []}
    />
  );
};

export default HomePage;
