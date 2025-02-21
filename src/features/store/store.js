import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import storage from "redux-persist/lib/storage"; // localStorage
import { persistReducer, persistStore } from "redux-persist";
import { apiSlice } from "../RTKQuery/apiSlice"
import authReducer from "../RTK/authSlice"
import searchTagsReducer from "../RTK/searchTagsSlice"

// `auth` スライスの永続化設定
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["userId"], // `userId` のみ永続化
};


export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    [apiSlice.reducerPath]: apiSlice.reducer, 
    searchTags: searchTagsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // `redux-persist` を使用するため `false` にする
    }).concat(apiSlice.middleware), //  RTK Query のミドルウェアを追加
  devTools: process.env.NODE_ENV !== "production", //  DevTools の有効化（本番環境では無効）
});

// RTK Query のキャッシュ管理・リフェッチを設定
setupListeners(store.dispatch);
export const persistor = persistStore(store);