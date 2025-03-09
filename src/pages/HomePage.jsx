import React from "react";
import HomeTemplate from "../components/templates/HomeTemplate";
import LoadingIndicator from "../components/atoms/loading/LoadingIndicator";



const HomePage = () => {
  //ログイン中のユーザーを
  const { data, error, isLoading} = useGetHomePostsQuery();

  if(isLoading) return <LoadingIndicator variant="pulse" message="ホームを読み込んでいます..." />
  if(error) return <p>ホームページの読み込み時にエラーが発生しました</p>

  return (
    <HomeTemplate
      targetUser={data.targetUser}
    />
  );
};

export default HomePage;
