"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { GenerateAndDownloadPDF } from "@/functions";

const questions = [
  {
    id: "question1",
    label: "¿Cuántas personas harán el viaje?",
    options: ["4 Personas", "6 Personas", "8 Personas"],
    report: "Personas",
  },
  {
    id: "question2",
    label: "¿Duración de la estancia?",
    options: ["2 Semanas", "4 Semanas", "6 Semanas"],
    report: "Duración",
  },
  {
    id: "question3",
    label: "¿En qué embarcación se hará?",
    options: ["Velero", "Catamaran"],
    report: "Embarcación",
  },
  {
    id: "question4",
    label: "¿Cómo se gestionarán los suministros?",
    options: [
      "1r Metodo (Digny/Zodiac)",
      "2n Metodo (Kayak)",
      "3r Metodo (Paddle Surf)",
    ],
    report: "Suministros",
  },
  {
    id: "question5",
    label: "¿Cuál es la ubicación elegida?",
    options: ["Bahia de Fornells", "Cala Galdana", "Son Saura"],
    report: "Ubicación",
  },
  {
    id: "question6",
    label: "¿Cómo se obtendrá la comida?",
    options: ["Compra en tierra", "Mediante pesca"],
    report: "Comida",
  },
  {
    id: "question7",
    label: "¿De qué manera se obtendrá la energía?",
    options: ["Placas Solares", "Eolica", "Generador de gasolina"],
    report: "Energía",
  },
];

export const TravelPlanForm = () => {
  const [responses, setResponses] = useState(
    questions.reduce((acc, question) => ({ ...acc, [question.id]: "" }), {})
  );
  const [price, setPrice] = useState(0);
  const [showButton, setShowButton] = useState(false);
  // Nuevo estado para almacenar la variante de la ubicación
  const [locationVariant, setLocationVariant] = useState("");

  const handleInputChange = (id, value) => {
    const newResponses = { ...responses };
    newResponses[id] = value;
    setResponses({ ...newResponses });
  
    // Actualiza el botón de mostrar basado en la respuesta a la última pregunta
    if (newResponses[questions[6].id] !== "") setShowButton(true);
    else setShowButton(false);
  
    // Actualiza el estado de locationVariant basado en la respuesta a question5
    if (id === "question5") {
      switch (value) {
        case "Bahia de Fornells":
          setLocationVariant("Variante1");
          break;
        case "Cala Galdana":
          setLocationVariant("Variante2");
          break;
        case "Son Saura":
          setLocationVariant("Variante3");
          break;
        // Omitido el caso default para no resetear el valor
      }
    }
  
    // Aquí reintegramos la lógica para calcular el precio
    let calculatedPrice = 0;
  
    if (newResponses["question1"]) {
      calculatedPrice += newResponses["question1"].includes("4") ? 1000 : newResponses["question1"].includes("6") ? 1500 : 2000;
    }
    if (newResponses["question2"]) {
      calculatedPrice += newResponses["question2"].includes("2 Semanas") ? 500 : newResponses["question2"].includes("4 Semanas") ? 1000 : 1500;
    }
    if (newResponses["question3"]) {
      calculatedPrice += newResponses["question3"].includes("Velero") ? 300 : 600;
    }
    // Continúa con el resto de preguntas para calcular el precio...
    
    // No olvides incluir la lógica para calcular la variación del precio basado en la ubicación si es necesario
  
    // Finalmente, actualiza el estado del precio
    setPrice(calculatedPrice);
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    GenerateAndDownloadPDF(responses, questions, price, locationVariant); // Asegúrate de que esta función maneje el nuevo estado si es necesario
  };

  return (
    <div
      className="min-h-screen flex flex-wrap items-center justify-center bg-gray-100"
      style={{
        backgroundImage: "url(/menorca.jpg)",
        backgroundSize: "cover",
      }}
    >
      <div className="w-full lg:w-1/2"></div>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full lg:w-1/2 p-8"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold text-center mb-6">Plan de Viaje</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {questions
              .reduce((acc, question, index) => {
                if (index === 0 || responses[questions[index - 1].id] !== "") {
                  acc.push(question);
                }
                return acc;
              }, [])
              .map(({ id, label, options }) => (
                <div key={id} className="flex flex-col">
                  <label
                    htmlFor={id}
                    className="mb-2 font-medium text-gray-900"
                  >
                    {label}
                  </label>
                  <select
                    id={id}
                    name={id}
                    className="form-select appearance-none block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    onChange={(e) => handleInputChange(id, e.target.value)}
                  >
                    {responses[id] !== "" ? null : (
                      <option value="">Selecciona una opción</option>
                    )}
                    {options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            {showButton ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 px-6 border border-transparent shadow-sm text-md font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                type="submit"
              >
                Crear Planning
              </motion.button>
            ) : null}
          </form>
        </div>
      </motion.div>
    </div>
  );
};