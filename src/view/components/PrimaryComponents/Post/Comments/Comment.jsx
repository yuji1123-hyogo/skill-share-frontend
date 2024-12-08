import React, { useState, useEffect } from "react";
import "./Comment.css"

const Comments = ({ postId,comments}) => {

  return (
    <div className="comments">
      <h5 className="comments-title">アドバイス/コメント</h5>
      {comments && comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment._id} className="comment">
            <strong>{comment.author?.username || "匿名"}</strong>
            <p className="coment-content">{comment.content}</p>
          </div>
        ))
      ) : (
        <p className="coment-content">まだコメントはありません</p>
      )}
    </div>
  );
};

export default Comments;