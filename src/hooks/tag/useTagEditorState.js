import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { searchTagsAPI } from "../../api/clients/tagApi";

//親コンポーネントの選択済みタグを変更方法を定義するためのカスタムフック。このフック自体には選択済みタグの状態を持たない
export const useTagEditorState = ({ selectedTags = [], setSelectedTags }) => {
  const [suggestedTags, setSuggestedTags] = useState([]);
  const [tagSearchError, setTagSearchError] = useState(null);

  const [tagQuery, setTagQuery] = useState("");
  const [debouncedQuery] = useDebounce(tagQuery, 300);

  // ✅ タグの検索処理
  useEffect(() => {
    const fetchSuggestedTags = async () => {
      if (debouncedQuery.length < 2) {
        setSuggestedTags([]);
        return;
      }
      try {
        const { tags } = await searchTagsAPI(debouncedQuery);
        setSuggestedTags(tags);
        setTagSearchError(null);
      } catch (error) {
        console.error("タグの検索に失敗しました", error);
        setTagSearchError("タグの検索に失敗しました");
      }
    };

    fetchSuggestedTags();
  }, [debouncedQuery]);

  // ✅ タグの追加処理(整形はバックエンドで行うためstring[]のまま)
  const onAddTag = (tag) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags((prev) => [...prev, tag]);
    }
    setSuggestedTags((prev) => prev.filter((t) => t !== tag));
    setTagQuery("")
  };

  const onRemoveTag = (tag) => {
    setSelectedTags((prev) => prev.filter((t) => t !== tag));
  };

  // ✅ 手動でタグを追加する処理
  const onManualAddTag = () => {
    if (tagQuery.trim() && !selectedTags.includes(tagQuery.trim())) {
      setSelectedTags((prev) => [...prev, tagQuery.trim()]);
    }
    setTagQuery(""); // ✅ 入力フィールドをリセット
    console.log("selectedTags", selectedTags);
  };

  return {
    tagQuery,
    setTagQuery,
    selectedTags,
    suggestedTags,
    tagSearchError,
    onAddTag,
    onRemoveTag,
    onManualAddTag,
  };
};
