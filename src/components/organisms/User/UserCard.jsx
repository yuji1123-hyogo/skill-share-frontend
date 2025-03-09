import React from "react";
import { useGetPublicUserQuery } from "../../../features/RTK/RTKQuery/apiSlice";
import LoadingIndicator from "../../atoms/loading/LoadingIndicator";


const UserCard = ({ targetUserId }) => {
  const { data: userData, error, isLoading } = useGetPublicUserQuery(targetUserId);
  if (isLoading) return (
    <LoadingIndicator message="ユーザー情報を読み込んでいます..." />
  );
  if (error) return (
    <ErrorMessage message={error.message} />
  );


  return (
    <UserCardPresentation
      userData={userData}
      targetUserId={targetUserId}
    />
  );
};

export default UserCard;
