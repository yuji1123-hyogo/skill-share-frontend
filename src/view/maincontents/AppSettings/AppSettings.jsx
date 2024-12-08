import React, { useRef, useState } from "react";
import "./AppSettings.css";
import { useDispatch, useSelector } from "react-redux";
import { updateValidate } from "../../../model/utils/validation/updateValidate";
import { updateProfileApiCrient } from "../../../model/httpApiCrients/userApiCrient";
import { updateProfileActionCreater } from "../../../model/redux/currentUserSlice";
import Tag from "../../parts/Tag/Tag";
import EditForm from "../../components/Edditer/EditForm/EditForm";


//タグ選択フロー
//タグの入力＋追加ボタン⇒興味のあるタグに追加
//もしかしての選択＋追加ボタン⇒興味のあるタグに追加
//「タグの入力」または「もしかしてで選択」されたものを選択済みにステージング
//「追加ボタン」で興味のあるタグにコミット

//ユーザー情報更新フロー
//テキストの更新と画像の更新で個別にリクエストを行う

function AppSettings() {

  return (
    <EditForm edditType = {"user-update"} />
  );
}

export default AppSettings;
