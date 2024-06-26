import React from 'react';
import '../Navbar.css';
import logo from '../LogoAI.png'
import logo2 from '../sennova.png'

function Navbar({ toggleSidebar }) {
  return (
    <header className="navbar">
      <img src= {logo} alt="Logo" className="logo" />
      <h1>CAI PROJECT-APP</h1>
      <img src= {logo2} alt="Logo" className="logo" />
      <button className="menu-toggle" onClick={toggleSidebar}>☰</button>
    </header>
  );
}

export default Navbar;