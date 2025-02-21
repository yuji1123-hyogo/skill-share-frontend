import React, { useState } from 'react';
import PostContainer from "./PostContainer";
import Pagination from '../../molecules/Pagination';
import PostFilter from '../../molecules/PostFilter';
import { usePostFilter } from '../../../hooks/post/usePostFilter';

const POSTS_PER_PAGE = 10;

const PostList = ({ posts = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    filteredAndSortedPosts,
    availableTags,
    filteredTag,
    setFilteredTag,
    sortOrder,
    setSortOrder
  } = usePostFilter(posts);
  
  if (posts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400 italic">投稿はまだありません</p>
      </div>
    );
  }

  //必用なページ数
  const totalPages = Math.ceil(filteredAndSortedPosts.length / POSTS_PER_PAGE);
  //現在のページで表示する投稿の開始インデックス
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  //現在のページで表示する投稿
  const currentPosts = filteredAndSortedPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">投稿一覧</h2>
      <PostFilter
        availableTags={availableTags}
        filteredTag={filteredTag}
        setFilteredTag={setFilteredTag}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />

      <div className="space-y-4">
        {currentPosts.map((post) => (
          <PostContainer key={post.id} postId={post.id} />
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

export default PostList;
