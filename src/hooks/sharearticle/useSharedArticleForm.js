import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  title: yup.string()
    .required("タイトルは必須です")
    .max(100, "タイトルは100文字以内で入力してください"),
  url: yup.string()
    .required("URLは必須です")
    .url("有効なURLを入力してください"),
  description: yup.string()
    .max(500, "説明は500文字以内で入力してください"),
});

export const useSharedArticleForm = (onSubmit) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      url: "",
      description: "",
    },
  });

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    reset,
  };
}; 