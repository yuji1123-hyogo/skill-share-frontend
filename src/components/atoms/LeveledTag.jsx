


//***************cursor作****************** */

const LeveledTag = ({ tag, variant, className }) => {
  if (variant === "compact") {
    return (
      <div className={className}>
        <span className="mr-1">{tag.name}</span>
        <span className="text-purple-600">Lv.{tag.level}</span>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="flex items-center gap-2">
        <span className="text-gray-300 text-sm font-semibold">#{tag.name}</span>
        <span className="text-gray-300 text-sm ">Lv.{tag.level}</span>
      </div>
      
      {/* Experience bar */}
      <div className="mt-1.5 bg-gray-500/100 rounded-full h-1.5 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-purple-500/50 to-purple-500 transition-all duration-300"
          style={{
            width: `${(tag.currentExperience / tag.nextLevelExperience) * 100}%`
          }}
        />
      </div>
      
      {/* Hover tooltip */}
      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-gray-900 text-xs text-gray-300 px-2 py-1 rounded shadow-lg whitespace-nowrap">
        {`${tag.currentExperience} / ${tag.nextLevelExperience} EXP`}
      </div>
    </div>
  );
};

export default LeveledTag; 