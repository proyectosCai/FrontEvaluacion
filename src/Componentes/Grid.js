import React from 'react';
import { Link } from 'react-router-dom';
import '../Grid.css';

function Grid() {
  const boxes = [
    { nombre: 'ANALISIS Y DESARROLLO DE SOFTWARE', Ficha: '2621337'},
    { nombre: 'AUTOMATIZACION DE SISTEMAS MECATRONICOS', Ficha: '2621334'},
    { nombre: 'PROGRAMACION PARA ANALITICA DE DATOS', Ficha: '2823632'},
    { nombre: 'MANTENIMIENTO E INSTALACION DE SISTEMAS SOLARES FOTOVOLTAICOS', Ficha: '2869920'},
    { nombre: 'PRODUCCION DE COMPONENTES MECANICOS CON MAQUINAS DE CONTROL NUMERICO COMPUTARIZADO', Ficha: '2554986'},
    { nombre: 'IMPLEMENTACION DE INFRAESTRUCTURA DE TECNOLOGIAS DE LA INFORMACION Y LAS COMUNICACIONES', Ficha: '2554992'},
    { nombre: 'PROCESOS DE MANUFACTURA', Ficha: '2711629'},
  ]

  return (
    <div className="grid">
          {boxes.map(boxItem=> (
        <Link 
          key={boxItem.Ficha} 
          to={`/box/${boxItem.Ficha}`} 
          className="grid-box"
        >
            <div className="box-content">
            <span className="nombre">{boxItem.nombre}</span>
            <span className="ficha">{boxItem.Ficha}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Grid;