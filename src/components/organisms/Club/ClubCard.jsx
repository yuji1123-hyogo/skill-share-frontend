import React from "react";
import TagList from "../../molecules/TagList";
import ClubCardActionButtons from "./ClubCardActionButtons";
import { useGetClubDetailQuery } from "../../../features/RTKQuery/apiSlice";


const ClubCard = ({ clubId }) => {
  const { data, error, isLoading } = useGetClubDetailQuery(clubId);

  if (isLoading) return (
    <div className="animate-pulse bg-dark-secondary rounded-lg h-[28rem]"></div>
  );
  
  if (error || !data.club) return (
    <div className="bg-dark-secondary rounded-lg p-6 text-red-500">
      クラブ情報の取得に失敗しました
    </div>
  );

  console.log("再レンダリング in clubCard")

  return (
    <div className="bg-dark-secondary rounded-lg shadow-lg overflow-hidden border border-dark-accent hover:border-blue-500/50 transition-all duration-300 h-[28rem] group">
      {/* 画像セクション */}
      <div className="h-48 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transform transition-transform duration-300 group-hover:scale-105"
          style={{ backgroundImage: `url(${data.club.themeImage || '/logo192.png'})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent" />
      </div>
      
      {/* コンテンツセクション */}
      <div className="p-6 flex flex-col h-[calc(28rem-12rem)]">
        {/* ヘッダー */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-200 mb-2">{data.club.name}</h3>
          <p className="text-gray-400 text-sm line-clamp-2">{data.club.description}</p>
        </div>
        
        {/* タグ */}
        <div className="mb-4">
          <TagList tags={data.club.tags} variant="compact" />
        </div>
        
        {/* メンバー */}
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-xs text-gray-400">メンバー</span>
          <div className="flex -space-x-2">
            {data.club.members.slice(0, 5).map((member) => (
              <img
                key={member.id}
                src={member.profilePicture || '/logo192.png'}
                alt={member.username}
                className="w-6 h-6 rounded-full border-2 border-dark-secondary transform transition-transform duration-200 hover:scale-110 hover:z-10"
                title={member.username}
              />
            ))}
            {data.club.members.length > 5 && (
              <div className="w-6 h-6 rounded-full bg-dark-accent/80 backdrop-blur-sm flex items-center justify-center text-xs text-white border-2 border-dark-secondary">
                +{data.club.members.length - 5}
              </div>
            )}
          </div>
        </div>
        
        {/* アクションボタン */}
        <div className="mt-auto pt-4 border-t border-dark-accent">
          <ClubCardActionButtons clubId={clubId} members={data.club.members} />
        </div>
      </div>
    </div>
  );
};

export default ClubCard;
