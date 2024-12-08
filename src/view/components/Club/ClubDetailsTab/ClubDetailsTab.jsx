import React, { useEffect, useState } from "react";
import "./ClubDetailsTab.css";
import { useSelector } from "react-redux";
import { joinClub } from "../../../../model/httpApiCrients/clubApiClient";
import Tag from "../../../parts/Tag/Tag";
import Usercard from "../../PrimaryComponents/Usercard/Usercard";

const ClubDetailsTab = ({ club }) => {
  const currentUserId = useSelector((state) => state.user.userId);
  const currentUsername = useSelector((state) => state.user.username); 
  const [clubDetails, setClubDetails] = useState(club); // クラブの状態を管理
  const [isJoined, setIsJoined] = useState(false);


  // 初期参加状態を確認 
  useEffect(() => {
    console.log(clubDetails)
    if (
      clubDetails.members.map((member) => member._id).includes(currentUserId)
    ) {
      setIsJoined(true);
    }
  }, [clubDetails.members, currentUserId]);

  // クラブ参加ハンドラー
  const handleJoin = async () => {
    try {
      const res = await joinClub(clubDetails._id); 
      alert(res.message);

      // 新しい参加者をクラブ情報に追加
      const updatedMembers = [
        ...clubDetails.members,
        { _id: currentUserId, username: currentUsername },
      ];

      // クラブ情報を更新
      setClubDetails({ ...clubDetails, members: updatedMembers });
      setIsJoined(true);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="club-details-tab">
      <h2>クラブ詳細</h2>
      {!clubDetails ? (
        <p>クラブ情報を読み込んでいます...</p>
      ) : (
        <div className="club-details">
          <p>
            <strong>クラブ名:</strong> {clubDetails.name}
          </p>
          <p>
            <strong>作成日:</strong>{" "}
            {new Date(clubDetails.createdAt).toLocaleDateString()}
          </p>
          <p>
            <strong>説明:</strong>{" "}
            {clubDetails.description || "説明はありません。"}
          </p>
          <p>
            <strong>管理者:</strong>{" "}
            {clubDetails.members[0] ? clubDetails.members[0].username : ""}
          </p>
          <div className="club-deteal-tag">
            <strong>タグ:</strong>{" "}
            {clubDetails.tags.map((tag) => (
              <Tag key={tag._id ? tag._id : tag} tag={tag} />
            ))}
          </div>
          <p>
            <strong>参加者:</strong>{" "}
            {clubDetails.members.map((member) =>member.username).join(", ")}
          </p>

          <div>
            {!isJoined && (
              <button onClick={handleJoin}>クラブに参加する</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClubDetailsTab;

