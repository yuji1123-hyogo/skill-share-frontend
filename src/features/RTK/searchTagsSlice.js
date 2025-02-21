import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchTags: [], // 検索で使用されたタグのリスト
};

const searchTagsSlice = createSlice({
  name: 'searchTags',
  initialState,
  reducers: {
    setSearchTags: (state, action) => {
      state.searchTags = action.payload;
    },
    clearSearchTags: (state) => {
      state.searchTags = [];
    },
  },
});

export const { setSearchTags, clearSearchTags } = searchTagsSlice.actions;

// セレクター
export const selectSearchTags = (state) => state.searchTags.searchTags;

export default searchTagsSlice.reducer; 