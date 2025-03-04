import { useNavigate } from "react-router-dom";

/**
 * クラブ関連のナビゲーション操作に特化したフック
 * 画面遷移のみを担当し、API通信は含まない
 */
export const useClubNavigation = () => {
  const navigate = useNavigate();
  
  const navigateToClubDetail = (clubId) => {
    try {
      navigate(`/club/${clubId}`);
      return true;
    } catch (error) {
      console.error("ナビゲーションエラー:", error);
      return false;
    }
  };
  
  return {
    navigateToClubDetail
  };
}; 