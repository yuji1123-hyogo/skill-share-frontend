import * as yup from "yup";


// ✅ フロントエンド用のイベントバリデーション
export const eventValidationSchema = yup.object({
  name: yup.string().required("イベント名は必須です"),
  description: yup.string().nullable().optional(),
  date: yup
    .date()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .typeError("日付は正しい形式で入力してください"),
  location: yup.string().nullable().optional(),
});
