import { useNavigate } from "react-router-dom";
import { useJoinClubMutation } from "../../features/RTKQuery/apiSlice";
import { toast } from "react-toastify";


/**
 * ✅ クラブアクションのカスタムフック
 * @param {string} clubId - クラブID
 */
export const useClubActions = (clubId) => {
  const navigate = useNavigate();
  const [joinClub] = useJoinClubMutation();

  // ✅ クラブ詳細ページへ遷移
  const handleNavigateToClubDetail = () => navigate(`/club/${clubId}`);

  // ✅ クラブ参加処理
  const handleJoinClub = async () => {
    try{
      await joinClub(clubId).unwrap();
      navigate(`/club/${clubId}`); // ✅ 参加後にクラブ詳細ページへ遷移
      toast.success(`クラブに参加しました`);
    }catch(e){
      console.error("クラブ参加エラー:",e)
      toast.error(e.message || "クラブに参加できませんでした");
    }
  };

  return {
    handleNavigateToClubDetail,
    handleJoinClub,
  };
};
