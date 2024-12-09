import React, { useContext, useEffect, useRef, useState } from 'react'
import Post from '../../components/PrimaryComponents/Post/Post';
import './Home.css'
import Rightbar from '../../components/PrimaryComponents/Rightbar/Rightbar';

import { useSelector } from 'react-redux';
import { fetchTimelineApiCrient } from '../../../model/httpApiCrients/postApicrient';
import PostSendForm from"../../components/PrimaryComponents/Post/PostSendForm/PostSendForm"
import TagFilter from '../../components/PrimaryComponents/TagFilter/TagFilter';
function Home() {
  const currentUser = useSelector((state)=>state.user)
  const currentUserId = currentUser.userId
  const [posts, setPosts] = useState([]);
  const postsEndRef = useRef();

  const [filteredResultsState,setFilteredResultsState] = useState([])
  const [targetTag, setTargetTag] = useState(""); // ターゲットタグ
  const [sortOrder, setSortOrder] = useState("ascend");

  const fetchHomePosts = async()=>{
    if(currentUser){
      try{
        //タイムラインの取得
        const response = await fetchTimelineApiCrient()
        setPosts(response.data);
      }catch(e){
        console.log(e)
      }
    }else{
      console.log("ユーザー情報がセットされていません")
    }
  }

  useEffect(()=>{
    fetchHomePosts();
  },[]
  )

  const postscroll = () => {
    postsEndRef.current.scrollIntoView({ behavior: "smooth" });
  }

  return (
        <> 
          <div className="Home">        

            <div className="timeline">
              {
                posts.length > 0 && (
                  <TagFilter
                  filteredResultsState={filteredResultsState}
                  setFilteredResultsState={setFilteredResultsState}
                  mode={"posts-filter"}
                  targetTag={targetTag}
                  setSortOrder={setSortOrder}
                  sortOrder={sortOrder}
                  setTargetTag={setTargetTag}
                  postResults={posts}
              />
                )
              }

            {
              filteredResultsState.length > 0 && (
                filteredResultsState.map((post) => (
                  <Post
                  page="Home"
                  key={post._id}
                  post={post}
                  />))
                )
            }
            {posts.length > 0 &&  filteredResultsState.length === 0 &&  (
              posts.map((post) => (
              <Post
              page="Home"
              key={post._id}
              post={post}
              />))
            ) }
            {posts.length === 0 && (
            <p>投稿がありません</p>
            )}
             <div ref={postsEndRef} />
            </div>   

            <div className="post-send-form-inHome">
                <PostSendForm posts={posts} setPosts={setPosts} postscroll={postscroll}/>
            </div>    
          </div>  
   
        </>
  )
}

export default Home