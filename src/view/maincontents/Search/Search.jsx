import React, { useEffect, useRef, useState } from "react";
import "./Search.css";
import axios from "axios";
import Usercard from "../../components/PrimaryComponents/Usercard/Usercard";
import ModeSwitcherNav from "../../components/PrimaryComponents/ModeSwitcherNav/ModeSwitcherNav"
import ClubDetailsTab from "../../components/Club/ClubDetailsTab/ClubDetailsTab";
import { useTagManeger } from "../../../controller/useTagManeger";
import TagManager from "../../components/Edditer/TagManeger/TagManeger";
import { useSelector } from "react-redux";
import { SearchUserOrClubApiCrient } from "../../../model/httpApiCrients/searchApiCrient";



function Search() {
  const [userResults, setUserResults] = useState([]); 
  const [clubResults,setClubresults] = useState([])
  const [timeoutId, setTimeoutId] = useState(null); // デバウンス用
  const [searchTerm, setSearchTerm] = useState(""); // 入力値
  const [mode, setMode] = useState("user"); // 検索モード（user/club）
  const [tagSearch,settagSearch] = useState(true)
  const currentUser = useSelector((state)=>state.user)
 
  const {
    setInterestingTags,
    suggestedTags,
    IntersetingTags,
    newTagInput,
    setNewTagInput,
    selectedTags,
    toggleTag,
    addNewTag,
    removeTag,
    suggestTimeOutId,
    handleTagSuggestionByInputChange
  }
  =useTagManeger({edditType:"user-update",currentUser})

  const modelist=[
    {key:"club",label:"クラブ検索"},
    {key:"user",label:"ユーザー検索"}
  ]

  // デバウンス付き検索
  const handleInputChange = (event) => {
    const inputVal = event.target.value;
    setSearchTerm(inputVal);

    //すでに起動中の同処理を破棄
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const newTimeoutId = setTimeout(async () => {
      if (inputVal.length > 0) {
        try {
          const response = await SearchUserOrClubApiCrient({inputVal:inputVal,IntersetingTags:IntersetingTags,mode:mode})
          mode === "user" ? setUserResults(response.data) : setClubresults(response.data)
        } catch (e) {
          console.error("検索エラー:", e.response);
        }
      } else {
        setUserResults([]);
        setClubresults([])
      }
    }, 400);

    setTimeoutId(newTimeoutId);
  };

  useEffect(()=>{
    setSearchTerm(""); // 入力値をクリア
    setUserResults([]); // 検索結果をクリア
    setClubresults([])// 検索結果をクリア
  },[mode])


  return (
    <div className="searchContainer">

      <ModeSwitcherNav handleClick={setMode} modelist={modelist} activeMode={mode}/>

      <div className="searchWrapper" >
        <div className="searchInputWrapper">
            <input
            className="searchInput"
            type="text"
            placeholder={`${mode === "user" ? "ユーザーを検索" : "クラブを検索"}  タグのみで検索する場合はスペースキーを押してください`}
            value={searchTerm}
            onChange={(e) => {
                handleInputChange(e);
              }}
            />         
        </div>
      </div>

      <div className="tagFilter">
        <span>タグ一致検索:</span><button className="search-mode-button" onClick={()=>{settagSearch((prev)=>!prev);setInterestingTags([])}}>{tagSearch? "ON" : "OFF"}</button>
        {
          tagSearch &&
          (
            <TagManager
            alreddyInteretedTags={IntersetingTags}
            onRemove={removeTag}
            newTagInput={newTagInput}
            setNewTagInput={setNewTagInput}
            addTag={addNewTag}
            selectedTags={selectedTags}
            toggleSuggestedTag={toggleTag}
            suggestedTags={suggestedTags}
            handleTagSuggestionByInputChange ={handleTagSuggestionByInputChange }
        />
          )
        }
      </div>

      <div className="search-results">
        {mode === "user" &&  userResults.length > 0 && userResults.map((user) => (
             <Usercard
             key={user._id} 
             user={user} 
             page="Search"/>
        ))}

        {mode === "club" && clubResults.length > 0 && clubResults.map((club) => (
             <ClubDetailsTab key={club._id} club={club}/>
        ))}
      </div>
    </div>
    
  );
}

export default Search;