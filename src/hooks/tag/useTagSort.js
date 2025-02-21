import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectSearchTags } from '../../features/RTK/searchTagsSlice';

export const useTagSort = (searchResults) => {
  //並び替え後の検索結果:最終的にはこれを使ってユーザーカードまたはクラブカードを表示
  const searchTags = useSelector((state)=> state.searchTags?.searchTags);
  const [sortedItems, setSortedItems] = useState(searchResults || []);
  //昇順/降順の切り替え
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc' | 'desc'
  //並び替え基準
  //useSelectorでselectedtagを取得したのちsortcontrolで選択したタグをセット
  const [sortingTag, setSortingTag] = useState(''); // 空文字は全タグの合計を表す



  // タグによるソートが可能かどうかを判定
  const sortDisabled = !searchTags.length || !searchResults.length;

  //タグスコアの計算
  const calculateTagScore = (tags, targetTag = '') => {
    if (!tags) return 0;
    
    if (targetTag) {
      // 特定のタグでソート
      const matchingTag = tags.find(t => t.name === targetTag);
      return matchingTag ? matchingTag.level : 0;
    } else {
      // 全選択タグの合計でソート
      return searchTags.reduce((score, tagName) => {
        const matchingTag = tags.find(t => t.name === tagName);
        return score + (matchingTag ? matchingTag.level : 0);
      }, 0);
    }
  };
  //並び替え処理
  const sortItems = (items, order, tag) => {
    if (items.length === 0) return [];
    console.log("ソート時の各情報",items,order,tag)
    return [...items].sort((a, b) => {
      const scoreA = calculateTagScore(a.tags, tag);
      const scoreB = calculateTagScore(b.tags, tag);
      return order === 'desc' ? scoreB - scoreA : scoreA - scoreB;
    });
  };

  useEffect(()=>{

    //並び替え処理の実行
    const sorted = sortItems(searchResults,sortOrder,sortingTag);
    console.log("sorted",sorted)
    setSortedItems(sorted);
  },[searchResults, sortOrder, sortingTag, searchTags])



  return {
    sortedItems,
    sortOrder,
    setSortOrder,
    sortingTag,
    setSortingTag,
    sortDisabled,
    candidateTags: searchTags, // SortControlに渡す並び替え可能なタグリスト
  };
}; 