import React from "react";

const LoadingIndicator = ({ message = "読み込み中...", variant = "default" }) => {
  const variants = {
    default: (
      <div className="flex flex-col items-center space-y-4">
        <div className="relative w-12 h-12">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="w-12 h-12 rounded-full border-4 border-blue-500/30 animate-pulse"></div>
          </div>
          <div className="absolute top-0 left-0 w-full h-full animate-spin">
            <div className="w-12 h-12 rounded-full border-4 border-transparent border-t-blue-500"></div>
          </div>
        </div>
        <p className="text-gray-400 animate-pulse">{message}</p>
      </div>
    ),
    dots: (
      <div className="flex flex-col items-center space-y-4">
        <div className="flex space-x-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            ></div>
          ))}
        </div>
        <p className="text-gray-400">{message}</p>
      </div>
    ),
    pulse: (
      <div className="flex flex-col items-center space-y-4">
        <div className="relative w-16 h-16">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute top-0 left-0 w-full h-full rounded-full bg-blue-500 animate-ping"
              style={{
                animationDelay: `${i * 0.5}s`,
                opacity: 0.3 - i * 0.1,
              }}
            ></div>
          ))}
          <div className="absolute top-0 left-0 w-full h-full rounded-full bg-blue-500"></div>
        </div>
        <p className="text-gray-400">{message}</p>
      </div>
    ),
    bars: (
      <div className="flex flex-col items-center space-y-4">
        <div className="flex items-end space-x-1 h-10">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-2 bg-blue-500 rounded-full animate-music-bar"
              style={{
                height: '40%',
                animationDelay: `${i * 0.15}s`,
              }}
            ></div>
          ))}
        </div>
        <p className="text-gray-400">{message}</p>
      </div>
    ),
  };

  return (
    <div className="flex justify-center items-center min-h-[200px]">
      {variants[variant]}
    </div>
  );
};

export default LoadingIndicator;
