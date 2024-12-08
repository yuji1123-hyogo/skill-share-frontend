import { configureStore } from '@reduxjs/toolkit';
import {themeReducer} from './currentUserSlice'
import {userReducer}  from './currentUserSlice'


//configurestore:複数のreducerを束ねて簡単にstoreが作成できる
//configureStore({
//  reducer:{
//    スライス名:対応するリデューサー
// }
//})
//として作成


const store = configureStore({
  reducer: {
    //storeにslice名:対応するreducerを登録
    //特定のstateにアクセスしたいときはstate.スライス名.特定のstate
    theme: themeReducer,
    user : userReducer,
  },
  devTools: process.env.NODE_ENV !== 'production', 
});

export default store;
