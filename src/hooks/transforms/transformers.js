// クラブデータ変換
export const transformClubData = (data, { image, selectedTags, coordinates, address }) => ({
  ...data,
  themeImage: image,
  tags: selectedTags,
  location: {
    type: "Point",
    coordinates: coordinates,
    address: address || null,
  }
});

// ユーザーデータ変換
export const transformUserData = (data, { image, selectedTags }) => ({
  ...data,
  profilePicture: image, 
  tags: selectedTags
});

// ポストデータ変換
export const transformPostData = (contentObj, { media, clubId }) => ({
  content: contentObj.content,
  media: media || null,
  club: clubId || null
});

// コメントデータ変換
export const transformCommentData = (content, { targetType, targetId }) => ({
  content,
  targetType,
  targetId
}); 