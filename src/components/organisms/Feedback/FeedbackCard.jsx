import { useState } from "react";
import { formatToJST } from "../../../utils/formatToJST";
import CommentSection from "../Comment/CommentSection";
import CommentTrigger from "../../atoms/CommentTrigger";
import UserProfileSummary from "../../molecules/UserProfileSummary";
const FeedbackCard = ({ feedback }) => {
  const [isCommentOpen, setIsCommentOpen] = useState(false);

  return (
    <div className="bg-dark-primary p-6 rounded-lg border border-dark-accent">
      {/* フィードバックヘッダー */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <UserProfileSummary username={feedback.author.username} profilePicture={feedback.author.profilePicture} />
        </div>
        <p className="text-gray-400 text-sm">
          {formatToJST(feedback.createdAt)}
        </p>
      </div>

      {/* フィードバック本文 */}
      <div className="space-y-4">
        <p className="text-gray-200 whitespace-pre-wrap">{feedback.content}</p>
        
        {feedback.media && (
          <div className="mt-4">
            <img
              src={feedback.media}
              alt="フィードバック画像"
              className="rounded-lg max-h-96 object-cover"
            />
          </div>
        )}
      </div>

      {/* コメントトリガー */}
      <CommentTrigger
        commentCount={feedback.comments?.length || 0}
        isCommentOpen={isCommentOpen}
        setIsCommentOpen={setIsCommentOpen}
      />

      {/* コメントセクション */}
      {isCommentOpen && (
        <div className="mt-4">
          <CommentSection
            targetId={feedback.id}
            targetType="feedback"
          />
        </div>
      )}
    </div>
  );
};

export default FeedbackCard; 