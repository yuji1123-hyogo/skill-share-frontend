import { useState } from "react";
import { useCreatePostMutation } from "../../features/RTKQuery/apiSlice";
import { toast } from "react-toastify";

//投稿ロジックとAPIエラーのハンドリング
export const useHandlePost = ({media = null,clubId = null,reset,setMedia}) => {
  const [createPost, { isLoading  : isPostLoading,error : postError}] = useCreatePostMutation();


  const handleAddPost = async (contentonlyobject) => {
   
    console.log(contentonlyobject)
    const postData = {
      content: contentonlyobject.content,
      media: media || null,  
      club: clubId || null
    };
    try {
      console.log(postData)
      await createPost(postData).unwrap();
      toast.success("投稿が作成されました");
      reset();
      setMedia(null);
    } catch (error) {
      console.error("投稿API エラー:", error);
      toast.error(error?.message || "投稿に失敗しました");
    }
  };


  
  return { handleAddPost, postError, isPostLoading };
};
