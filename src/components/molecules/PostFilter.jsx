import React from 'react';
import TagList from './TagList';

const PostFilter = ({ 
  availableTags, 
  filteredTag, 
  setFilteredTag,
  sortOrder,
  setSortOrder 
}) => {
  return (
    <div className="bg-dark-secondary/50 backdrop-blur-sm rounded-lg p-6 space-y-4 border border-dark-accent/50 shadow-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-gray-200 font-medium flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
          </svg>
          フィルター設定
        </h3>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="bg-dark-primary/70 text-gray-200 rounded-lg px-3 py-1 border border-dark-accent/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="desc">新しい順</option>
          <option value="asc">古い順</option>
        </select>
      </div>
      
      <div>
        <h4 className="text-gray-400 text-sm mb-2">タグで絞り込む:</h4>
        {availableTags.length > 0 ? (
          <TagList
            variant="simple"
            tags={availableTags}
          onClick={(tag) => setFilteredTag(tag === filteredTag ? null : tag)}
            activeTag={filteredTag}
          />
        ) : (
          <p className="text-gray-400 text-sm">絞り込めるタグがありません</p>
        )}
      </div>
    </div>
  );
};

export default PostFilter; 