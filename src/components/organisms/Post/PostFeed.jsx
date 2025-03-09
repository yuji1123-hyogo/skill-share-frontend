import React, { useState } from 'react';
import PostContainer from "./PostContainer";
import Pagination from '../../molecules/Pagination';
import PostFilter from '../../molecules/PostFilter';
import { usePostFilter } from '../../../hooks/post/usePostFilter';
import { POSTS_PER_PAGE } from '../../../constants/postPerPage';

const PostFeed = ({ postIdList = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);

 

  if (postIdList.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400 italic">投稿はまだありません</p>
      </div>
    );
  }

  //必用なページ数
  const totalPages = Math.ceil(postIdList.length / POSTS_PER_PAGE);
  //現在のページで表示する投稿の開始インデックス
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  //現在のページで表示する投稿
  const currentPosts = postIdList.slice(startIndex, startIndex + POSTS_PER_PAGE);

  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">投稿フィード</h2>
      {/* <PostFilter
        availableTags={availableTags}
        filteredTag={filteredTag}
        setFilteredTag={setFilteredTag}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      /> */}

      <div className="space-y-4">
        {currentPosts.map((postId) => (
          <PostContainer key={postId} postId={postId} />
        ))}
      </div>
      
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default PostFeed;
