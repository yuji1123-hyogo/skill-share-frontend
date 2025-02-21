export const judgeUserRelation = (targetUserId, currentUserId, followListData) => {
    return {
      isMyself: targetUserId === currentUserId,
      isFollow: followListData?.following.includes(targetUserId) ?? false
    };
  };
  