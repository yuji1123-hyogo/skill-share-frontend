import { toast } from "react-toastify";

/**
 * クラブ関連の通知操作に特化したフック
 * トースト通知のみを担当し、API通信やナビゲーションは含まない
 */
export const useClubNotifications = () => {
  const showJoinSuccess = () => {
    toast.success("クラブに参加しました");
  };
  
  const showJoinError = (error) => {
    toast.error(error?.message || "クラブに参加できませんでした");
  };
  
  return {
    showJoinSuccess,
    showJoinError
  };
}; 