import * as yup from "yup";

/**
 * ✅ クラブ作成・編集用のバリデーションスキーマ
 */
export const clubValidationSchema = yup.object({
  name: yup
    .string()
    .required("クラブ名は必須です")
    .max(50, "クラブ名は最大50文字まで"),

  description: yup
    .string()
    .max(200, "説明は最大200文字まで")
    .nullable(),

  themeImage: yup
    .string()
    .url("有効なURLを入力してください")
    .nullable(),

  tags: yup
    .array()
    .default([]),

});
