import UserProfileSummary from "../../molecules/UserProfileSummary"
import TagList from "../../molecules/TagList"
import CommentSection from "../Comment/CommentSection"
import { formatToJST } from "../../../utils/formatToJST"
import { COMMENT_TARGET_TYPES } from "../../../api/clients/commentApi"
import { useState } from "react"
import CommentTrigger from "../../atoms/CommentTrigger"

const PostPresentation = ({ postDetail }) => {
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  return (
    <div className="bg-dark-primary text-gray-100 rounded-lg shadow-xl p-6 mb-8 border border-dark-accent">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <UserProfileSummary username={postDetail.author.username} profilePicture={postDetail.author.profilePicture} />
        </div>
        <p className="text-gray-400 text-sm">
          {formatToJST(postDetail.createdAt)}
        </p>
      </div>
      {postDetail.tags.length > 0 && <TagList variant="simple" tags={postDetail.tags} />}
      <p className="mt-4 text-lg leading-relaxed">{postDetail.content}</p>
      {postDetail.media && (
        <img
          src={postDetail.media || "/placeholder.svg"}
          alt="投稿の画像"
          className="w-full h-auto rounded-lg mt-4 object-cover"
        />
      )}
      <CommentTrigger
        commentCount={postDetail.comments?.length || 0}
        isCommentOpen={isCommentOpen}
        setIsCommentOpen={setIsCommentOpen}
      />
      {isCommentOpen && (
        <CommentSection 
          targetType={COMMENT_TARGET_TYPES.POST} 
          targetId={postDetail.id} 

        />
      )}
    </div>
  )
}

export default PostPresentation

