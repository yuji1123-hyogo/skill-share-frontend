import React from "react";
import FollowingListTemplate from "../components/templates/FollowingListTemplates";
import { useGetFollowListQuery } from "../features/RTKQuery/apiSlice";

const FollowingListPage = () => {
  // `RTK Query` を使用してフォロー中のユーザーのリストを取得
  const { data, error, isLoading } = useGetFollowListQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return <FollowingListTemplate followIdList={data.following} />;
};

export default FollowingListPage;
