import {  NavLink } from 'react-router-dom';
import '../Sidebar.css'

function Sidebar({ isOpen, toggleSidebar }) {
    return (
      <nav className={`sidebar ${isOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={toggleSidebar}>×</button>
        <ul>
          <li><NavLink to="/rate-project" onClick={toggleSidebar}>Calificar Proyecto</NavLink></li>
          <li><NavLink to="/graphs" onClick={toggleSidebar}>Resultados</NavLink></li>
        </ul>
      </nav>
    );
  }
  
  export default Sidebar;