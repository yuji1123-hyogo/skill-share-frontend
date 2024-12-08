import React, { useEffect, useRef, useState } from "react";
import "./ClubBord.css";
import { fetchClubPostApiCrient } from "../../../../model/httpApiCrients/postApicrient";
import Post from "../../PrimaryComponents/Post/Post";
import PostSendForm from "../../PrimaryComponents/Post/PostSendForm/PostSendForm"


const ClubBord = ({clubId}) => {
  const [posts,setPosts] = useState([])
  const postsEndRef = useRef();

  const fetchClubPost=async(clubId)=>{
    try{
      const res = await fetchClubPostApiCrient(clubId)
      setPosts(res.data)
    }catch(e){
      console.log("クラブの投稿取得エラー",e)
    }
  }

  useEffect(()=>{
    fetchClubPost(clubId)
  },[clubId])


  const postscroll = () => {
    postsEndRef.current.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <> 
    <div className="Home">        
      <div className="timeline">
      {posts.length > 0 ? (
        posts.map((post) => (
        <Post
        page="club"
        key={post._id}
        post={post}
        />))
      ) : (
      <p>投稿がありません</p>
      )}
       <div ref={postsEndRef} />

      </div>   
      <div className="club-post-sendform">
         <PostSendForm posts={posts} setPosts={setPosts} postscroll={postscroll} clubId={clubId}/>
      </div>       
    </div>  
  </>
  );
};

export default ClubBord;
