import React, { useState } from "react";
import { useParams } from "react-router-dom";

import ClubDetailTemplate from "../components/templates/ClubDetailTemplate";
import { useGetClubDetailQuery } from "../features/RTKQuery/apiSlice";


const ClubDetailPage = () => {
  const { clubId } = useParams();
  const { data, isLoading, error } = useGetClubDetailQuery(clubId);

  
  if (isLoading) return <p>ローディング中...</p>;
  if (error) return <p>エラーが発生しました: {error.message}</p>;

  console.log("clubdeteal:",data.club)
  return (
    <ClubDetailTemplate
      clubDetail={data.club} 
    />
  );
};

export default ClubDetailPage;
