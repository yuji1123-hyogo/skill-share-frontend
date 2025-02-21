import React, { useState } from "react";
import SearchForm from "../forms/search/SearchForm";
import SearchResults from "../organisms/SearchResults";
import TabSwitcher from "../molecules/TabSwitcher";

const SearchTemplate = ({ searchResults, setSearchResults }) => {
  const [searchMode, setSearchMode] = useState("user-search");

  const tabs = [
    { label: "ユーザー検索", value: "user-search" },
    { label: "クラブ検索", value: "club-search" },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="space-y-6 ">
        <TabSwitcher
          tabs={tabs}
          activeTab={searchMode}
          onChange={setSearchMode}
          variant="pills"
        />

        <SearchForm 
          searchMode={searchMode} 
          setSearchResults={setSearchResults}
        />

        <SearchResults 
          searchResults={searchResults} 
          searchMode={searchMode}
        />
      </div>
    </div>
  );
};

export default SearchTemplate;

