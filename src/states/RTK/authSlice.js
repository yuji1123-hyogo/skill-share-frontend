import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUserAPI, logoutUserAPI } from "../../api/clients/authApi";
import { persistor } from "../store/store";

export const loginAsync = createAsyncThunk(
  "auth/login",
  async (userCredentials, { rejectWithValue }) => {
    try {
      const response = await loginUserAPI(userCredentials);
      return response; //{message: "ログインしました", user: {id: 1, username: "test", email: "test@example.com"}}
    } catch (error) {
      return rejectWithValue(error.message); // 共通エラーハンドリング適用済み
    }
  }
);

export const logoutAsync = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await logoutUserAPI();
      await persistor.purge(); //ストレージから削除
      return null; // ログアウト成功時は userId を null に
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  userId: null, // 初期値は `null`
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {}, // ローカルな `reducer` はなし（すべて非同期処理）
  extraReducers: (builder) => {
    builder
      // **ログイン処理**
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.userId = action.payload.user.id;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // `error.message` を格納
      })

      // **ログアウト処理**
      .addCase(logoutAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.loading = false;
        state.userId = null; // ログアウト成功時に userId を削除
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
