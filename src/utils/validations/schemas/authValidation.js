import * as yup from "yup";

// ✅ ユーザー登録スキーマ
export const registerSchema = yup.object({
  username: yup
    .string()
    .trim()
    .required("ユーザー名は必須です")
    .max(30, "ユーザー名は30文字以内で入力してください"),

  email: yup
    .string()
    .trim()
    .email("有効なメールアドレスを入力してください")
    .required("メールアドレスは必須です"),

  password: yup
    .string()
    .trim()
    .required("パスワードは必須です"),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "パスワードが一致しません")
    .required("パスワード（確認）は必須です"),
});

// ✅ ログインスキーマ
export const loginSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email("有効なメールアドレスを入力してください")
    .required("メールアドレスは必須です"),
  password: yup.string().trim().required("パスワードは必須です"),
});
