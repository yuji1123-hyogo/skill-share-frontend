import { useState } from "react";
import { fetchExistTagMatchedInput } from "../model/httpApiCrients/searchApiCrient";

export const useTagManeger=({
  edditType,
  club,
  currentUser
} = {})=>{
    
    const mode = 
      (edditType === "club-creation" || edditType === "club-update" ) && "club" ||
       "user" 
    const initialInterestTags = 
      (edditType === "club-creation" ||edditType === "user-update") && currentUser?.hobbies ||
      (edditType === "club-update"||edditType === "event-creaction") && club?.tags


    const [IntersetingTags, setInterestingTags] = useState(initialInterestTags ||  ["default"]);
    const [newTagInput, setNewTagInput] = useState("");
    const [suggestedTags, setSuggestedTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [suggestTimeOutId,setSuggestTimeOutId] = useState(null)//おすすめタグのデバウンス


      // タグ選択処理
      const toggleTag = (tag) => {
          if(!selectedTags.includes(tag)){
            setSelectedTags((prevTags) =>[...prevTags, tag]);
          }else{
            setSelectedTags(selectedTags.filter((t)=> t !== tag ))
          }
        };

        //提案タグの提案
  const handleTagSuggestionByInputChange = async(event)=>{

    const inputVal = event.target.value 
    setNewTagInput(inputVal);
    //すでに起動中の同処理を破棄
    if (suggestTimeOutId) {
      clearTimeout(suggestTimeOutId);
    }

    const newSuggestTimeoutId = setTimeout(async () => {
      if (inputVal.length > 0) {
        try{
          const res = await fetchExistTagMatchedInput(inputVal,mode)
          setSuggestedTags(res)
        }catch(e){
          console.log(e)

        }
      } else {
        setSuggestedTags([]);
      }
    }, 600);
    console.log("suggestedtags",suggestedTags)
    setSuggestTimeOutId(newSuggestTimeoutId);
  }


  
      const addNewTag = () => {
          
          // 新しい手動タグを「興味のあるタグ」に追加
          // 手動入力の新しいタグが空白のみの場合は無視
          if (newTagInput.trim() === "" && selectedTags.length === 0) {
            alert("空のタグは追加できません");
            return;
          }
      
          // 新しい手動タグを「興味のあるタグ」に追加
          if (selectedTags.length === 0 && newTagInput.trim() !== "") {
            if (!IntersetingTags.includes(newTagInput)) {
              setInterestingTags((prevTags) => [...prevTags, newTagInput]);
            }
          }
      
          // 提案タグから選択されたものを「興味のあるタグ」に追加
          const newTagsFromSelected = selectedTags.filter(
            (selected) => !IntersetingTags.includes(selected)
          );
      
          setInterestingTags((prevTags) => [...prevTags, ...newTagsFromSelected]);
      
          setSelectedTags([]);
          setNewTagInput("");
        };
      
      const removeTag = (tag) => {
          setInterestingTags((prevTags) => prevTags.filter((t) => t !== tag));
        };

        return {
            setInterestingTags,
            suggestedTags,
            IntersetingTags,
            newTagInput,
            setNewTagInput,
            selectedTags,
            toggleTag,
            addNewTag,
            removeTag,
            setSuggestedTags,
            handleTagSuggestionByInputChange,
            setSuggestTimeOutId,
            suggestTimeOutId
          };
}