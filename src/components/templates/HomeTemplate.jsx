import React from "react";
import PostForm from "../forms/post/PostForm";
import PostFeed from "../organisms/Post/PostFeed";

const HomeTemplate = ({ postIdList }) => {
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8 ">
      <div className="rounded-xl  border-dark-accent">
        <PostForm />
      </div>
      <div className="space-y-8">
        <PostFeed postIdList={postIdList} />
      </div>
    </div>
  );
};

export default HomeTemplate;
