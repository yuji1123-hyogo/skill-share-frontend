import React from 'react'
import "./TagFilter.css"

function TagFilter({
    filteredResultsState,
    setFilteredResultsState,
    mode,
    targetTag,
    setSortOrder,
    sortOrder,
    setTargetTag,
    userResults,
    clubResults,
    postResults
}) {

      // タグのレベルでフィルタリング
  const handleFilterByTagName = ({ results, mode, targetTagName }) => {
    let filteredResults = [];
    if (mode === "user") {
      filteredResults = results.filter((user) =>
        user.hobbies.some((hobbie) => hobbie.name === targetTagName)
      );
    } else if (mode === "club") {
      filteredResults = results.filter((club) =>
        club.tags.some((tag) => tag.name === targetTagName)
      ) 
    }else if (mode === "posts-filter"){
        filteredResults = results.filter((post)=>
        post.tags.some((tagName) => tagName === targetTagName)
      )
    };
    setFilteredResultsState(filteredResults);
  };

  // タグレベルでソート
  const handleSortByTagLevel = ({ results, mode, targetTagName, order }) => {
    let sortedResults = [];
    if (mode === "user") {
      sortedResults = results.sort((a, b) => {
        const aTag = a.hobbies.find((hobbie) => hobbie.name === targetTagName);
        const bTag = b.hobbies.find((hobbie) => hobbie.name === targetTagName);
        const aLevel = aTag ? aTag.level : 0;
        const bLevel = bTag ? bTag.level : 0;
        return order === "ascend" ? aLevel - bLevel : bLevel - aLevel;
      });
    } else if (mode === "club") {
      sortedResults = results.sort((a, b) => {
        const aTag = a.tags.find((tag) => tag.name === targetTagName);
        const bTag = b.tags.find((tag) => tag.name === targetTagName);
        const aLevel = aTag ? aTag.level : 0;
        const bLevel = bTag ? bTag.level : 0;
        return order === "ascend" ? aLevel - bLevel : bLevel - aLevel;
      });
    }
    setFilteredResultsState(sortedResults);
  };

  return (
    <div className="filter-sort-container">
    <div className="filter-container">
      <label htmlFor="targetTag">ターゲットタグ:</label>
      <input
        type="text"
        id="targetTag"
        value={targetTag}
        onChange={(e) => setTargetTag(e.target.value)}
        className="filter-input"
      />
      <button
        className="filter-button"
        onClick={() =>
          filteredResultsState.length > 0 ? 
          setFilteredResultsState([]) :
          handleFilterByTagName({
            results: mode === "user" && userResults ||
                     mode === "club" && clubResults ||
                     mode === "posts-filter" && postResults,
            mode,
            targetTagName: targetTag,
          })
        }
      >
        フィルター適用:{filteredResultsState.length > 0 ? "ON" : "OF"}
      </button>
    </div>

    {
        mode !== "posts-filter" && (
            <div className="sort-container">
            <label htmlFor="sortOrder">ソート順:</label>
            <select
              id="sortOrder"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="sort-select"
            >
              <option value="ascend" >降順</option>
              <option value="descend">昇順</option>
            </select>
            <button
              className="sort-button"
              onClick={() =>
                handleSortByTagLevel({
                  results: filteredResultsState.length > 0 ? filteredResultsState : mode === "user" ? userResults : clubResults,
                  mode,
                  targetTagName: targetTag,
                  order: sortOrder,
                })
              }
            >
              ソート適用
            </button>
          </div>
        )
    }
  </div>
  )
}

export default TagFilter