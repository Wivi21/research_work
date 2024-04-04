import { jsPDF } from "jspdf";
import "jspdf-autotable";

export const GenerateAndDownloadPDF = (respuestas, preguntas, price, locationVariant) => {
  // Crea una instancia de jsPDF
  const doc = new jsPDF();

  // Define las columnas de la tabla
  const tableColumn = ["Pregunta", "Respuesta"];

  // Transforma las respuestas en un formato adecuado para autotable
  const tableRows = Object.keys(respuestas).map((key) => {
    const pregunta = preguntas.find((p) => p.id === key).report;
    const respuesta = respuestas[key];
    return [pregunta, respuesta];
  });

  // Añade el precio total a las filas de la tabla
  tableRows.push(["Precio total", `${price} €`]);

  // Añade la tabla al documento
  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  let currentY = doc.lastAutoTable.finalY + 10;

  // Información específica sobre cada ubicación
  const locationDetails = {
    Variante1: {
      title: "Bahía de Fornells",
      description: "Una bahía tranquila y protegida, ideal para los amantes de los deportes acuáticos. Ofrece vistas espectaculares y una rica vida marina."
    },
    Variante2: {
      title: "Cala Galdana",
      description: "Conocida por sus aguas turquesas y arena blanca, Cala Galdana es una de las playas más bellas de Menorca, perfecta para familias."
    },
    Variante3: {
      title: "Son Saura",
      description: "Una playa virgen y aislada, Son Saura es un paraíso para quienes buscan tranquilidad y un contacto íntimo con la naturaleza."
    },
  };

  // Selecciona y añade la información de la ubicación basada en la variante
  if (locationVariant && locationDetails[locationVariant]) {
    const { title, description } = locationDetails[locationVariant];
    doc.setFontSize(12);
    doc.text(title, 14, currentY);
    currentY += 6; // Ajuste de posición Y para el texto siguiente
    doc.setFontSize(10);
    doc.text(description, 14, currentY);
  }

  const date = Date().split(" ");
  // Formato de fecha en el nombre del archivo: "Plan_de_Viaje_DD-MM-AAAA"
  const dateStr = `${date[2]}-${date[1]}-${date[3]}`;

  // Guarda el PDF
  doc.save(`Plan_de_Viaje_${dateStr}.pdf`);
};
