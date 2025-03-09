import React from "react";

import LoadingIndicator from "../../atoms/loading/LoadingIndicator";
import ErrorMessage from "../../atoms/errors/ErrorMessage";
import PostPresentation from "./PostPresentation";
import { useGetPostDetailsQuery } from "../../../features/RTK/RTKQuery/apiSlice";

const PostContainer = ({ postId }) => {
  //投稿詳細の取得
  //親コンポーネントでpostsを取得しなかった理由 ⇒ club.postsやuser.postsなどの異なるコンテキストで再利用可能にするため
  const { data, isLoading, error } = useGetPostDetailsQuery(postId);

  if (isLoading) return <LoadingIndicator message="投稿を読み込んでいます..." />;
  if (error) return <ErrorMessage message="投稿の取得に失敗しました" />;
  if (!data?.post) return <ErrorMessage message="投稿データが見つかりません" />;

  return (
    <PostPresentation post={data.post} />
  )
};

export default PostContainer;
