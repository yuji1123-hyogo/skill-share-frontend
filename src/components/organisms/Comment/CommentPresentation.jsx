import { formatToJST } from "../../../utils/formatToJST"
import UserProfileSummary from "../../molecules/UserProfileSummary"


const CommentPresentation = ({ comment }) => {
  console.log("コメント",comment)
  return (
    <div className="bg-dark-secondary rounded-lg p-4 mt-4 border border-dark-accent">
      <div className="flex items-center space-x-2 mb-2">
        <img
          src={comment.author.profilePicture || "/logo512.png"}
          alt={`${comment.author.username}のプロフィール画像`}
          className="w-8 h-8 rounded-full object-cover"
        />
        <span className="text-gray-300 text-sm">{comment.author.username}</span>
        <span className="text-gray-500 text-xs">{formatToJST(comment.createdAt)}</span>
      </div>
      <p className="text-gray-200 ml-10">{comment.content}</p>
    </div>
  )
}

export default CommentPresentation


