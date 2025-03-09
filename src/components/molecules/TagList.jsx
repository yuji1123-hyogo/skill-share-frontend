import LeveledTag from "../atoms/LeveledTag";
import StringOnlyTag from "../atoms/StringOnlyTag";



//***************UIはcursor作****************** */

const TagList = ({ tags, variant = "default", onClick, activeTag }) => {
  const variants = {
    default: {
      wrapper: "flex flex-wrap gap-2",
      tag: "group relative px-4 py-2 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 hover:border-gray-600 transition-all duration-200"
    },
    compact: {
      wrapper: "flex flex-wrap gap-1.5",
      tag: "px-2 py-0.5 bg-purple-900/50 text-purple-200 text-xs rounded border border-purple-500/30 transition-colors duration-200"
    },
    simple: {
      wrapper: "flex flex-wrap gap-2",
      tag: "px-3 py-1 bg-dark-accent text-gray-300 rounded-md text-sm transition-colors duration-200 hover:bg-gray-700"
    }
  };

  const style = variants[variant];
  const displayTags = variant === "compact" ? tags.slice(0, 5) : tags;

  if (!tags || tags.length === 0) {
    return <p className="text-gray-400 italic text-sm">タグは登録されていません</p>;
  }

  // タグがオブジェクトかどうかを判定
  const isTagObject = typeof tags[0] === 'object';

  return (
    <div className={style.wrapper}>
      {displayTags.map((tag, index) => (
        isTagObject ? (
          <LeveledTag 
            key={index} 
            tag={tag} 
            variant={variant}
            className={style.tag}
          />
        ) : (
          <StringOnlyTag
            key={index}
            tag={tag}
            onClick={onClick}
            className={style.tag}
            variant={variant}
            isActive={tag === activeTag}
          />
        )
      ))}
      {variant === "compact" && tags.length > 5 && (
        <span className="px-2 py-0.5 bg-dark-accent text-gray-400 text-xs rounded">
          +{tags.length - 5}
        </span>
      )}
    </div>
  );
};

export default TagList;
