import React from "react";
import { DEFAULT_PROFILE_PICTURE } from "../../utils/constans";


const ClubBaseInfo = ({ themeImage, description, name }) => {
  return (
    <div className="space-y-4">
      <div className="relative aspect-video w-full rounded-lg overflow-hidden">
        <img 
          src={themeImage || "/default-club-bg.jpg"} 
          alt={`${name}のテーマ画像`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
      
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-white">{name}</h3>
        <p className="text-gray-300 text-sm">
          {description || "説明はありません"}
        </p>
      </div>
    </div>
  );
};

export default ClubBaseInfo;
