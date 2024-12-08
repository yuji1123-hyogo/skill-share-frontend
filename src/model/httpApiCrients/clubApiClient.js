import apiClient from "./apiCrientSetting";



// クラブに参加する
export const joinClub = async (clubId) => {
  try {
    const response = await apiClient.post(`/api/clubs/${clubId}/join`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message);
  }
};

// 自分のクラブを取得する
export const getMyClub = async () => {
  try {
    const response = await apiClient.get(`/api/clubs/myclub`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message);
  }
};



// クラブを作成する
export const createClub = async (clubData) => {
  try {
    const response = await apiClient.post('/api/clubs', clubData);
    return response.data;
  } catch (error) {
    if(error.response.data.message){
      alert(error.response.data.message)
    }
    console.error('クラブ作成エラー:', error.response?.data || error.message);
    throw error;
  }
};

// 全てのクラブを取得する
export const getAllClubs = async () => {
  try {
    const response = await apiClient.get('/api/clubs');
    return response.data;
  } catch (error) {
    console.error('クラブ一覧取得エラー:', error.response?.data || error.message);
    throw error;
  }
};

// 特定のクラブを取得する
export const getClubById = async (clubId) => {
  try {
    const response = await apiClient.get(`/api/clubs/${clubId}`);
    return response.data;
  } catch (error) {
    console.error('クラブ取得エラー:', error.response?.data || error.message);
    throw error;
  }
};

// クラブを更新する
export const updateClub = async (clubId, updatedData) => {
  try {
    const response = await apiClient.put(`/api/clubs/${clubId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('クラブ更新エラー:', error.response?.data || error.message);
    throw error;
  }
};

// クラブを削除する 
export const deleteClub = async (clubId) => {
  try {
    const response = await apiClient.delete(`/api/clubs/${clubId}`);
    return response.data;
  } catch (error) {
    console.error('クラブ削除エラー:', error.response?.data || error.message);
    throw error;
  }
};

// クラブタグに経験値を追加する
export const addExperienceToTag = async ({clubId, tagname, experience}) => {
  try {
    const response = await apiClient.put(`/api/clubs/${clubId}/tags/${tagname}/experience`, {
      experience,
    });
    return response.data;
  } catch (error) {
    console.error('クラブタグへの経験値追加エラー:', error.response?.data || error.message);
    throw error;
  }
};
