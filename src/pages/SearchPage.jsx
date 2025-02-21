import React, { useState } from "react";
import SearchTemplate from "../components/templates/SearchTemplate";

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <SearchTemplate
      searchResults={searchResults}
      setSearchResults={setSearchResults}
    />
  );
};

export default SearchPage;
