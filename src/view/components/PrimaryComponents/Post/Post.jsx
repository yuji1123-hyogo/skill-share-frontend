import React, { useEffect, useState } from 'react';
import "./Post.css";
import Comments from './Comments/Comment';
import CommentForm from './CommentSendForm/CommentSendForm';
import { fetchPostCommentsApiCrient } from '../../../../model/httpApiCrients/postApicrient';
import Tag from '../../../parts/Tag/Tag';
import Picture from '../../../parts/Picture/Picture';

function Post({ post, page}) {
  const [comments, setComments] = useState([]);

  const fetchComments = async (postId) => {
    try {
      const res = await fetchPostCommentsApiCrient(postId);
      setComments(res.data);
    } catch (err) {
      if(err.response.message){
        console.log(err.response.message)
      }
      console.error("コメントの取得に失敗しました", err);
    }
  };

  
  useEffect(() => {
    if(post.comments && post.comments.length >0 ){
      fetchComments(post._id);
    }
  }, [post._id]);


  return (
    <div className="Post">
      <header className="post-header">
        <div className="post-user-info">
          <Picture  parts={"usercard"} edditType={"user-update"} user={post.author} edditable={false}/>
          <p className="post-userInfo-username">{post.username}</p>        
          {page == "club" && 
            <p className='post-user-info-clubname'>(club:{post.club.name})</p>
          }
          <div className='post-userInfo-tags'>{post.tags.length > 0 && post.tags.map((t)=><Tag tag={t} key={t}/>)}</div>
        </div>
        
        {post.createdAt && <p>{new Date(post.createdAt).toLocaleString()}</p>}
      </header>
      <div className="post-content">
        <p>{post.content}</p>
      </div>
      <div className="post-comments">
        <hr></hr>
        <Comments comments={comments}/>
        <CommentForm postId={post._id} fetchComments={fetchComments}/>
        </div>
    </div>
  );
}

export default Post;