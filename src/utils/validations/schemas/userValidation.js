import * as yup from "yup";



// ✅ ユーザー情報の更新バリデーション
export const updateUserSchema = yup.object({
    username: yup.string().min(3, "ユーザー名は3文字以上である必要があります").max(20, "ユーザー名は20文字以内である必要があります").optional(),
    profilePicture: yup.string().url("有効なURLを入力してください").nullable().optional(),
    bio: yup.string().max(200, "自己紹介は200文字以内で入力してください").nullable().optional(),
    tags: yup.array().of(yup.string()).optional(),
    location: yup.object({
        type: yup.string().optional(),
        coordinates: yup.array().of(yup.number()).optional(),
        address: yup.string().optional(),
    }).optional()
});

