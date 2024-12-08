import React from "react";
import Tag from "../../../parts/Tag/Tag"
import './TagManeger.css'

const TagManager = ({ 
  alreddyInteretedTags, 
  onRemove, 
  newTagInput, 
  setNewTagInput, 
  addTag,
  selectedTags,
  toggleSuggestedTag,
  suggestedTags,
  handleTagSuggestionByInputChange,
}) => {


  return (
    <div className="tag-manager">
       {/* すでに追加済みのタグ（興味のあるタグ） */}
      <div className="interesting-tags">
        <h4>興味のあるタグ:</h4>
        <div className="interesting-tags-wrapper">
            {alreddyInteretedTags.length >0 &&
            alreddyInteretedTags.map((tag) => (
            <Tag
                key={tag._id ? tag._id : tag} 
                tag={tag}
                onClick={() => onRemove(tag)}
                className="tag-button-interesting"
                type={"interesting-tag"}
            />
            ))}
        </div>
      </div>

      {/* タグの手動入力と選択されたタグのコミット*/}
      <div className="add-tags">
        <h4>タグを入力:</h4>
        <div className="add-tag-wrapper">
            <input
            type="text"
            value={newTagInput}
            onChange={(e) => handleTagSuggestionByInputChange(e)}
            placeholder="新しいタグを入力or下の候補から選択して追加"
            className="add-tag-input"
            />
            <button className="add-tag-button" type="button" onClick={addTag}>追加</button>
        </div>
      </div>

      {/* タグの提案とステージング */}
      <div className="suggested-tags">
        <h4>もしかして？:</h4>
          {
            suggestedTags.length > 0 &&
            (
              <div className="suggested-tags-wrapper">
              {
              suggestedTags.map((tag) => (
                <>
                  <Tag
                  key={tag._id ? tag._id :tag}
                  tag={tag}
                  className={`suggested-tag ${
                  selectedTags.includes(tag) ? "selected" : ""
                  }`}
                  onClick={() => toggleSuggestedTag(tag)}
                  type={"suggested-tag"}
                  />
                </>
              ))}
              </div>
            )
          }
      </div>
    
        {/* 選択中のタグ */}

        <div className="selected-tags">
          <h4>選択中のタグ:</h4>
          <div className="tags-wrapper">
            {selectedTags.length > 0 
            ? (selectedTags.map((tag) => (<span key={tag} className="selected-tag">{tag}</span>))) 
            : (<p>選択中のタグはありません。</p>)}
          </div>
        </div>

    </div>
  );
};

export default TagManager;