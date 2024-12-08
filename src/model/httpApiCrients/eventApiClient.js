import apiClient from './apiCrientSetting';



// 特定のクラブを取得する
export const getEventById = async (eventId) => {
  try {
    const response = await apiClient.get(`/api/events/${eventId}`);
    return response.data;
  } catch (error) {
    console.error('イベント取得エラー:', error.response?.data || error.message);
    throw error;
  }
};


// イベントを作成する
export const createEvent = async (data) => {
  try {
    const response = await apiClient.post('/api/events/create', data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message);
  }
};

// イベントに参加する
export const joinEvent = async (eventId) => {
  try {
    const response = await apiClient.post(`/api/events/${eventId}/participate`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message);
  }
};


// タグでイベントを検索する
export const getEventsByTags = async (tags) => {
  try {
    const response = await apiClient.get(`/api/events/search`, {
      params: { tags: tags.join(',') }, // カンマ区切りのタグをクエリパラメータとして送信
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message);
  }
};

// 経験値を分配する
export const distributeExperience = async ({eventId}) => {
  try {
    const response = await apiClient.post(`/api/events/${eventId}/distribute-experience`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message);
  }
};

// MVP に投票する
export const voteForMVP = async (eventId,candidateId) => {
  try {
    const response = await apiClient.post(`/api/events/${eventId}/vote`, {
      candidateId,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message);
  }
};

// MVP を決定する
export const determineMVP = async (eventId) => {
  try {
    const response = await apiClient.post(`/api/events/${eventId}/determine-mvp`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message);
  }
};

// ユーザーの趣味に基づくイベントを取得
export const recommendEventsForUser = async (userId) => {
  try {
    const response = await apiClient.get(`/api/events/recommend/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message);
  }
};

// イベントのステータスを更新する(一つ先に進める)
export const updateEventStatus = async (eventId) => {
  try {
    const response = await apiClient.patch(`/api/events/${eventId}/status`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message);
  }
};

//クラブが開催中のイベントを取得する
export const fetchClubEvents = async (clubId) => {
  try {
    const response = await apiClient.get(`/api/events/clubEvents/${clubId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message);
  }
};