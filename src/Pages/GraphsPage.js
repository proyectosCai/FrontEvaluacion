import React, { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend, 
  ArcElement 
} from 'chart.js';
import { FaMedal } from 'react-icons/fa';
import '../GraphsPage.css';
import Navbar from '../Componentes/Navbar';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function GraphsPage() {
  const [data, setData] = useState(null);
  const [topProjects, setTopProjects] = useState({});
  const [topThreeProjects, setTopThreeProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/evento');
        const projectsData = await response.json();

        const processedData = processData(projectsData);
        setData(processedData);

        const top = findTopProjects(processedData.projectAverages);
        setTopProjects(top);

        const topThree = findTopThreeProjects(processedData.projectTotals, projectsData);
        setTopThreeProjects(topThree);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const processData = (projects) => {
    const categories = ['Creatividad', 'RSA', 'PyC', 'EyC'];
    const categoryCounts = {};
    const categoryScores = {};
    const projectAverages = {};
    const projectTotals = {};

    categories.forEach(category => {
      categoryCounts[category] = 0;
      categoryScores[category] = 0;
    });

    projects.forEach(project => {
      if (!projectAverages[project.Proyecto]) {
        projectAverages[project.Proyecto] = {};
        categories.forEach(category => {
          projectAverages[project.Proyecto][category] = { sum: 0, count: 0 };
        });
      }

      categories.forEach(category => {
        if (project[category] !== null) {
          projectAverages[project.Proyecto][category].sum += project[category];
          projectAverages[project.Proyecto][category].count += 1;
          categoryCounts[category]++;
          categoryScores[category] += project[category];
        }
      });
    });

    Object.keys(projectAverages).forEach(project => {
      projectTotals[project] = 0;
      categories.forEach(category => {
        const { sum, count } = projectAverages[project][category];
        const average = count > 0 ? sum / count : null;
        projectAverages[project][category] = average;
        if (average !== null) {
          projectTotals[project] += average;
        }
      });
    });

    const averageScores = categories.map(category => 
      categoryCounts[category] > 0 ? categoryScores[category] / categoryCounts[category] : 0
    );

    const projectDistribution = categories.map(category => 
      (categoryCounts[category] / projects.length) * 100
    );

    return {
      categories,
      averageScores,
      projectDistribution,
      projectAverages,
      projectTotals
    };
  };

  const findTopProjects = (projectAverages) => {
    const categories = ['Creatividad', 'RSA', 'PyC', 'EyC'];
    const topProjects = {};

    categories.forEach(category => {
      let topProject = null;
      let topScore = -Infinity;

      Object.entries(projectAverages).forEach(([projectName, scores]) => {
        if (scores[category] !== null && scores[category] > topScore) {
          topScore = scores[category];
          topProject = { Proyecto: projectName, [category]: topScore };
        }
      });

      if (topProject) {
        topProjects[category] = topProject;
      }
    });

    return topProjects;
  };

  const findTopThreeProjects = (projectTotals, projects) => {
    const sortedProjects = Object.entries(projectTotals)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([project, score]) => {
        const projectDetails = projects.find(p => p.Proyecto === project);
        return { 
          project, 
          score, 
          ficha: projectDetails?.Ficha || 'N/A'
        };
      });

    return sortedProjects;
  };

  const barChartData = {
    labels: data?.categories || [],
    datasets: [
      {
        label: 'Puntuación Promedio',
        data: data?.averageScores || [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const pieChartData = {
    labels: data?.categories || [],
    datasets: [
      {
        data: data?.projectDistribution || [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  console.log ("data: ", topProjects)

  return (
    <div className="graphs-container">
        
      <h1>Resumen de Evaluaciones</h1>
      
      <div className="podium">
        {topThreeProjects.map((project, index) => (
          <div key={project.project} className={`podium-place place-${index + 1}`}>
            <FaMedal className="medal-icon" />
            <h2>{index === 0 ? "Primer Lugar" : index === 1 ? "Segundo Lugar" : "Tercer Lugar"}</h2>
            <h3>{project.project}</h3>
            <p><strong>Puntaje Total:</strong> {project.score.toFixed(2)}</p>
            <p><strong>Ficha:</strong> {project.ficha}</p>
          </div>
        ))}
      </div>
      
      <div className="top-projects">
        <h2>Proyectos Destacados por Categoría</h2>
        <div className="top-projects-grid">
          {Object.entries(topProjects).map(([category, project]) => (
            <div key={category} className="top-project-card">
              <h3>{category}</h3>
              <p><strong>Proyecto:</strong> {project.Proyecto}</p>
              <p><strong>Puntaje Promedio:</strong> {project[category].toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="charts-grid">
        <div className="chart-container">
          <h2>Puntuación Promedio por Categoría</h2>
          <div className="chart-wrapper">
            <Bar data={barChartData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
        <div className="chart-container">
          <h2>Distribución de Proyectos por Categoría</h2>
          <div className="chart-wrapper">
            <Pie data={pieChartData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default GraphsPage;