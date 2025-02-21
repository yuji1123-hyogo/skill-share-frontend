import CommentSection from "../Comment/CommentSection";
import { COMMENT_TARGET_TYPES } from "../../../api/clients/commentApi";

const SharedArticlePresentation = ({ article }) => {
  return (
    <div>
      {/* 記事表示部分 */}
      
      {/* コメントセクション */}
      <CommentSection 
        targetType={COMMENT_TARGET_TYPES.ARTICLE} 
        targetId={article.id} 
      />
    </div>
  );
}; 