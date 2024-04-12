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
      description: "Descubre la Bahía de Fornells, un espectacular paraje natural situado en la costa norte de Menorca, donde la calma y <br> la majestuosidad del entorno se combinan para ofrecer una experiencia única. Esta extensa bahía es conocida por <br> sus aguas tranquilas y protegidas, ideal para los entusiastas de los deportes náuticos y para aquellos que buscan <br> un lugar apacible para desconectar del mundo exterior. <br><br> En la Bahía de Fornells, podrás disfrutar de actividades como la vela, el windsurf y el kayak, gracias a <br> las condiciones óptimas que sus aguas ofrecen. La bahía está rodeada de una naturaleza exuberante, <br> con pequeñas calas  accesibles solo por mar y vistas panorámicas que invitan a la exploración. <br> Aquí, el ambiente marino es perfecto para la práctica del snorkel y <br> el buceo, con una rica biodiversidad que espera ser descubierta. <br><br> Más allá de su belleza natural, la Bahía de Fornells es el destino ideal para ti que buscas sumergirte <br> en una atmósfera relajada y enriquecedora. <br> Ya sea que prefieras navegar por las aguas serenas, explorar los senderos que bordean la bahía <br> o simplemente disfrutar de un buen libro en alguna de sus terrazas con vistas al mar. <br> Con su encanto único, esta bahía es verdaderamente un santuario para aquellos que anhelan paz.",
      imageUrl: '/Bahiafornells.jpg'
    },
    Variante2: {
      title: "Cala Galdana",
      description: "Descubre Cala Galdana, un encantador rincón en la costa sur de Menorca, donde la tranquilidad y la exquisita belleza <br> del entorno te cautivarán. Esta bahía en forma de concha es famosa por sus aguas turquesas y su arena blanca, <br> ofreciendo un ambiente idílico para todos aquellos que buscan un retiro sereno lejos de la rutina diaria. <br><br> En Cala Galdana, podrás sumergirte en el deleite de su playa amplia y acogedora, flanqueada por acantilados <br> cubiertos de pinos que aportan un aire fresco y puro. El mar, tranquilo y limpio, invita a largos baños y a la práctica <br> de deportes acuáticos suaves, como el paddle surf o el kayak. Además, esta cala es un punto de partida excelente <br> para excursiones a pie a playas cercanas, donde la naturaleza muestra su lado más virgen y espectacular. <br><br> Más allá de su impresionante paisaje, Cala Galdana es perfecta para ti que deseas disfrutar <br> de momentos de paz y conexión con la naturaleza, sin renunciar a las comodidades. <br> Tanto si prefieres relajarte bajo el sol en la suavidad de su arena, recorrer los caminos que <br> rodean la cala, o simplemente disfrutar de las vistas al mar desde un café cercano. <br> Con su encanto particular, esta playa es verdaderamente un paraíso para quienes buscan calma y belleza intacta.",
      imageUrl: '/Calagaldana.jpg'
    },
    Variante3: {
      title: "Son Saura",
      description: "Descubre Son Saura, una joya escondida entre las costas de Menorca, donde la serenidad y la belleza pura dominan <br> el paisaje. Esta playa virgen y apartada es el refugio perfecto para ti que buscas un escape del ajetreo diario. <br><br> En Son Saura, podrás disfrutar de una extensa franja de arena suave y dorada,  rodeada de aguas cristalinas <br> que te invitan a sumergirte y relajarte. Inmersa en un paisaje natural protegido, esta playa se <br> convierte en un santuario para la vida silvestre, donde es común observar aves marinas y, de vez en cuando, <br> tortugas marinas que llegan a la costa para anidar. <br><br> Más allá de su belleza natural, Son Saura es el lugar ideal para ti que deseas conectar de forma más íntima <br> y personal con la naturaleza. <br> Ya sea que prefieras broncearte en la calma de la playa, explorar los senderos costeros <br> o simplemente sentarte a contemplar el vasto horizonte, Son Saura te ofrece una experiencia revitalizante e inolvidable. <br> Con su atmósfera única, esta playa es verdaderamente un paraíso para quienes anhelan tranquilidad y belleza natural.",
      imageUrl: '/Sonsaura.jpg'
    },    
  };

// Selecciona y añade la información de la ubicación basada en la variante
if (locationVariant && locationDetails[locationVariant]) {
  const { title, description, imageUrl } = locationDetails[locationVariant];
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');  // Cambia la fuente a negrita

  // Calcula el centro del título
  const pageWidth = doc.internal.pageSize.getWidth();
  const titleWidth = doc.getStringUnitWidth(title) * doc.internal.getFontSize() / doc.internal.scaleFactor;
  const titleX = (pageWidth - titleWidth) / 2;

// Establece el título centrado y en negrita
doc.text(title, titleX, currentY);
currentY += 10; // Ajuste de posición Y con más margen para el texto siguiente

doc.setFont('helvetica', 'normal');  // Vuelve a la fuente normal para el resto del texto
const descriptionLines = description.split('<br>');
doc.setFontSize(10);
descriptionLines.forEach(line => {
  doc.text(line.trim(), 14, currentY);
  currentY += 6; // Incrementa Y para el siguiente texto
});

// Añadir la imagen con un margen en la parte superior
const imageWidth = 150;
const imageHeight = 90;
const centerX = (pageWidth - imageWidth) / 2;
const marginTop = 0.5; // Margen superior de la imagen
doc.addImage(imageUrl, 'JPEG', centerX, currentY + marginTop, imageWidth, imageHeight);
currentY += imageHeight + marginTop + 0; // Ajuste después de la imagen
}



  const date = new Date().toLocaleDateString('es-ES').split("/");
  // Formato de fecha en el nombre del archivo: "Plan_de_Viaje_DD-MM-AAAA"
  const dateStr = `${date[0]}-${date[1]}-${date[2]}`;

  // Guarda el PDF
  doc.save(`Plan_de_Viaje_${dateStr}.pdf`);
};
