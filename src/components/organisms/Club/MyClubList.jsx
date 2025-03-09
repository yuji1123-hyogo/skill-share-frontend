import React, { useState } from "react";
import ClubCard from "./ClubCard/ClubCard";
import Pagination from "../../molecules/Pagination";
import { useGetUserClubsQuery } from "../../../features/RTKQuery/apiSlice";
import LoadingIndicator from "../../atoms/loading/LoadingIndicator";

const CLUBS_PER_PAGE = 10;

const MyClubList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error, isLoading } = useGetUserClubsQuery();

  if (isLoading) return <LoadingIndicator message="クラブ一覧を読み込んでいます..." />;
  if (error) return (
    <div className="text-red-500 bg-red-500/10 p-4 rounded-lg">
      クラブ一覧の取得に失敗しました
    </div>
  );
  if (!data?.clubIdList.length) return (
    <div className="text-center py-8">
      <p className="text-gray-400 italic">参加中のクラブがありません</p>
    </div>
  );

  const totalPages = Math.ceil(data.clubIdList.length / CLUBS_PER_PAGE);
  const startIndex = (currentPage - 1) * CLUBS_PER_PAGE;
  const currentClubs = data.clubIdList.slice(startIndex, startIndex + CLUBS_PER_PAGE);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        {currentClubs.map((clubId) => (
          <ClubCard key={clubId} clubId={clubId} />
        ))}
      </div>
      
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default MyClubList;
