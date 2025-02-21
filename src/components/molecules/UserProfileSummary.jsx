const UserProfileSummary = ({ username, profilePicture }) => {
  return (
    <div className="flex items-center space-x-3 mb-4">
      <img
        src={profilePicture || "/logo192.png"}
        alt={`${username}のプロフィール画像`}
        className="w-12 h-12 p-1 rounded-full object-cover border border-dark-accent"
      />
      
      <span className="font-medium text-gray-200">{username}</span>
    </div>
  )
}

export default UserProfileSummary


