import React, { useState } from "react";
import "./BasicInformationEdditer.css";
import { useSelector } from "react-redux";
import Picture from "../../../parts/Picture/Picture";

function BasicInformationEdditer({
  setImage,image,
  name, setname,
  bio, setBio,
  date, setDate,
  club,
  edditType,
}) {


  const currentUser = useSelector((state) => state.user);



  return (
    <div className="Basic-information-edditer">
      <h2 className="edditered-title">
        {edditType === "club-creation" && "クラブ作成"}
        {edditType === "club-update" && "クラブ更新"}
        {edditType === "user-update" && "ユーザー情報更新"}
        {edditType === "event-creation" && "イベント作成"}
      </h2>

      {/* プロフィール画像 */}
      <Picture parts={"Information-editer"} edditable={true} edditType={edditType} club={club} setImage={setImage} image={image}/>


      {/* 名前 */}
      <div className="form-group">
        <label htmlFor="username">
          {edditType === "club-creation" || edditType === "club-update" ? "クラブ名" : "名前"}
        </label>
        <input
          type="text"
          id="username"
          value={name}
          onChange={(e) => setname(e.target.value)}
          placeholder={
            edditType === "club-creation" || edditType === "club-update"
              ? "クラブ名を入力"
              : "名前を入力"
          }
        />
      </div>

      {/* 概要 */}
      {(edditType === "club-creation" || edditType === "club-update" || edditType === "user-update") && (
        <div className="form-group">
          <label htmlFor="bio">
            {edditType === "user-update" ? "自己紹介" : "クラブの概要"}
          </label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder={
              edditType === "user-update"
                ? "自己紹介を入力してください"
                : "クラブの概要を入力"
            }
          ></textarea>
        </div>
      )}

      {/* イベント専用項目 */}
      {edditType === "event-creation" && (
        <>
          <div className="form-group">
            <label htmlFor="date">日時</label>
            <input
              type="datetime-local"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="日時を入力"
            />
          </div>
        </>
      )}

    </div>
  );
}

export default BasicInformationEdditer;
