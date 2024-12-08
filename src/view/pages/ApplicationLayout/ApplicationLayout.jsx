import React, { useContext, useState } from 'react'
import "./ApplicationLayout.css"
import Header from '../../components/PrimaryComponents/Header/Header';
import Leftbar from '../../components/PrimaryComponents/Leftbar/Leftbar';
import { Outlet } from 'react-router-dom';


function ApplicationLayout() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };

  return (
    <div className="App">
        
        <header className='Header' >
            <Header toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
        </header>

        <div className='contents'>
            <aside className={`Leftbar ${isMenuOpen ? 'open' : ''}`}>
                <Leftbar isMenuOpen={isMenuOpen} />
            </aside>
            <main className="main">
                <Outlet/>
            </main>
        </div>
    </div>
  )
}

export default ApplicationLayout