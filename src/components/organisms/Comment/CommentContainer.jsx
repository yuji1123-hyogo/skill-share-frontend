import React from "react";
import CommentPresentation from "./CommentPresentation";
import LoadingIndicator from "../../atoms/loading/LoadingIndicator";
import ErrorMessage from "../../atoms/errors/ErrorMessage";
import { useGetCommentByIdQuery } from "../../../features/RTKQuery/apiSlice";


const CommentContainer = ({ commentId }) => {
  const { data, isLoading, error } = useGetCommentByIdQuery(commentId);

  if (isLoading) return <LoadingIndicator message="コメントを読み込んでいます..." />;
  if (error) return <ErrorMessage message="コメントの取得に失敗しました" />;
  console.log("コメント",data.comment)

  return (
    <>
      <CommentPresentation comment={data.comment} />
    </>
  );
};

export default CommentContainer;
