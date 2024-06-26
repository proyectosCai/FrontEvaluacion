import React, { useState, useEffect } from 'react';
import '../ResultByFichaPage.css';

function ResultsByFichaPage() {
  const [fichaResults, setFichaResults] = useState({});
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/evento`);
        const projectsData = await response.json();
        const processedData = processDataByFicha(projectsData);
        setFichaResults(processedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [apiUrl]);

  const processDataByFicha = (projects) => {
    const categories = ['Creatividad', 'RSA', 'PyC', 'EyC'];
    const fichaResults = {};

    projects.forEach(project => {
      if (!fichaResults[project.Ficha]) {
        fichaResults[project.Ficha] = {
          projects: [],
          categoryTotals: Object.fromEntries(categories.map(cat => [cat, 0])),
          categoryAverages: Object.fromEntries(categories.map(cat => [cat, 0])),
          totalScore: 0,
          projectCount: 0
        };
      }

      const fichaData = fichaResults[project.Ficha];
      fichaData.projects.push(project);
      fichaData.projectCount++;

      categories.forEach(category => {
        if (project[category] !== null) {
          fichaData.categoryTotals[category] += project[category];
          fichaData.totalScore += project[category];
        }
      });
    });

    // Calculate averages
    Object.values(fichaResults).forEach(fichaData => {
      categories.forEach(category => {
        fichaData.categoryAverages[category] = fichaData.categoryTotals[category] / fichaData.projectCount;
      });
    });

    return fichaResults;
  };

  return (
    <div className="results-by-ficha-container">
      <h1>Resultados por Ficha</h1>
      {Object.entries(fichaResults).map(([ficha, data]) => (
        <div key={ficha} className="ficha-card">
          <h2>Ficha: {ficha}</h2>
          <div className="ficha-results">
            <div className="category-results">
              <h3>Resultados por Categoría</h3>
              <ul>
                {Object.entries(data.categoryAverages).map(([category, average]) => (
                  <li key={category}>
                    <strong>{category}:</strong> {average.toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>
            <div className="total-score">
              <h3>Puntaje Total</h3>
              <p>{data.totalScore.toFixed(2)}</p>
            </div>
          </div>
          <div className="projects-list">
            <h3>Proyectos ({data.projectCount})</h3>
            <ul>
              {data.projects.map((project, index) => (
                <li key={index}>{project.Proyecto}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ResultsByFichaPage;