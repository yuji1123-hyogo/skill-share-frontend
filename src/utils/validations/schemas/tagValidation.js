import * as yup from "yup";

/**
 * ✅ タグ検索のバリデーションスキーマ
 */
export const searchTagSchema = yup.object({
  query: yup
    .string()
    .trim()
    .required("検索クエリを入力してください。")
    .min(2, "検索クエリは2文字以上で入力してください。")
    .max(30, "検索クエリは30文字以内で入力してください。"),

  threshold: yup
    .number()
    .integer("編集距離 (threshold) は整数で指定してください。")
    .min(0, "編集距離 (threshold) は 0 以上にしてください。")
    .max(5, "編集距離 (threshold) は 5 以下にしてください。")
    .default(2),

  limit: yup
    .number()
    .integer("取得件数 (limit) は整数で指定してください。")
    .min(1, "取得件数 (limit) は 1 以上にしてください。")
    .max(50, "取得件数 (limit) は 50 以下にしてください。")
    .default(10),
});
