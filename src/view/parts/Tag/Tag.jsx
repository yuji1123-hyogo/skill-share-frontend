import React from 'react'
import './tag.css'
function Tag({tag,className,onClick,type}) {

    let addInfo = ""; 

    switch (type) {
        case "suggested-tag":
            addInfo = "+";
            break;
        case "interesting-tag":
            addInfo = "-";
            break;
        default:
            addInfo = ""; 
    }

  return (
    <div className={`tag ${className}`} onClick={onClick}>
    <div className="tag-header">
      <span className="tag-name">{addInfo}{tag.name ? tag.name : tag}</span>
    </div>
    {
      tag.level &&
      (
      <>
        <div className="tag-level-exp">
          <span className="tag-level">Lv {tag.level}</span>
          <span className="tag-exp">{tag.currentExperience}/{tag.nextLevelExperience} EXP</span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-bar-inner"
            style={{ width: `${Math.min((tag.currentExperience / tag.nextLevelExperience) * 100, 100)}%` }}
          ></div>
        </div>
      </>
      )
    }
  </div>
  )
}

export default Tag