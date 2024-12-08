import React, { useState } from "react";
import "./ModeSwitcherNav.css"

const ModeSwitcherNav = ({ modelist,activeMode,handleClick}) => {
  return (
    <nav className="mode-switcher">
      {modelist.map((mode) => (
        <button
          key={mode.key}
          className={`modeButton ${activeMode === mode.key ? "active" : ""}`}
          onClick={()=>{handleClick(mode.key)}}
        >
        {mode.label}
        </button>
      ))}
    </nav>
  );
};

export default ModeSwitcherNav;