import { useCreateCommentMutation } from "../../features/RTKQuery/apiSlice";
import { useFormSubmitHandler } from "../useFormSubmitHandler";
import { transformCommentData } from "../transforms/transformers";

//リファクタリング中
//useSubmitCommentから移行中
//useSubmitCommentは削除予定
//コメントの作成
export const useCreateComment = ({ targetType, targetId }) => {
  const { handleSubmit, isSubmitting, submitError } = useFormSubmitHandler(
    useCreateCommentMutation,
    {
      successMessage: "コメントを投稿しました",
      errorMessage: "コメントの投稿に失敗しました",
      transformData: (content, additionalData) => 
        transformCommentData(content, { targetType, targetId, ...additionalData })
    }
  );

  return {
    handleAddComment: handleSubmit,
    isSubmitting,
    submitError,
  };
};

export default useCreateComment;