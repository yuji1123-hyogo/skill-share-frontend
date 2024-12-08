import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadProfilePictureActionCreater } from '../../../model/redux/currentUserSlice';
import './Picture.css';
import { uploadImageApiCrient, uploadThemeImageApiCrient } from '../../../model/httpApiCrients/uploadApiCrients';

function Picture({ parts, user,club,edditable,edditType,setImage,image}) {
  const currentUser = useSelector((state) => state.user);
  const [editing, setEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  

  const handleImageClick = () => {
    if(edditable){
        setEditing(true);
    }else{
        return 
    }
  };

  const handleSave = async () => {
    if (!selectedFile) {
      alert('画像をセットしてください');
      return;
    }

    const formData = new FormData();

    setLoading(true);
    try {
      if(edditType === "user-update"){
        formData.append('image', selectedFile);
        await dispatch(uploadProfilePictureActionCreater(formData)).unwrap();
      }else if(edditType === "club-update"){
        formData.append("clubId", club._id);
        formData.append("image", selectedFile);
        await uploadThemeImageApiCrient(formData)
      }else if (edditType === "club-creation"){
        formData.append("image", selectedFile);
        const res = await uploadImageApiCrient(formData)
        setImage(res.data.imageUrl)
      }
      alert('画像の変更に成功しました');
    } catch (error) {
      console.error('Upload error:', error);
      alert('画像の更新に失敗しました');
    } finally {
      setLoading(false);
      setEditing(false);
      setSelectedFile(null);
    }
  };

  const handleCancel = () => {
    setEditing(false);
    setSelectedFile(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };


  const getImageSrc = () => {
    if (edditable) {
      // 編集可能な場合
      if (edditType === "user-update") {
        return preview || currentUser.profilePicture || "logo192.png";
      } else if (edditType === "club-update") {
        return preview || club?.themeImage || "logo192.png";
      } else if (edditType === "club-creation"){
        return image || preview ||"logo192.png";
      }
    } else {
      // 編集不可の場合
      if (edditType === "user-update") {
        return user.profilePicture || "logo192.png";
      } else if (edditType === "club-update") {
        return club?.themeImage || "logo192.png";
      }
    }
    return "logo192.png";
  };
  

  
  
  return (
    <div className={`picture ${parts}`}>
      <img
        src={
            getImageSrc()
        }
        alt="Profile"
        className={`${parts}-image ${editing ? 'editing' : ''}`}
        onClick={handleImageClick}
      />
      
      {editing && (
        <div className="picture-edit-card">
          <label htmlFor="file-input" className="picture-label">
            画像を選択
          </label>
          <input
            id="file-input"
            type="file"
            accept="image/*"
            className="picture-input"
            onChange={handleFileChange}
          />
          <div className="picture-buttons">
            <button onClick={handleSave} className="picture-button picture-button--save">
              保存
            </button>
            <button onClick={handleCancel} className="picture-button picture-button--cancel">
              キャンセル
            </button>
          </div>
        </div>
      )}
      {loading && <div className="picture__loading">画像をアップロード中...</div>}
    </div>
  );
}

export default Picture;
