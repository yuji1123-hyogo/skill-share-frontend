import React from "react";
import PostList from "../organisms/Post/PostList";
import PostForm from "../forms/post/PostForm";

const HomeTemplate = ({ posts }) => {
  return (
    <div className="bg-dark-secondary shadow-xl rounded-xl max-w-4xl mx-auto p-4 space-y-8 ">
      <div className="rounded-xl  border-dark-accent">
        <PostForm />
      </div>
      <div className="space-y-8">
        <PostList posts={posts} />
      </div>
    </div>
  );
};

export default HomeTemplate;
