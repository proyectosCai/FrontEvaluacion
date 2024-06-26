import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './Componentes/Sidebar';
import RateProject from './Pages/RateProject';
import'./App.css'
import Navbar from './Componentes/Navbar';
import Grid from './Componentes/Grid';
import ProjectPage from './Componentes/ProjectPage';
import BoxPage from './Componentes/BoxPage';
import GraphsPage from './Pages/GraphsPage';



function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Router>
    <div className="app">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="main-container">
        <Sidebar />
        <main className="content">
          <Routes>
            <Route path="/" element={<RateProject />} />
            <Route path="/rate-project" element={<RateProject />} />
            <Route path="/grid" element={<Grid />} />
              <Route path="/box/:boxNumber" element={<BoxPage />} />
              <Route path="/box/:boxNumber/project/:projectId" element={<ProjectPage />} />
              <Route path="/graphs" element={<GraphsPage />} />
            
          </Routes>
        </main>
      </div>
    </div>
  </Router>
  );
}

export default App;
