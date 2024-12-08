import apiClient from "./apiCrientSetting";

export const SearchUserOrClubApiCrient  = async ({mode,inputVal,IntersetingTags}) =>{
    const API_URL = mode === "user" ? "/api/search/usersearch" : "/api/search/clubsearch" 
    console.log(API_URL)
    const response = await apiClient.post(API_URL,
        {
          searchTerm: inputVal,
          tags: IntersetingTags.map((tag)=>
           tag.name ? tag.name : tag), // 選択されたタグも送信
        }
      );
    return response
}

// 特定のタグを取得する
export const fetchExistTagMatchedInput = async (inputVal,mode) => {
    try {
      const response = await apiClient.post("/api/search/tagsearch",{mode,inputVal})
      return response.data;
    } catch (error) {
      console.error('イベント取得エラー:', error.response?.data || error.message);
      throw error;
    }
  };