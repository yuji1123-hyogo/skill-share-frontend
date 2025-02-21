import { useState, useEffect } from "react";
import { checkUsernameExistsAPI, checkEmailExistsAPI } from "../../api/clients/authApi";
import { toast } from "react-toastify";

/**
 * ✅ メールアドレスの形式チェック関数
 * @param {string} email
 * @returns {boolean} - 正しいメール形式なら `true`
 */
const validateEmailFormat = (email) => {
  const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

/**
 * ✅ 認証用のリアルタイム重複チェック（ユーザー名 & メール）
 * @param {"username" | "email"} type - チェックするタイプ
 * @param {string} value - 入力された値
 * @returns {{ error: string | null, success: string | null, formatError: string | null }} 
 * - エラーメッセージ, 成功メッセージ, 形式エラーメッセージ
 */
const useCheckUserAvailability = (type, value) => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);


  useEffect(() => {
    if (!value) {
      setError(null);
      setSuccess(null);
      return;
    }

    
    // ✅ useEffetct内の処理①: ユーザー名・メールの形式チェック
    if (type === "email" && !validateEmailFormat(value)) {
      setError("正しいメールアドレスを入力してください");
      setSuccess(null);
      return;
    } else {
      setError(null);
    }

    // ✅ useEffetct内の処理②: ユーザー名・メールの重複チェック
    const checkAvailability = async () => {
      try {
        let response;
        if (type === "username") {
          response = await checkUsernameExistsAPI(value);
          if (response.exists) {
            toast.error("このユーザー名は既に使用されています");
            setError("このユーザー名は既に使用されています");
            setSuccess(null);
          } else {;
            setSuccess("このユーザー名は使用可能です");
            setError(null);
          }
        } else if (type === "email") {
          response = await checkEmailExistsAPI(value);
          if (response.exists) {
            toast.error("このメールアドレスは既に登録されています");
            setError("このメールアドレスは既に登録されています");
            setSuccess(null);
          } else {
            setSuccess("このメールアドレスは使用可能です");
            setError(null);
          }
        }
      } catch (error) {
        setError("確認中にエラーが発生しました");
        console.error(error);
        setSuccess(null);
      }
    };
    
    // ✅ 500ms 待機してからチェック処理を実行
    const timer = setTimeout(checkAvailability, 500);
    return () => clearTimeout(timer);
  }, [type, value]);


  return { error, success};
};

export default useCheckUserAvailability;
