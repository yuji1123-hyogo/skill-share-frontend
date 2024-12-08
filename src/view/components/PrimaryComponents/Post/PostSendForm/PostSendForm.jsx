import React, { useContext, useRef } from 'react'
import "./PostSendForm.css"
import { useSelector } from 'react-redux';
import { createPostApiCrient} from '../../../../../model/httpApiCrients/postApicrient';

function Share({posts,setPosts,postscroll,clubId}) {
  const currentUser = useSelector((state)=>state.user)
  const currentUserId = currentUser.userId
  const postInput = useRef();

   
   // 投稿用関数
   const sharePost = async (newpost) => {
    try {
      const res = await createPostApiCrient(newpost)
       setPosts([...posts,res.data])
       postscroll();
    } catch (error) {
      console.error("投稿の共有中にエラーが発生しました", error);
    }
  };

  const submitHandler=(e)=>{
    e.preventDefault();
    const currentTime = new Date().toISOString(); 
    const newpost = {
      club:clubId && clubId,
      tags:currentUser.hobbies.map((h)=>h.name ? h.name : h) || [],
      content:postInput.current.value,
      author:currentUserId,
      username:currentUser.username,
      createdAt: currentTime,
    }
    console.log("newpost",newpost)
    sharePost(newpost)
    postInput.current.value = ''
  }

  return (
    <form className="post-send-form-container" onSubmit={submitHandler} >
      <textarea ref={postInput} className="post-send-form-input" placeholder="今なにしてる？" aria-label="投稿入力欄"></textarea>
      <button type="submit" className="share__button">投稿</button>
    </form>
  )
}

export default Share