import * as yup from "yup";

export const postSchema = yup.object({
  content: yup
    .string()
    .trim()
    .required("投稿内容は必須です")
    .max(1000, "投稿内容は最大1000文字までです"),
  media: yup.string().url("有効な画像URLを入力してください").nullable(),
  club: yup.string().nullable(),
});
