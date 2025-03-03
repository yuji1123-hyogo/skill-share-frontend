import { useUpdateUserMutation } from "../../features/RTKQuery/apiSlice";
import { useFormSubmitHandler } from "../useFormSubmitHandler";
import { transformUserData } from "../transforms/transformers";

//リファクタリング中
//useSubmitUserから移行中
//useSubmitUserは削除予定
//ユーザー情報の更新
export const useUpdateUser = () => {
  const { handleSubmit, isSubmitting, submitError } = useFormSubmitHandler(
    useUpdateUserMutation,
    {
      successMessage: "ユーザー情報を更新しました",
      errorMessage: "ユーザー情報の更新に失敗しました",
      transformData: transformUserData
    }
  );

  const handleSubmitUser = (data, image = null, selectedTags = []) => {
    return handleSubmit(data, { image, selectedTags });
  };

  return {
    handleSubmitUser,
    isSubmitting,
    submitError,
  };
};

export default useUpdateUser;