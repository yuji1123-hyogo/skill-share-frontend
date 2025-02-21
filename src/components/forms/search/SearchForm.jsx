import React from "react";
import TagEditor from "../TagEditor";
import { useSearch } from "../../../hooks/search/useSearch";


const SearchForm = ({ searchMode, setSearchResults }) => {
  const { searchTerm, setSearchTerm, selectedTagList, setSelectedTagList} = useSearch({ searchMode, setSearchResults });
  
  return (
    <div className="bg-dark-secondary rounded-lg shadow-lg p-6 mb-4 max-w-xl mx-auto" >
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={searchMode === "user-search" ? "ユーザーを検索" : "クラブを検索"}
        className="w-full px-4 py-2 mb-4 bg-dark-primary border border-dark-accent rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <TagEditor
        selectedTags={selectedTagList}
        setSelectedTags={setSelectedTagList}
        searchMode={searchMode}
        className="mt-4"
      />
    </div>
  );
};

export default SearchForm;
