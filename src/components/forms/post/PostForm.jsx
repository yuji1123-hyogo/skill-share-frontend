import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { postSchema } from "../../../utils/validations/schemas/postValidation";
import { useHandlePost } from "../../../hooks/post/useHandlePost";
import ImageUploader from "../ImageUploader";

const PostForm = ({ clubId = null }) => {
    const [media, setMedia] = useState(null);

  //投稿フォームのコントロール
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(postSchema),
    defaultValues: {
      content: "",
    },
  });

  //投稿ロジックとAPIエラーのハンドリング
  const { handleAddPost, postError, isPostLoading } = useHandlePost({media,clubId,reset,setMedia});



  return (
    <div className="bg-dark-secondary rounded-lg  max-w-xl mx-auto border-dark-accent shadow-lg p-6 space-y-4">
      <p className="text-sm font-bold text-gray-200 mb-6">投稿を作成する</p>
      <form onSubmit={handleSubmit(handleAddPost)} className="space-y-4">
        {/* 画像アップローダー */}
        <div className="border-b border-dark-accent pb-4">
        <ImageUploader 
          image={media} 
          setImage={setMedia} 
          mode="post"
          className="mb-4" 
        />
        </div>

        {/* テキストエリア */}
        <div className="space-y-2">
          <textarea
            placeholder="投稿内容を入力してください(1000文字以内)"
            {...register("content")}
            className="w-full px-4 py-2 bg-dark-primary text-gray-200 rounded-lg border border-dark-accent focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px] resize-y"
          />
          {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}
        </div>

        {/* 送信エラー */}
        {postError && (
          <div className="bg-red-500/10 text-red-500 text-sm rounded-lg p-3">
            {postError.message || "投稿に失敗しました"}
          </div>
        )}

        {/* 送信ボタン */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isPostLoading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isPostLoading ? "投稿中..." : "投稿する"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
