import React from "react";
import { useImageUploaderState } from "../../hooks/useImageUploader";
import LoadingIndicator from "../atoms/loading/LoadingIndicator";

const ImageUploader = ({ 
  image = null, 
  setImage, 
  mode = "profile",
  aspectRatio = "square",
  className = "" 
}) => {
  const { fileInputRef, isImageLoading, handleImageClick, handleFileChange } =
    useImageUploaderState({ image, setImage });

  if (isImageLoading) return <LoadingIndicator message="画像をアップロード中..." />;

  const variants = {
    profile: {
      wrapper: "flex justify-center items-center",
      image: "w-32 h-32 rounded-full object-cover cursor-pointer ring-2 ring-offset-2 ring-dark-accent hover:border-blue-500  transition-opacity duration-200",
      placeholder: "w-24 h-24 rounded-full bg-dark-accent flex items-center justify-center cursor-pointer hover:border-blue-500 transition-colors duration-200"
    },
    post: {
      wrapper: "flex justify-center",
      image: "max-w-full h-auto rounded-lg cursor-pointer hover:opacity-90 transition-opacity duration-200",
      placeholder: "w-full h-32 rounded-lg border-2 border-dashed border-dark-accent flex items-center justify-center cursor-pointer hover:border-blue-500 transition-colors duration-200"
    },
    club: {
      wrapper: "w-full",
      image: "w-full aspect-video rounded-lg object-cover cursor-pointer hover:opacity-90 transition-opacity duration-200",
      placeholder: "w-full aspect-video rounded-lg border-2 border-dashed border-dark-accent flex items-center justify-center cursor-pointer hover:border-blue-500 transition-colors duration-200"
    },
    event: {
      wrapper: "w-full",
      image: "w-full aspect-video rounded-lg object-cover cursor-pointer hover:opacity-90 transition-opacity duration-200",
      placeholder: "w-full aspect-video rounded-lg border-2 border-dashed border-dark-accent flex items-center justify-center cursor-pointer hover:border-blue-500 transition-colors duration-200"
    }
  };

  const style = variants[mode];

  return (
    <div className={`${style.wrapper} ${className}`}>
      {image ? (
        <img
          src={image || "/logo192.png"}
          alt="アップロード画像"
          className={style.image}
          onClick={handleImageClick}
        />
      ) : (
        <div
          onClick={handleImageClick}
          className={style.placeholder}
        >
          <span className="text-gray-400 text-sm">
            クリックして画像をアップロード
          </span>
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ImageUploader;
