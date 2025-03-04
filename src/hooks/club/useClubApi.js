import { useJoinClubMutation } from "../../features/RTKQuery/apiSlice";

/**
 * クラブ関連のAPI操作に特化したフック
 * API通信のみを担当し、UI操作は含まない
 */
export const useClubApi = () => {
  const [joinClub, { isLoading: isJoining }] = useJoinClubMutation();
  
  const handleJoinClub = async (clubId, options = {}) => {
    const { onSuccess, onError } = options;
    
    try {
      const result = await joinClub(clubId).unwrap();
      if (onSuccess) onSuccess(result);
      return { success: true, data: result };
    } catch (error) {
      console.error("クラブ参加エラー:", error);
      if (onError) onError(error);
      return { success: false, error };
    }
  };
  
  return {
    handleJoinClub,
    isJoining
  };
}; 