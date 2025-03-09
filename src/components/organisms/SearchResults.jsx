import React from "react";
import UserCard from "./User/UserCard";
import ClubCard from "./Club/ClubCard/ClubCard";
import { useTagSort } from "../../hooks/tag/useTagSort";
import TagSortForSearch from "../molecules/TagSortForSearch";
import LocationPicker from "../forms/LocationPicker";

const SearchResults = ({ searchResults, searchMode}) => {

  
  const { 
    sortedItems, 
    sortOrder, 
    setSortOrder, 
    sortingTag, 
    setSortingTag,
    sortDisabled,
    candidateTags
  } = useTagSort(searchResults);

  if (searchResults.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400 italic">検索結果がありません</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 mx-auto max-w-2xl">
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-400">
          検索結果: {searchResults.length}件
        </p>
        <TagSortForSearch
          sortOrder={sortOrder}
          onSortOrderChange={setSortOrder}
          sortingTag={sortingTag}
          onSortingTagChange={setSortingTag}
          disabled={sortDisabled}
          candidateTags={candidateTags}
        />
      </div>

      {searchMode === "user-search" && (
        <div className="grid grid-cols-1 gap-6">
          {sortedItems.map((user) => (
            <UserCard key={user.id} targetUserId={user.id} />
          ))}
        </div>
      )}
      
      {searchMode === "club-search" && (
        <div className="grid grid-cols-1 gap-6">
          {sortedItems.map((club) => (
            <ClubCard key={club.id} clubId={club.id} />
          ))}
        </div>
      )}

      {searchMode === "club-search" && (
        <LocationPicker clubs={searchResults}/>
      )}
    </div>
  );
};

export default SearchResults;
