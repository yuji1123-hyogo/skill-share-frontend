import React, { useEffect, useState } from "react";
import "./EditForm.css";
import TagManager from "../TagManeger/TagManeger";
import { useTagManeger } from "../../../../controller/useTagManeger";
import { useSelector } from "react-redux";
import EdditConfirmation from "../EdditConfirmation/EdditConfirmation";
import BasicInformationEdditer from "../BasicInformationEdditer/BasicInformationEdditer";


const EditForm = ({ edditType, club ,setClub}) => {
  const currentUser = useSelector((state) => state.user);

  useEffect(()=>{
    console.log("編集対象のクラブ",club)
  },[])
  // 必須項目のステート
  const [name, setName] = useState(
    edditType === "user-update"  && currentUser.username ||
    edditType === "club-update"  && club.name || "");
  const [bio, setBio] = useState(
    edditType === "user-update"  && currentUser.bio ||
    edditType === "club-update"  && club.description || "");
  const [date, setDate] = useState("");

  // その他のステート
  const [errors, setErrors] = useState({});
  const [isEdditConfirmation, setIsEdditConfirmation] = useState(false);

  const [image,setImage] = useState("")

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
    handleTagSuggestionByInputChange,
  } = useTagManeger({
    edditType,
    club,
    currentUser
  });

  // バリデーション
  const validateFields = () => {
    let validationErrors = {};
    if (edditType === "club-creation" || edditType === "club-update") {
      if (!name || name.trim() === "") validationErrors.name = "クラブ名は必須です";
      if (!IntersetingTags || IntersetingTags.length === 0) validationErrors.IntersetingTags = "タグは必須です";
    }
    if (edditType === "event-creation") {
      if (!name || name.trim() === "") validationErrors.name = "イベント名は必須です";
      if (!IntersetingTags || IntersetingTags.length === 0) validationErrors.IntersetingTags = "タグは必須です";
    }
    if (edditType === "user-update") {
      if (!name || name.trim() === "") validationErrors.name = "名前は必須です";
    }
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  // 保存ボタンのハンドラ
  const handleSave = () => {
    if (validateFields()) {
      setIsEdditConfirmation(true);
    }
  };

  return (
    <>
      <h3 style={{textAlign:"center"}}>EdditType:{edditType}</h3>
      {isEdditConfirmation ? (
        <EdditConfirmation
          image={image}
          name={name}
          bio={bio}
          tags={IntersetingTags}
          date={date}
          isEdditConfirmation={isEdditConfirmation}
          setIsEdditConfirmation={setIsEdditConfirmation}
          edditType={edditType}
          club={club}
          setClub={setClub}
        />
      ) : (
        <div className="club-creation-form">
          <BasicInformationEdditer
            setImage={setImage}
            image={image}
            club={club}
            name={name}
            setname={setName}
            bio={bio}
            setBio={setBio}
            date={date}
            setDate={setDate}
            edditType={edditType}
          />
          <TagManager
            alreddyInteretedTags={IntersetingTags}
            onRemove={removeTag}
            newTagInput={newTagInput}
            setNewTagInput={setNewTagInput}
            addTag={addNewTag}
            selectedTags={selectedTags}
            toggleSuggestedTag={toggleTag}
            suggestedTags={suggestedTags}
            handleTagSuggestionByInputChange={handleTagSuggestionByInputChange}
          />
          {Object.keys(errors).length > 0 && (
            <div className="error-container">
              {Object.values(errors).map((error, index) => (
                <span key={index} className="error-message" style={{color:"red",margin:"0px 3px"}}>
                  {error}
                </span>
              ))}
            </div>
          )}
          <button className="eddit-save-button" onClick={handleSave}>
            保存
          </button>
        </div>
      )}
    </>
  );
};

export default EditForm;

