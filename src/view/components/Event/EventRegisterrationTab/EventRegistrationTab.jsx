import React, { useEffect, useState } from "react";
import "./EventRegisterationTab.css";
import { createEvent } from "../../../../model/httpApiCrients/eventApiClient";
import TagManager from "../../Edditer/TagManeger/TagManeger"
import { useTagManeger } from "../../../../controller/useTagManeger";

const EventRegistrationTab = ({club,setClub}) => {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventDescription, setEventDescription] = useState("");

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
  =useTagManeger({club,edditType:"event-creaction"})



  const handleRegisterEvent = async() => {
    if (!eventName ) {
      alert("すべての必須フィールドを入力してください");
      return;
    }
   
    const eventData={
      clubId: club._id,
      name: eventName,
      location: eventLocation,
      description: eventDescription,
      date:eventDate,
      tags:IntersetingTags.map((tag)=>tag.name ? tag.name :tag)
    }

    console.log("イベントデータ",eventData)

    try{
      const {club,event} = await createEvent(eventData)
      console.log("登録されたイベント",event)
      window.alert("イベントが登録されました")
    }catch(e){
      console.log(e)
    }
    setEventName("");
    setEventDate("");
    setEventLocation("");
    setEventDescription("");
  };

  return (
    <div className="event-registration-tab">
      <h2>イベント登録</h2>
      <form className="event-form">
        <label>
          イベント名 <span className="required">*</span>
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            placeholder="イベント名を入力"
          />
        </label>
        <label>
          日時 
          <input
            type="datetime-local"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
          />
        </label>
        <label>
          場所 
          <input
            type="text"
            value={eventLocation}
            onChange={(e) => setEventLocation(e.target.value)}
            placeholder="場所を入力"
          />
        </label>
        <label>
          タグ 
          <TagManager
            alreddyInteretedTags={IntersetingTags}
            onRemove={removeTag}
            newTagInput={newTagInput}
            setNewTagInput={setNewTagInput}
            addTag={addNewTag}
            selectedTags={selectedTags}
            toggleSuggestedTag={toggleTag}
            suggestedTags={suggestedTags}
            handleTagSuggestionByInputChange ={handleTagSuggestionByInputChange}
          />
        </label>
        <label>
          詳細説明
          <textarea
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            placeholder="詳細説明を入力"
          />
        </label>
        <button type="button" onClick={handleRegisterEvent}>
          登録
        </button>
      </form>
    </div>
  );
};

export default EventRegistrationTab;
