// ProjectPage.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from 'react-modal';
import '../ProjectPage.css';

Modal.setAppElement('#root');

function ProjectPage() {
  const { boxNumber, projectId } = useParams();
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [evaluator, setEvaluator] = useState('');
  const [scores, setScores] = useState({});
  const [totalScores, setTotalScores] = useState({});
  const [showThankYou, setShowThankYou] = useState(false);



  const submitEvaluation = async () => {
    const evaluationData = {
      Nombre: "Proyectos Formativos 2° Trimestre",
      Fecha: Date.now,
      Proyecto: projectId,
      Ficha:boxNumber,   
      Evaluador: evaluator,
      Creatividad: parseInt(totalScores['Creatividad']),
      RSA: parseInt(totalScores['Responsabilidad social y ambiental']) ,
      PyC: parseInt(totalScores['Presentación y comunicación']),
      EyC: parseInt(totalScores['Estructura y contenido']),
      
    };

    console.log("data: ", evaluationData)
    
    try {
      const response = await fetch('http://localhost:3000/evento', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(evaluationData),
      });

      if (response.ok) {
        setShowThankYou(true);
        setTimeout(() => {
          setShowThankYou(false);
          closeModal();
          navigate('/rate-project');
        }, 2000);
        console.log('Enviado');
      } else {
        console.error('Error al enviar la evaluación');
        // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje al usuario
      }
    } catch (error) {
      console.error('Error:', error);
      // Aquí puedes manejar el error de red, por ejemplo, mostrando un mensaje al usuario
    }
  };

  // Este objeto debería ser el mismo que en BoxPage.js
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

  const projects = projectsByFicha[boxNumber] || [];
  const project = projects.find(p => p.name );

  const categories = [
    { name: "Creatividad", color: "#e74c3c", questions: ["¿El proyecto presenta ideas nuevas o una aproximación novedosa para la soluciopn de la necesidad o problema?",
       "¿Los aprendices han utilizado enfoques originales para abordar los desafíos presentados por el proyecto?",
      "¿Los aprendices han utilizado recursos disponibles de manera original, creativa y novedosa para alcanzar los objetivos del proyecto?",
    "¿La creatividad demostrada por los aprendices han contribuido de manera significativa al éxito y la efectividad del proyecto en general?",] },
    { name: "Responsabilidad social y ambiental", color: "#2ecc71", questions: 
      ["¿El proyecto aborda los desafíos sociales locales o globales, como la equidad de género, la inclusión social, la educación, la salud o la reducción de la pobreza?", 
        "¿El proyecto considera medidas para mitigar los posibles impactos negativos en el medio ambiente y la comunidad local, así como para maximizar los beneficios sociales y ambientales?",
      "¿El proyecto esta dirigido puntualmente a  impactar positivamente la responsabilidad social, el compromiso ambiental o la seguridad y salud en el trabajo?",
    "¿El proyecto  identifica, evalúa y aborda los posibles riesgos laborales para garantizar un entorno de trabajo seguro y saludable para todos los involucrados en su implementación?"] },
    { name: "Presentación y comunicación", color: "#f39c12", questions: 
      ["¿La presentación del proyecto es clara y organizada, facilitando la comprensión de los objetivos, metodología, resultados y conclusiones por parte de la audiencia?",
         "¿El lenguaje utilizado en la presentación es adecuado para el público objetivo, evitando jergas técnicas innecesarias y asegurando que la información sea accesible para todos los espectadores?",
        "¿Se utilizan medios visuales de manera efectiva, como gráficos, imágenes o videos, para complementar y reforzar la información presentada, mejorando la comprensión y retención del contenido?",
      "¿La comunicación verbal y no verbal del presentador es clara, segura y persuasiva, transmitiendo confianza en el proyecto y generando interés por parte de la audiencia?"] },
    { name: "Estructura y contenido", color: "#9b59b6", questions: 
      ["¿El planteamiento del problema es claro y preciso, proporcionando una comprensión adecuada de la situación que el proyecto pretende abordar y su relevancia?", 
        "¿La justificación del proyecto es sólida y convincente, demostrando la necesidad del desarrollo del proyecto y destacando su importancia para la comunidad o el contexto relevante?",
      "¿Los objetivos del proyecto son precisos, tiene secuencia lógica, son medibles y alcanzables?",
    "¿El desarrollo metodológico es ordenado y preciso, describe claramente las técnicas, métodos, recursos utilizados para la cumplimiento de las actividades?",
  "¿Los resultados y/o productos presentados son coherentes con los objetivos establecidos y proporcionan evidencia clara del impacto y la efectividad del proyecto en relación con el problema identificado?"] }
  ];

  useEffect(() => {
    const newTotalScores = {};
    Object.keys(scores).forEach(category => {
      const categoryScores = Object.values(scores[category]).map(Number);
      const total = categoryScores.reduce((sum, score) => sum + score, 0);
      newTotalScores[category] = total;
    });
    setTotalScores(newTotalScores);
  }, [scores]);

  const openModal = (category) => {
    setCurrentCategory(category);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentCategory(null);
  };

  const handleScoreChange = (question, score) => {
    setScores(prev => ({
      ...prev,
      [currentCategory.name]: {
        ...prev[currentCategory.name],
        [question]: score
      }
    }));
  };

  const submitEvaluation2= () => {
    const evaluationData = {
      boxNumber,
      projectName: projectId,
      evaluator,
      scores,
      totalScores
    };
    
    // Aquí deberías enviar evaluationData a tu backend
    console.log('Datos de evaluación:', evaluationData);
    console.log('REA:',totalScores['Responsabilidad social y ambiental'] )
    
    // Cerrar el modal y reiniciar los estados
    closeModal();
    setScores({});
    setEvaluator('');
  };

  if (!project) {
    return <div>Proyecto no encontrado</div>;
  }

  return (
    <div>
      <div className="category-grid">
        <h1>Proyecto: 
        <br/>{projectId}</h1>
        <h1>Ficha: 
      <br/>{boxNumber}</h1>
        </div>
      
      <div className="category-grid">
        {categories.map(category => (
          <button 
            key={category.name} 
            onClick={() => openModal(category)}
            className="category-box"
            style={{ backgroundColor: category.color }}
          >
            <span>{category.name}</span>
            
          </button>
        ))}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Evaluación Modal"
        className="modal-content"
        overlayClassName="modal-overlay"
      > {showThankYou ? (
        <div className="thank-you-message">
          <h2>¡Gracias por su evaluación!</h2>
        </div>
      ) : (
        <>
        <h2>{currentCategory?.name}</h2>
        <select value={evaluator} onChange={(e) => setEvaluator(e.target.value)}>
          <option value="">Evaluador</option>
          <option value="Evaluador 1">Diana Carolina Vargas</option>
          <option value="Evaluador 2">Carlos Alejandro Ramírez</option>
          <option value="Evaluador 3">Christian Zetty</option>
          <option value="Evaluador 3">Nicky Gómez</option>
          <option value="Evaluador 3">Lorena Perdomo</option>
          <option value="Evaluador 3">Mónica Montoya</option>
          <option value="Evaluador 3">Julian Gómez</option>
          <option value="Evaluador 3">Andrés Espitia</option>
          <option value="Evaluador 3">Andrea Cotrini</option>
          <option value="Evaluador 3">Carolina Gálvez</option>

          
        </select>
        {currentCategory?.questions.map(question => (
          <div key={question} className="question-container">
            <p>{question}</p>
            <div className="radio-group">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(score => (
                <label key={score} className="radio-label">
                  <input 
                    type="radio" 
                    name={question}
                    value={score}
                    checked={scores[currentCategory.name]?.[question] === score.toString()}
                    onChange={(e) => handleScoreChange(question, e.target.value)}
                  />
                  <span>{score}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
        <div className="button-group">
          <button onClick={submitEvaluation}>Enviar Evaluación</button>
          <button onClick={closeModal}>Cerrar</button>
        </div>
        </>)}
      </Modal>
    </div>
  );
}

export default ProjectPage;