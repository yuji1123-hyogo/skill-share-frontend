import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { searchUsersAPI } from "../../api/clients/userApi";
import { searchClubsAPI } from "../../api/clients/clubApi";
import { useDispatch } from 'react-redux';
import { setSearchTags } from '../../features/RTK/searchTagsSlice';

export const useSearch = ({ searchMode = "user-search", setSearchResults }) => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTagList, setSelectedTagList] = useState([]);
  const [isSearchLoading, setIsSearchLoading] = useState(false); // ✅ ローディング状態
  const [searchError, setSearchError] = useState(null); // ✅ エラーメッセージ
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300); // ✅ 300ms デバウンス

  const fetchResults = async () => {
    setIsSearchLoading(true);
    setSearchError(null);

    try {
      const params = searchMode === "user-search"
        ? { username: debouncedSearchTerm, tags: selectedTagList }
        : { name: debouncedSearchTerm, tags: selectedTagList };

      const responsedata = searchMode === "user-search"
        ? await searchUsersAPI(params)
        : await searchClubsAPI(params);

      //実装予定:検索成功時にグローバル状態に選択済みのタグを追加⇒sortControlの選択肢に＆並び替え処理をトリガー⇒useTagSortで並び替え処理を実行
      // dispatch(addSelectedTags(selectedTagList));
      if (selectedTagList.length > 0) {
        dispatch(setSearchTags(selectedTagList));
      }
      console.log("response.data",responsedata)
      setSearchResults(responsedata.userSearchList || responsedata.clubSearchList || []);
    } catch (err) {
      console.error("検索エラー:", err);
      setSearchError(err.message || "検索に失敗しました。時間をおいて再試行してください。");
      setSearchResults([]);
    } finally {
      setIsSearchLoading(false);
    }
  };

  useEffect(() => {
    if (!debouncedSearchTerm && selectedTagList.length === 0) {
      setSearchResults([]); // 🔹 検索条件が空ならリセット
      return;
    }
    fetchResults();
  }, [debouncedSearchTerm, selectedTagList, searchMode]);

  return { 
    searchTerm, 
    setSearchTerm, 
    selectedTagList, 
    setSelectedTagList,
    isSearchLoading,  // ✅ ローディング状態を返す
    searchError       // ✅ エラー情報を返す
  };
};

 
