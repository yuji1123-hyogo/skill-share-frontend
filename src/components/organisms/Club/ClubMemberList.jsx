import React from "react";
import UserCard from "../User/UserCard";


const ClubMenberList = ({ members }) => {
  return (
    <div className=" p-6 space-y-6">
      <h2 className="text-xl font-bold text-gray-200">メンバー一覧</h2>
      <div className="space-y-4">
        {members.length > 0 ? (
          members.map((member) => (
            <div key={member.id} className=" p-4">
              <UserCard targetUserId={member.id} />
            </div>
          ))
        ) : (
          <p className="text-gray-400 italic">メンバーがいません</p>
        )}
      </div>
    </div>
  );
};

export default ClubMenberList;
