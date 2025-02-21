import { toast } from "react-toastify";
import { useUpdateUserMutation } from "../../features/RTKQuery/apiSlice";

export const useSubmitUser= () => {

    const [updateUser, { isLoading: isUpdating, error: updateError }] = useUpdateUserMutation();
    //RHFのhandleSubmitのコールバック
    const handleSubmitUser = async ({data, image = null, selectedTags = []}) => {
    const updateData = { ...data, profilePicture: image, tags: selectedTags };

    try {
      await updateUser(updateData).unwrap();
      toast.success("ユーザー情報を更新しました");
    } catch (err) {
      console.log(err)
      toast.error(err.message ||"ユーザー情報の更新に失敗しました");
    }
  };

  return {
    handleSubmitUser,
    isUpdating,
    updateError,
  };
};
