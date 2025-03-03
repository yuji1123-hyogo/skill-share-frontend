import { useCreatePostMutation } from "../../features/RTKQuery/apiSlice";
import { useFormSubmitHandler } from "../useFormSubmitHandler";
import { transformPostData } from "../transforms/transformers";

export const useCreatePost = ({ media = null, clubId = null, reset, setMedia }) => {
  const handleResetForm = () => {
    reset();
    setMedia(null);
  };

  const { handleSubmit, isSubmitting, submitError } = useFormSubmitHandler(
    useCreatePostMutation,
    {
      successMessage: "投稿が作成されました",
      errorMessage: "投稿の作成に失敗しました",
      onSuccess: handleResetForm,
      transformData: (formData, additionalData) => 
        transformPostData(formData, { media, clubId, ...additionalData })
    }
  );

  return {
    handleAddPost: handleSubmit,
    isSubmitting,
    submitError,
  };
};
