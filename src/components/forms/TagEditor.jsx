import React from "react";
import { useTagEditorState } from "../../hooks/tag/useTagEditorState";

//親コンポーネントの選択済みタグを変更ロジックを実行するためのコンポーネント
const TagEditor = ({ selectedTags = [], setSelectedTags}) => {
  const { 
    tagQuery, 
    setTagQuery, 
    suggestedTags, 
    tagSearchError, 
    onAddTag, 
    onRemoveTag, 
    onManualAddTag 
  } = useTagEditorState({ selectedTags, setSelectedTags });

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="タグを検索または新規タグを追加"
          value={tagQuery}
          onChange={(e) => setTagQuery(e.target.value)}
          className="flex-1 px-4 py-2 bg-dark-primary border border-dark-accent rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={onManualAddTag}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          タグを追加
        </button>
      </div>

      {tagSearchError && (
        <p className="text-red-500 text-sm">{tagSearchError}</p>
      )}

      {suggestedTags.length > 0 && (
        <div className="bg-dark-primary p-4 rounded-lg border border-dark-accent">
          <h3 className="text-gray-200 font-medium mb-2">提案されたタグ:</h3>
          <ul className="flex flex-wrap gap-2">
            {suggestedTags.map((tag) => (
              <li
                key={tag}
                onClick={() => onAddTag(tag)}
                className="px-3 py-1 bg-dark-accent text-gray-300 rounded-full cursor-pointer hover:bg-gray-600 transition-colors duration-200"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedTags.length > 0 && (
        <div className="bg-dark-primary p-4 rounded-lg border border-dark-accent">
          <h3 className="text-gray-200 font-medium mb-2">追加済みのタグ:</h3>
          <div className="flex flex-wrap gap-2">
            {selectedTags.map((tag) => (
              <span
                key={tag}
                onClick={() => onRemoveTag(tag)}
                className="group px-3 py-1 bg-blue-600 text-white rounded-full cursor-pointer hover:bg-blue-700 transition-colors duration-200 flex items-center gap-1"
              >
                {tag}
                <span className="text-white/70 group-hover:text-white">✕</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TagEditor;
