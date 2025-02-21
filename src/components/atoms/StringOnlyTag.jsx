import React from 'react'

const StringOnlyTag = ({ tag, onClick, className, variant, isActive }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(tag);
    }
  };

  const activeClass = isActive ? 'bg-blue-500 text-white' : '';

  return (
    <span 
      onClick={handleClick}
      className={`${className} ${activeClass} cursor-pointer transition-colors duration-200`}
    >
      {tag}
    </span>
  )
}

export default StringOnlyTag