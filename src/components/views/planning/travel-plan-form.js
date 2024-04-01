'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {GenerateAndDownloadPDF} from '@/functions'

const preguntas = [
  { id: 'question1', label: 'Pregunta 1: ¿Cuántas personas harán el viaje?', options: ['4 Personas', '6 Personas', '8 Personas'] },
  { id: 'question2', label: 'Pregunta 2: ¿Duración de la estancia?', options: ['2 Semanas', '1 Mes', '2 Meses'] },
  { id: 'question3', label: 'Pregunta 3: ¿En qué embarcación se hará?', options: ['Velero', 'Catamaran', ''] },
  { id: 'question4', label: 'Pregunta 4: ¿Cómo se gestionarán los suministros?', options: ['1r Metodo (Digny)', '2n Metodo (Kayak)', '3r Metodo (Paddle Surf)'] },
  { id: 'question5', label: 'Pregunta 5: ¿Cuál es la ubicación elegida?', options: ['Bahia de Fornells', 'Cala Galdana', 'Son Saura'] },
  { id: 'question6', label: 'Pregunta 6:  ¿Cómo se obtendrá la comida?', options: ['Compra en tierra', 'Mediante pesca', ''] },
  { id: 'question7', label: 'Pregunta 7: ¿De qué manera se obtendrá la energía?', options: ['Placas Solares', 'Eolica', 'Generador de gasolina'] },
];

export const TravelPlanForm = () => {
  const [respuestas, setRespuestas] = useState(preguntas.reduce((acc, pregunta) => ({ ...acc, [pregunta.id]: '' }), {}));

  const handleInputChange = (id, value) => {
    setRespuestas(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    GenerateAndDownloadPDF(respuestas, preguntas);
  };


  return (
    <div className="min-h-screen flex flex-wrap items-center justify-center bg-gray-100" style={{
      backgroundImage: "url(/menorca.jpg)",
      backgroundSize: 'cover'
    }}>
      <div className="w-full lg:w-1/2">
        {/* <img src="/menorca.jpg" alt="Imagen descriptiva del viaje" className="hidden lg:block object-cover h-full w-full" /> */}
      </div>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full lg:w-1/2 p-8"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold text-center mb-6">Plan de Viaje</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {preguntas.map(({ id, label, options }) => (
              <div key={id} className="flex flex-col">
                <label htmlFor={id} className="mb-2 font-medium text-gray-900">{label}</label>
                <select
                  id={id}
                  name={id}
                  className="form-select appearance-none block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={respuestas[id]}
                  onChange={(e) => handleInputChange(id, e.target.value)}
                >
                  <option value="">Selecciona una opción</option>
                  {options.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            ))}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 px-6 border border-transparent shadow-sm text-md font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              type="submit"
            >
              Enviar
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};
