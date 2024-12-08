//redux-toolkitではスライスを作成するとそれに対応したアクションが自動生成される
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCurrentUserByCokkieApiCrient, followApicrient, updateProfileApiCrient, updateUserProfile, updateUserProfileApiCrient } from "../httpApiCrients/userApiCrient";
import { loginApiCrient, logoutApiCrient } from "../httpApiCrients/authApiCrient";
import { uploadProfilePictureApiCrient } from "../httpApiCrients/uploadApiCrients";


//非同期アクション
//関数型のアクションを作成する為ねにcreateAsyncThunkでアクションを作成
//createAsyncThunc('slice/action',(payload,thunkAPI)=>{try/catch})
//アクション名の前に属するslice名を明示
//error時はそれに沿った処理をreducerで行うためrejectWithValueを使用。extrareducerでerror内容が扱える。

//ログイン時のアクション
export const loginActionCreater = createAsyncThunk(
    'user/loginActionCreater',
    async({email,password},thunkAPI)=>{
        try{
            const response = await loginApiCrient({email,password})
            console.log(`ログインに成功しました${JSON.stringify(response.data,null,2)}`)
            return response.data.user
        }catch(error){
            // サーバーからのエラーメッセージを取得
            const errorMessage = error.response?.data?.message || error.message;
            console.error("エラーの詳細: ", error.response?.data || error.message);
            
            // Reduxにエラー情報を送信
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
)

//ログアウト用アクション
export const logoutActionCreater = createAsyncThunk(
    'user/logout',
    async(_,thunkAPI)=>{
        try{
            const response = await logoutApiCrient()
            console.log(`ログアウト時のメッセージ${JSON.stringify(response.data,null,2)}}`)
            return response.data
        }catch(e){
            return thunkAPI.rejectWithValue(e.response)
        }
    }
)

//リロード時のユーザーフェッチを行うアクション
export const fetchLoggedInUserActionCreater = createAsyncThunk(
    'user/fetchLoggedInUserActionCreater ',
    async(_,thunkAPI)=>{
        try{
            const response = await fetchCurrentUserByCokkieApiCrient()
            console.log(`redux:リロード時actionでのresponse${JSON.stringify(response.data,null,2)}`)
            return response.data
        }catch(e){
            return thunkAPI.rejectWithValue(e.response.data.message)
        }
    }
)

//プロフィールの変更を行うアクション(textdata)
//updateProfile{更新されたプロフィール}
export const updateProfileActionCreater = createAsyncThunk(
    'user/updateProfileActionCreater',
    async(updateProfile ,thunkAPI)=>{
        try{
            const response = await updateProfileApiCrient( updateProfile);
            console.log(`編集用アクションが作成されました${JSON.stringify(response.data, null, 2)}`)
            //response.data:{_id:hoge,username:moge....}
            return response.data
        }catch(e){
            const errorMessage = e.response?.data?.message || "プロフィールの更新に失敗しました";
            console.error("プロフィール更新エラー:", errorMessage);
            return thunkAPI.rejectWithValue(e.response.data.message || "プロフィールの更新に失敗しました")
        }
    }
)

//プロフィール画像更新用アクション
export const uploadProfilePictureActionCreater = createAsyncThunk(
    'user/uploadProfilePictureActionCreater',
    async(formData,thunkAPI)=>{
        try{
            const response = await uploadProfilePictureApiCrient(formData);
            console.log(`編集用アクションが作成されました${JSON.stringify(response.data, null, 2)}`)
            //response.data:{_id:hoge,username:moge....}
            return response.data.imageUrl
        }catch(e){
            return thunkAPI.rejectWithValue(e.response.data.message || "プロフィールの更新に失敗しました")
        }
    }
)

//フォローアクション
export const followActionCreater = createAsyncThunk(
    'user/followActionCreater',
    async(userId,thunkAPI)=>{
        try{
            const response = await followApicrient(userId);
            console.log(`フォローアクションが作成されました`,response.data.updateUser)
            //response.data:{}
            return response.data.updateUser
        }catch(e){
            return thunkAPI.rejectWithValue(e.response.data.message || "プロフィールの更新に失敗しました")
        }
    }
)


const themeSlice = createSlice({
    name:'theme',
    //このsliceで管理したいstateを追加(storeに追加される)
    initialState:{
        rgb:{r:0,g:0,b:0}
    },
    reducers:{
        //actionが発行されるとこのreducerの管理するstate=rgbやその他がreducerの第１引数として入ってくる
        //reducerに入ってくるstateはこのslice内で定義したstate達
        setRGB:(state,action)=>{
            state.rgb = action.payload
        }
        //自動的に{type:"setRGB",payload:....}のアクションを作成する関数が作られる
    }
})

const userSlice = createSlice({
    name:'user',
    //このsliceで管理したいstateを追加(storeに追加される)
    initialState:{
        userId: null,
        username: '',
        email: '',
        profilePicture: './logo192.png',
        bio: '',
        isLogin: false,
        isLoading: false,
        error: null,
        hobbies: [],
        following:[],
        favoriteClub : null,
    },
    reducers:{
        favoriteClubActionCreater:(state,action)=>{
            return {
                ...state,
                favoriteClub:action.payload
            }
        },
        tagLevelUpActionCreater:(state,action)=>{
            return{
                ...state,
                hobbies:action.payload.hobbies
            }
        }
    },
    //extraReducers:slice外で定義されたactionも扱える
    extraReducers:(builder)=>{
        builder
        //ログインリデューサー
         .addCase(loginActionCreater.pending, (state) => {
            state.isLoading = true;
            state.error = null;
         })
          .addCase(loginActionCreater.fulfilled, (state, action) => {
            return {
                ...state,
                userId: action.payload._id, //reasponse.dataの段階ではuserIdが._idとして帰ってくることに注意！！！
                username: action.payload.username,
                bio: action.payload.bio,
                email:action.payload.email,
                hobbies:action.payload.hobbies,
                profilePicture:action.payload.profilePicture,
                isLoading: false,
                isLogin: true,
                following:action.payload.following
            };
        })
          .addCase(loginActionCreater.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload || 'ログインに失敗しました';
        })       
        //ログアウト用リデューサー
          .addCase(logoutActionCreater.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
          .addCase(logoutActionCreater.fulfilled, (state, action) => {
            return {
             ...state,
            userAuthInfo:{
                isLogin:false,
            },
            userId: null,
            username: '',
            email: '',
            profilePicture: '',
            bio: '',
            hobbies:[],
            isLogin: false,
            isLoading: false,
            error: null,
            following:[],
            favoriteClub : null
          }
        })
          .addCase(logoutActionCreater.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload || 'ログアウトに失敗しました';
        })
        //リロード時のユーザーフェッチを行うためのリデューサー
          .addCase(fetchLoggedInUserActionCreater.pending, (state) => {
            state.isLoading = true;
            state.error = null;
         })
          .addCase(fetchLoggedInUserActionCreater.fulfilled, (state, action) => {
            return {
                ...state,
                userId: action.payload._id, //reasponse.dataの段階ではuserIdが._idとして帰ってくることに注意！！！
                username: action.payload.username,
                bio: action.payload.bio,
                email:action.payload.email,
                hobbies:action.payload.hobbies,
                profilePicture:action.payload.profilePicture,
                isLoading: false,
                isLogin: true,
                following:action.payload.following
            };
        })
          .addCase(fetchLoggedInUserActionCreater.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload || 'ユーザー情報の取得に失敗しました';
        })
        //プロフィール更新を行うリデューサー
        .addCase(updateProfileActionCreater.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(updateProfileActionCreater.fulfilled, (state, action) => {
            return {
                ...state,
                username: action.payload.username, // 必要なプロパティのみを展開
                bio: action.payload.bio,
                email:action.payload.email,
                hobbies:action.payload.hobbies,
                isLoading: false,
            };
        })
        .addCase(updateProfileActionCreater.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload || 'プロフィールの更新に失敗しました';
        })
        //プロフィール画像更新用リデューサー
        .addCase(uploadProfilePictureActionCreater.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(uploadProfilePictureActionCreater.fulfilled, (state, action) => {
            return {
                ...state,
                profilePicture:action.payload
            };
        })
        .addCase(uploadProfilePictureActionCreater.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload || 'プロフィール画像の更新に失敗しました';
        })
        //フォロー用用リデューサー
        .addCase(followActionCreater.pending, (state) => {
                state.isLoading = true;
                state.error = null;
        })
        .addCase(followActionCreater.fulfilled, (state, action) => {
                return {
                    ...state,
                    following:action.payload.following
                };
        })
        .addCase(followActionCreater.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'フォローに失敗しました';
        })

    }
})



//アクションの作成を行う関数
//dispatch(アクション名({...}))とすることでアクションを作成しdispacthを行える
//typeは自明なので...の部分にはpayloadに当たる部分を記述すればよい
export const { setRGB } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
export const {setUsername,setProfile,setLogin,setLogout,favoriteClubActionCreater,tagLevelUpActionCreater} = userSlice.actions
export const userReducer = userSlice.reducer;