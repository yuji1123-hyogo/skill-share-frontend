import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  content: yup.string()
    .required("フィードバック内容は必須です")
    .max(1000, "フィードバックは1000文字以内で入力してください"),
});

export const useFeedbackForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors: fieldErrors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      content: "",
    },
  });

  // 画像URL状態
  const [mediaUrl, setMediaUrl] = useState("");
  
  // API エラーの状態
  const [submitError, setSubmitError] = useState(null);

  // フォームリセット
  const resetForm = () => {
    reset();
    setMediaUrl("");
    setSubmitError(null);
  };

  return {
    register,
    handleSubmit,
    fieldErrors,
    submitError,
    setSubmitError,
    mediaUrl,
    setMediaUrl,
    resetForm,
  };
}; 