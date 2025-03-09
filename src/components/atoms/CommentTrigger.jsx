import React from 'react'


//***************cursor作****************** */

function CommentTrigger({ commentCount = 0, isCommentOpen, setIsCommentOpen }) {
  return (
    <div className="mt-4 pt-4 border-t border-dark-accent">
      <button
        onClick={() => setIsCommentOpen(!isCommentOpen)}
        className="text-gray-400 hover:text-gray-200 text-sm flex items-center gap-2"
      >
        <span>
          {commentCount} コメント
        </span>
        <svg
          className={`w-4 h-4 transition-transform ${
            isCommentOpen ? "transform rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
    </div>
  );
}

export default CommentTrigger;