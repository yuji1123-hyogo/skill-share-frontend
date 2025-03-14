import React from 'react'

const UserCardPresentation = ({ userData,targetUserId }) => {


    const totalTagExperience = userData.user.tags.reduce(
        (sum, tag) => sum + (tag.level - 1) * 150 + tag.currentExperience, 0
      );

  return (
        <div className="bg-dark-secondary rounded-xl shadow-lg p-6 space-y-4 border border-dark-accent">
        <UserProfileSummary
        username={userData.user.username}
        profilePicture={userData.user.profilePicture}
        />
        
        <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-400 text-sm">獲得総経験値：</span>
            <span className="text-purple-500/60 font-semibold text-base">{totalTagExperience} EXP</span>
        </div>


        <div className="space-y-1">
            <span className="text-sm text-gray-400">自己紹介</span>
            <p className="text-gray-200 text-sm">{userData.user.bio || "未設定"}</p>
        </div>

        <div className="space-y-2">
            <span className="text-sm text-gray-400">タグ</span>
            {userData.user.tags.length > 0 ? 
            <TagList tags={userData.user.tags} variant="simple" />
            : <p className="text-gray-200 text-sm">タグはありません</p>}
        </div>

        <UserActionButtons targetUserId={targetUserId} />
        </div>
    </div>
  )
}

export default UserCardPresentation