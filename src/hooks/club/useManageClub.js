import { useCreateClubMutation, useUpdateClubMutation } from "../../features/RTKQuery/apiSlice";
import { useFormSubmitHandler } from "../useFormSubmitHandler";
import { transformClubData } from "../transforms/transformers";

//リファクタリング中
//useSubmitClubから移行中
//useSubmitClubは削除予定
//クラブの作成と更新
export const useManageClub = ({ mode = "create", initialData = null }) => {
  const isEditMode = mode === "edit";
  const mutationHook = isEditMode ? useUpdateClubMutation : useCreateClubMutation;
  
  const { handleSubmit, isSubmitting, submitError } = useFormSubmitHandler(
    mutationHook,
    {
      successMessage: isEditMode ? "クラブを更新しました" : "クラブを作成しました",
      errorMessage: isEditMode ? "クラブの更新に失敗しました" : "クラブの作成に失敗しました",
      transformData: transformClubData
    }
  );

  const handleSubmitClub = (data, image, selectedTags, coordinates, address) => {
    return handleSubmit(data, { image, selectedTags, coordinates, address });
  };

  return {
    handleSubmitClub,
    isSubmitting,
    submitError,
  };
};

export default useManageClub;