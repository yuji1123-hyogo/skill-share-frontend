import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import Post from '../../components/PrimaryComponents/Post/Post'
import "./Profile.css"
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProfilePostApiCrient, fetchUserDataByIdApicrient, followApicrient, followingUserlistApiCrient } from '../../../model/httpApiCrients/userApiCrient'
import Picture from '../../parts/Picture/Picture'
import PostSendForm from"../../components/PrimaryComponents/Post/PostSendForm/PostSendForm"
import Tag from '../../parts/Tag/Tag'
import { followActionCreater } from '../../../model/redux/currentUserSlice'



function ProfilePage() {
  const location = useLocation(); 
  const paramUserId = new URLSearchParams(location.search).get('query');
  const currentUser = useSelector((state)=>state.user)

  const currentUserId = currentUser.userId;
  //プロフィール表示の対象が自分か他人か
  const isMine = currentUserId === paramUserId

  //ポスト
  const [posts, setPosts] = useState([]);
  //他のユーザー
  const [userInfo, setUserInfo] = useState(isMine ? currentUser : null);
  //他のユーザーのプロフィール画面のフォローボタンの表示を切り替えるための状態
  const [isFollowed,setIsFollowed] = useState(currentUser.following.includes(paramUserId))


  const postsEndRef = useRef()
  //フォロー操作用
  const dispatch  = useDispatch();



  // 他のユーザーの情報を取得
  const fetchUserInfo = async () => {
    try {
      const response = await fetchUserDataByIdApicrient(paramUserId)
      setUserInfo(response.data);
    } catch (e) {
        console.log('ユーザー情報取得エラー',e);
      }
    };
  
  //ポスト情報の取得
  const fetchProfilePosts = async () => {
    try {
      const response = await fetchProfilePostApiCrient(paramUserId)
      setPosts(response.data);
    } catch (e) {
      console.log(`プロフィールのポスト取得エラー`,e);
    }
  };


  useEffect(() => {
    //プロフィール表示対象が他人の時
    if(!isMine){
      fetchUserInfo(); 
    }
    fetchProfilePosts();
  }, [paramUserId]
); 

  const handleFollow = async () =>{
    try{
      console.log("フォロー処理開始", paramUserId); // デバッグログ
      await dispatch(followActionCreater(paramUserId)).unwrap();
      console.log("フォロー処理成功"); // 成功時ログ
      setIsFollowed((prev) => !prev);
    }catch(e){
      console.log("フォローエラー",e)
    }
  }

const postscroll = () => {
  postsEndRef.current.scrollIntoView({ behavior: "smooth" });
}



  return (
        <>
        {
          userInfo ?
          (
            <div className="profile">
            <div className="profile-top">

              <div className="profile-imgs">
                <Picture parts={"cover"} user={userInfo} edditable={isMine} edditType={"user-update"}/>
                <Picture parts={"profile"} user={userInfo} edditable={isMine} edditType={"user-update"}/>
              </div>

              <div className="user-info">
                <h3 className="username">
                  {userInfo?.username || "読み込み中..."}
                  {isMine ? ":自分の" : ":他人の"}
                </h3>
                <p className="bio">
                  {userInfo?.bio|| "自己紹介が未登録です"}
                </p>

                {/* フォローボタン */}
                {!isMine && (
                  <button className="profile-follow-button" onClick={handleFollow}>
                    {isFollowed ? "フォロー解除" : "フォロー"}
                  </button>
                )}

                {/* Hobbies 表示 */}
                <div className="tags-wrapper">
                  {
                    userInfo?.hobbies.map((tag)=>(
                    < Tag 
                    tag={tag}
                    key={tag._id}
                  />))
                  }
                </div>    
              </div>

            </div>

            <div className="profile-posts">
              {posts.map((post) => (
                <Post
                  page={"Profile"}
                  key={post._id}
                  post={post}
                />
              ))}
            </div>
            {/* ポストが投稿されたら自動スクロール */}
            <div ref={postsEndRef} />
            {isMine && (
              <div className="post-send-form-inprofile">
                <PostSendForm  posts={posts} setPosts={setPosts} postscroll={postscroll} />
              </div>
            )}
          </div>
          ):(
            <p>読み込み中....</p>
          )
        }
        </>
  )
}

export default ProfilePage