import { useNavigate } from "react-router-dom";
import { useToggleFollowUserMutation } from "../../features/RTKQuery/apiSlice";

export const useUserInteractions = (targetUserId) => {
  const navigate = useNavigate();
  const [toggleFollowUser] = useToggleFollowUserMutation();

  const handleFollowToggle = async () => {
    try {
      await toggleFollowUser(targetUserId).unwrap();
    } catch (error) {
      console.error("フォロー操作に失敗しました", error);
    }
  };

  const handleNavigateToProfileEdit = () => {
    navigate(`/profile/${targetUserId}/edit`);
  };

  const handleNavigateToProfile = () => {
    navigate(`/profile/${targetUserId}`);
  };

  return { handleFollowToggle, handleNavigateToProfileEdit, handleNavigateToProfile };
};
