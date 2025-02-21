const TagSortForSearch = ({ 
  sortOrder, 
  onSortOrderChange, 
  candidateTags,
  sortingTag,
  onSortingTagChange,
  disabled 
}) => {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-400">並び替え基準:</span>
        <select
          value={sortingTag}
          onChange={(e) => onSortingTagChange(e.target.value)}
          disabled={disabled}
          className="bg-dark-primary text-gray-200 rounded-lg px-3 py-1.5 text-sm border border-dark-accent focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          <option value="">全タグの合計</option>
          {candidateTags?.map(tag => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-400">順序:</span>
        <select
          value={sortOrder}
          onChange={(e) => onSortOrderChange(e.target.value)}
          disabled={disabled}
          className="bg-dark-primary text-gray-200 rounded-lg px-3 py-1.5 text-sm border border-dark-accent focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          <option value="desc">高い順</option>
          <option value="asc">低い順</option>
        </select>
      </div>
    </div>
  );
};

export default TagSortForSearch; 