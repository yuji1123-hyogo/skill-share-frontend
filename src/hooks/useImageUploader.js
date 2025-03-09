import { useState, useRef } from "react";
import { uploadImageAPI } from "../api/clients/uploadApi";

export const useImageUploaderState = ({ image = null, setImage }) => {
  const fileInputRef = useRef(null);
  const [isImageLoading, setIsImageLoading] = useState(false); // ローディング状態
  const [imageError, setImageError] = useState(null); // エラー状態

  // 画像選択処理
  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // 画像アップロード処理
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsImageLoading(true); // ローディング開始
    setImageError(null); // エラーリセット

    try {
      const uploadedImageUrl = await uploadImageAPI(file);
      setImage(uploadedImageUrl.imageUrl);
    } catch (error) {
      console.error("画像のアップロードに失敗しました", error);
      setImageError("画像のアップロードに失敗しました");
    } finally {
      setIsImageLoading(false); // ローディング終了
    }
  };

  return {
    image,
    fileInputRef,
    handleImageClick,
    handleFileChange,
    isImageLoading, // ローディング状態を返す
    imageError, // エラー状態を返す
  };
};
