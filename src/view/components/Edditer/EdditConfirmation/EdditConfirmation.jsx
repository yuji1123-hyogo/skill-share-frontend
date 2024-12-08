import React, { useMemo } from "react";
import "./EdditConfirmation.css";
import { useDispatch, useSelector } from "react-redux";
import { createClub, updateClub } from "../../../../model/httpApiCrients/clubApiClient";
import { updateProfileActionCreater } from "../../../../model/redux/currentUserSlice";
import { createEvent } from "@testing-library/react";

function EdditConfirmation({
  preview,
  image,
  name,
  bio,
  tags,
  isEdditConfirmation,
  setIsEdditConfirmation,
  date,
  edditType,
  club,
  setClub
}) {
  const currentUser = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // 変更前の情報を取得
  const oldProfileBaseInfo =
    (edditType === "club-creation" && {
      name: "",
      description: "",
      tags: [],
    }) ||
    (edditType === "club-update" && {
      name: club.name,
      description: club.description || "",
      tags: club.tags || [],
    }) ||
    (edditType === "user-update" && {
      username: currentUser.username,
      bio: currentUser.bio || "",
      tags: currentUser.hobbies || [],
    }) ||
    (edditType === "event-creation" && {
      name: "",
      description: "",
      tags: [],
      clubId: "",
      date: "",
    });

  // 変更後の情報を取得
  const newProfileBaseinfo =
    (edditType === "club-creation" && {
      name: name,
      description: bio || "",
      tags: tags || [],
      themeImage: image || ""
    }) ||
    (edditType === "club-update" && {
      name: name,
      description: bio || "",
      tags: tags || [],
    }) ||
    (edditType === "user-update" && {
      username: name,
      bio: bio || "",
      hobbies: tags || [],
    }) ||
    (edditType === "event-creation" && {
      name: name,
      description: bio || "",
      tags: tags || [],
      clubId: club._id,
      date: date || new Date().toISOString(),
    });

  // 変更の保存
  const onSave = async () => {
    try {
      switch (edditType) {
        case "club-creation":
          try {
            const result = await await createClub(newProfileBaseinfo);
            // result.meta.requestStatusで状態を確認
            if (result) {
                window.alert("クラブの作成に成功しました");
              } 
           }catch (e) {
            console.error("予期しないエラーが発生しました:", e);
            window.alert("予期しないエラーが発生しました");
           }

          break;

        case "club-update":
          const resdata = await updateClub(club._id, newProfileBaseinfo);
          setClub(resdata)
          window.alert("クラブの更新に成功しました");
          break;
          
        case "user-update":
          try {
            const result = await dispatch(updateProfileActionCreater(newProfileBaseinfo));
            // result.meta.requestStatusで状態を確認
            if (result.meta.requestStatus === "fulfilled") {
                window.alert("ユーザー情報のアップデートに成功しました");
            } else {
                // result.payloadはrejectWithValueで返された値
                window.alert(`エラー: ${result.payload}`);
            }
        } catch (e) {
            console.error("予期しないエラーが発生しました:", e);
            window.alert("予期しないエラーが発生しました");
        }
          break;
      }
    } catch (e) {
      console.error(e);
      alert("エラーが発生しました。もう一度お試しください。");
    }
    setIsEdditConfirmation(false);
  };

  // フィールド変更の検出
  const isChanged = (field) => {
    if (field === "tags") {
      return JSON.stringify(oldProfileBaseInfo.tags) !== JSON.stringify(newProfileBaseinfo.tags);
    }
    return oldProfileBaseInfo[field] !== newProfileBaseinfo[field];
  };

  // 変更されたタグ
  const changedTags = 
    newProfileBaseinfo.hobbies && newProfileBaseinfo.hobbies.filter((tag) => !oldProfileBaseInfo.tags.includes(tag)) ||
    newProfileBaseinfo.tags && newProfileBaseinfo.tags.filter((tag) => !oldProfileBaseInfo.tags.includes(tag)) 

  const afterEdditTags = newProfileBaseinfo.hobbies || newProfileBaseinfo.tags;

  // 表示項目
  return (
    <div className="profile-change-confirmation">
      <h2 className="title">変更の確認</h2>

      <div className="change-items">
        {/* 名前またはクラブ名 */}

        {(edditType === "club-creation" || edditType === "club-update" || edditType === "user-update") && (
          <div className={`change-item ${isChanged("name") ? "changed" : ""}`}>
            <h3 className="item-title">
              {edditType === "club-creation" || edditType === "club-update" ? "クラブ名" : "名前"}
            </h3>
            <p className="item-old">変更前: <span>{oldProfileBaseInfo.name || oldProfileBaseInfo.username}</span></p>
            <p className="item-new">変更後: <span>{newProfileBaseinfo.name || newProfileBaseinfo.username}</span></p>
          </div>
        )}

        {/* 概要 */}
        {edditType === "user-update" ? 
          (<div className={`change-item ${isChanged("bio") ? "changed" : ""}`}>
            <h3 className="item-title">{edditType === "user-update" ? "自己紹介" :"概要"}</h3>
            <p className="item-old">変更前: <span>{oldProfileBaseInfo.bio}</span></p>
            <p className="item-new">変更後: <span>{newProfileBaseinfo.bio}</span></p>
           </div>):(
          <div className={`change-item ${isChanged("description") ? "changed" : ""}`}>
            <h3 className="item-title">{edditType === "user-update" ? "自己紹介" :"概要"}</h3>
            <p className="item-old">変更前: <span>{oldProfileBaseInfo.description || oldProfileBaseInfo.bio}</span></p>
            <p className="item-new">変更後: <span>{newProfileBaseinfo.description || newProfileBaseinfo.bio}</span></p>
          </div>
           )
        }

        {/* タグ */}
        {(edditType === "club-creation" || edditType === "club-update" || edditType === "user-update" || edditType === "event-creation") && (
          <div className={`change-item ${isChanged("tags") ? "changed" : ""}`}>
            <h3 className="item-title">タグ</h3>
            <p className="item-old">変更前: {oldProfileBaseInfo.tags.map((tag) => (
              <span className="eddit-confirmation-tag" key={tag}>{tag.name || tag}</span>
            ))}</p>
            <p className="item-new">変更後: {
            afterEdditTags.map((tag) => (
              <span
                className={`eddit-confirmation-tag ${changedTags.includes(tag) ? "changed" : ""}`}
                key={tag}
              >
                {tag.name || tag}
              </span>
            ))}</p>
          </div>
        )}

        {/* イベント専用項目 */}
        {edditType === "event-creation" && (
          <>
            {/* イベントの日付 */}
            <div className={`change-item ${isChanged("date") ? "changed" : ""}`}>
              <h3 className="item-title">日時</h3>
              <p className="item-old">変更前: <span>{oldProfileBaseInfo.date}</span></p>
              <p className="item-new">変更後: <span>{newProfileBaseinfo.date}</span></p>
            </div>

          </>
        )}
      </div>

      <div className="action-buttons">
        <button className="save-button" onClick={onSave}>変更を確定する</button>
        <button className="cancel-button" onClick={() => { setIsEdditConfirmation(false); }}>キャンセル</button>
      </div>
    </div>
  );
}

export default EdditConfirmation;
