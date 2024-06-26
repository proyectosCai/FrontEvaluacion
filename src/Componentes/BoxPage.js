// BoxPage.js
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import '../BoxPage.css';

function BoxPage() {
  const { boxNumber } = useParams();

  // Objeto que mapea cada número de ficha a sus proyectos
  const projectsByFicha = {
    '2621337': [
      { id: 1, name: "Aplicativo Web para asignación de mesa y toma de pedidos en restaurantes" },
      { id: 2, name: "Aplicativo Web para la administración y almacenamiento de proyectos formativos en el centro de Automatización Industrial" },
      { id: 3, name: "Prototipo Web para el aprendizaje de Ingles Técnico" },
      { id: 4, name: "Ampliación Web para mejorar el manejo de los recursos aprovechables" },
      { id: 5, name: "Sena English Test Platform" },
    ],
    '2621334': [
      { id: 1, name: "Innovación en incubación Automática" },
      { id: 2, name: "Restauración Automec" },
      { id: 3, name: "Sistema modular de producción  Distribuiting" },
      { id: 4, name: "Sistema Modular de producción  Sorfting" },
      { id: 5, name: "Desarrollo de prototipo de robot desinfectante en ambientes agroindustriales" },
      
    ],
    '2823632': [
      { id: 1, name: "D.I.A.(desarrollo investigación y análisis)" },
      { id: 2, name: "Data Fight" },
      { id: 3, name: "BR EVENTS" },
      { id: 4, name: "Logic test" },
      { id: 5, name: "Sale analitic" },
      { id: 6, name: "S.A.M Insights" },
      { id: 7, name: "PDevelopers JEJ" },

    ],
    '2869920': [
      { id: 1, name: "Repotenciación Punto Ecológico" },
      { id: 2, name: " Cámaras de seguridad aplicando sistema solar fotovoltaico" },
      { id: 3, name: "Sistema de potabilización de agua " },
      { id: 4, name: "Repotenciación de Sistemas de Inyección a red del Ecoparque de Energías renovables del Sena Regional Caldas" },
      { id: 5, name: "Sistema de iluminación en el ecoparque tecnológico SENA regional Caldas" },
      { id: 6, name: "Cerca eléctrica fotovoltaica " },

    ],
    '2711629': [
      { id: 1, name: "Maracoffee" },
      { id: 2, name: "Energy Vida" },
      { id: 3, name: "Chocotentación" },
      { id: 4, name: "Cupcake granulado" },

    ],
    '2554992': [
      { id: 1, name: "PLAN PILOTO VLAN L'ANTIC" },
    
    ],
    '2554986': [
      { id: 1, name: "Vulcanizadora de silicona" },
      { id: 2, name: "Máquina peladora de cocos" },
      { id: 3, name: "Trituradora e Inyectora de plástico" },

    ],
  };

  // Obtiene los proyectos para la ficha actual
  const projects = projectsByFicha[boxNumber] || [];

  return (
    <div>
      <h1>Proyectos de la Ficha {boxNumber}</h1>
      {projects.length > 0 ? (
        <div className="project-grid">
          {projects.map(project => (
            <Link 
              key={project.id} 
              to={`/box/${boxNumber}/project/${project.name}`}
              className="project-box"
            >
              {project.name}
            </Link>
          ))}
        </div>
      ) : (
        <p>No hay proyectos disponibles para esta ficha.</p>
      )}
    </div>
  );
}

export default BoxPage;