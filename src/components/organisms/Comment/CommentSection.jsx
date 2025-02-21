import { useHandleComment } from "../../../hooks/comment/useHandleComment"
import TextInputWithButton from "../../molecules/TextInputWithButton"
import ErrorMessage from "../../atoms/errors/ErrorMessage"
import CommentContainer from "./CommentContainer"
import LoadingIndicator from "../../atoms/loading/LoadingIndicator"
import { useGetCommentsByTargetQuery } from "../../../features/RTKQuery/apiSlice"
import { COMMENT_TARGET_TYPES } from "../../../api/clients/commentApi"
import PropTypes from "prop-types"

const CommentSection = ({ targetType, targetId }) => {
  const { handleAddComment, commentError } = useHandleComment({ targetType, targetId })
  const { data, isLoading, error } = useGetCommentsByTargetQuery({
    targetType,
    targetId
  })

  if (isLoading) return <LoadingIndicator message="コメント一覧を読み込んでいます..." />
  if (error) return <ErrorMessage message="コメント一覧の取得に失敗しました" />

  return (
    <div className="mt-6">
      <h4 className="text-xl font-semibold mb-4 text-white">コメント</h4>
      <div className="space-y-4">
        {data.commentIds.map((commentId) => (
          <CommentContainer key={commentId} commentId={commentId} />
        ))}
      </div>
      {commentError && <ErrorMessage message={commentError} />}
      <div className="mt-4">
        <TextInputWithButton 
          onSubmit={handleAddComment} 
          placeholder="コメントを入力..." 
        />
      </div>
    </div>
  )
}

// 使用例のためのPropTypes
CommentSection.propTypes = {
  targetType: PropTypes.oneOf(Object.values(COMMENT_TARGET_TYPES)).isRequired,
  targetId: PropTypes.string.isRequired,
}

export default CommentSection

