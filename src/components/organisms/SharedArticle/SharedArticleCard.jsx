import { useState } from "react";
import { Link } from "react-router-dom";
import { formatToJST } from "../../../utils/formatToJST";
import TagList from "../../molecules/TagList";
import CommentSection from "../Comment/CommentSection";
import CommentTrigger from "../../atoms/CommentTrigger";
import UserProfileSummary from "../../molecules/UserProfileSummary";

const SharedArticleCard = ({ article }) => {
  const [isCommentOpen, setIsCommentOpen] = useState(false);

  return (
    <div className="bg-dark-primary p-6 rounded-lg border border-dark-accent">
      {/* 記事ヘッダー */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <UserProfileSummary username={article.author.username} profilePicture={article.author.profilePicture} />
        </div>
        <p className="text-gray-400 text-sm">
          {formatToJST(article.createdAt)}
        </p>
      </div>

      {/* 記事本文 */}
      <div className="space-y-4">
        <h4 className="text-xl font-semibold text-gray-200">{article.title}</h4>
        
        <a 
          href={article.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 break-all"
        >
          {article.url}
        </a>

        {article.description && (
          <p className="text-gray-300">{article.description}</p>
        )}

        {article.tags && article.tags.length > 0 && (
          <div className="pt-2">
            <TagList tags={article.tags} variant="simple" />
          </div>
        )}
      </div>

      {/* コメントトリガー */}
      <CommentTrigger
        commentCount={article.comments?.length || 0}
        isCommentOpen={isCommentOpen}
        setIsCommentOpen={setIsCommentOpen}
      />

      {/* コメントセクション */}
      {isCommentOpen && (
        <div className="mt-4">
          <CommentSection
            targetId={article.id}
            targetType="article"
          />
        </div>
      )}
    </div>
  );
};

export default SharedArticleCard; 