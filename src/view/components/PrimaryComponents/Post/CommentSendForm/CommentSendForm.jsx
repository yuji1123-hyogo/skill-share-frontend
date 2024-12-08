import { useState } from "react";
import "./CommentSendForm.css"
import { commentToPostApiCrient } from "../../../../../model/httpApiCrients/postApicrient";

const CommentForm = ({ postId, fetchComments }) => {
    const [comment, setComment] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await commentToPostApiCrient({postId:postId,content:comment})
          setComment("");   
          fetchComments(postId); // コメント一覧を再取得してセット
        } catch (err) {
          console.error("コメントの投稿に失敗しました", err);
        }
      };

    return (
      <form className="comment-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="コメントを入力..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
        <button type="submit">投稿</button>
      </form>
    );
  };
  
  export default CommentForm;