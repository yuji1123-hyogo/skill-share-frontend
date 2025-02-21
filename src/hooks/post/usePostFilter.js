import { useState, useMemo } from 'react';

export const usePostFilter = (posts = []) => {
  const [sortOrder, setSortOrder] = useState('desc'); // desc or asc
  const [filteredTag, setFilteredTag] = useState(null);

  // 全ての投稿から一意のタグを抽出
  const availableTags = useMemo(() => {
    const tagSet = new Set();
    posts.forEach(post => {
      post.tags?.forEach(tag => {
        tagSet.add(tag.name);
      });
    });
    return Array.from(tagSet);
  }, [posts]);

  // 投稿のフィルタリングと並び替え
  const filteredAndSortedPosts = useMemo(() => {
    let result = [...posts];

    // タグでフィルタリング
    if (filteredTag) {
      result = result.filter(post => 
        post.tags?.some(postTag => postTag.name === filteredTag)
      );
    }

    // 日付で並び替え
    result.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [posts, filteredTag, sortOrder]);

  return {
    filteredAndSortedPosts,
    availableTags,
    filteredTag,
    setFilteredTag,
    sortOrder,
    setSortOrder
  };
}; 