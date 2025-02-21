import { toast } from "react-toastify";
import { useCreateClubMutation, useUpdateClubMutation } from "../../features/RTKQuery/apiSlice";

export const useSubmitClub = ({ mode = "create", initialData }) => {
  const isEditMode = mode === "edit";
  
  const [createClub, { isLoading: isCreating, error: createError }] = useCreateClubMutation();
  const [updateClub, { isLoading: isUpdating, error: updateError }] = useUpdateClubMutation();

  // ✅ クラブの作成・編集処理
  const handleSubmitClub = async (data, image, selectedTags, setError, coordinates, address) => {
    // 位置情報の検証
    if (!Array.isArray(coordinates) || coordinates.length !== 2) {
      toast.error("位置情報が正しく設定されていません");
      return;
    }

    const clubData = {
      ...data,
      themeImage: image,
      tags: selectedTags,
      location: {
        type: "Point",
        coordinates: coordinates,
        address: address || null,
      }
    };

    try {
      if (isEditMode) {
        await updateClub({ clubId: initialData.id, updateData: clubData }).unwrap();
        toast.success("クラブを更新しました");
      } else {
        await createClub(clubData).unwrap();
        toast.success("クラブを作成しました");
      }
    } catch (err) {
      toast.error("クラブの保存に失敗しました");
      if (err.data?.errors) {
        Object.entries(err.data.errors).forEach(([field, message]) => {
          setError(field, { type: 'manual', message });
        });
      }
    }
  };

  return {
    handleSubmitClub,
    isCreating,
    isUpdating,
    createError,
    updateError,
  };
};
