import { useCreateCommentMutation } from "../../features/RTKQuery/apiSlice";
import { useState } from "react";

export const useHandleComment = ({ targetType, targetId }) => {
  const [createComment] = useCreateCommentMutation();
  const [commentError, setCommentError] = useState(null);

  const handleAddComment = async (content) => {
    try {
      setCommentError(null);
      await createComment({
        targetType,
        targetId,
        content
      }).unwrap();
    } catch (error) {
      setCommentError(error.message || "コメントの投稿に失敗しました");
    }
  };

  return {
    handleAddComment,
    commentError,
  };
};
