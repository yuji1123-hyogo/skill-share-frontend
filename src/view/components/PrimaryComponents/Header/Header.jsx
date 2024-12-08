import React, { useContext, useState } from 'react'
import './Header.css'
import { useSelector } from 'react-redux';

function Header({toggleMenu,isMenuOpen}) {
  const currentUser = useSelector((state)=>state.user)
 
  return (
    <header className="headerContainer">
        <div className="header__humbergerIcon" onClick={toggleMenu}>{isMenuOpen ? "×" : "≡"}</div>
        <div className="header__logo">{currentUser.username}</div>
        <div className="header__icons">
        </div>
    </header>
  )
}

export default Header