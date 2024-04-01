import jsPDF from "jspdf";
import "jspdf-autotable";

export const GenerateAndDownloadPDF = (respuestas, preguntas) => {
  // Crea una instancia de jsPDF
  const doc = new jsPDF();

  // Define las columnas de la tabla
  const tableColumn = ["Pregunta", "Respuesta"];
  // Transforma las respuestas en un formato adecuado para autotable
  const tableRows = Object.keys(respuestas).map((key) => {
    const pregunta = preguntas.find((p) => p.id === key).label;
    const respuesta = respuestas[key];
    return [pregunta, respuesta];
  });

  // Añade la tabla al documento
  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  const date = Date().split(" ");
  // Formato de fecha en el nombre del archivo: "Plan_de_Viaje_20-04-2023"
  const dateStr = `${date[2]}-${date[1]}-${date[3]}`;
  
  // Guarda el PDF
  doc.save(`Plan_de_Viaje_${dateStr}.pdf`);
};
