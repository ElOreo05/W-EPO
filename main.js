// Funcionalidad  // JS

document.addEventListener("DOMContentLoaded", () => {
  // 1. Manejo del Plan de Estudios (Semestres)
  window.mostrarSemestre = function (numero) {
    document.querySelectorAll(".contenido-semestre").forEach(el => {
      el.style.display = "none";
    });

    document.querySelectorAll(".semestre-btn").forEach(btn => {
      btn.classList.remove("activo");
    });

    const targetSemestre = document.getElementById(`semestre${numero}`);
    if (targetSemestre) {
      targetSemestre.style.display = "block";
    }

    const botones = document.querySelectorAll(".semestre-btn");
    if (botones[numero - 1]) {
      botones[numero - 1].classList.add("activo");
    }
  };
  
  document.querySelectorAll('.dropdown-submenu > a').forEach(enlace => {
  enlace.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation(); // Detiene el cierre automático de Bootstrap

    const submenuPadre = this.parentElement;

    // Alterna visibilidad del submenú actual
    submenuPadre.classList.toggle('activo');

    // Cierra otros submenús del mismo nivel
    const hermanos = submenuPadre.parentElement.querySelectorAll('.dropdown-submenu');
    hermanos.forEach(hermano => {
      if (hermano !== submenuPadre) {
        hermano.classList.remove('activo');
      }
    });
  });
});

  // 2. Manejo de Becas
  const becasInfo = {
    benito: {
      nombre: "Beca Benito Juárez",
      estatus: "Activa",
      requisitos: "Ser estudiante activo con matrícula oficial vigente.",
      fechas: "Calendario oficial de pagos del Bienestar",
      documentos: ["CURP", "Comprobante de inscripción", "Identificación oficial / Credencial escolar"]
    },
    excelencia: {
      nombre: "Beca de Excelencia Académica",
      estatus: "Activa",
      requisitos: "Promedio mínimo de 9.5 y buena conducta demostrable.",
      fechas: "Apertura de convocatoria semestral",
      documentos: ["Boleta de calificaciones", "Carta de recomendación de la academia"]
    },
    deportiva: {
      nombre: "Beca Deportiva",
      estatus: "Inactiva",
      requisitos: "Participación en equipos representativos de la institución.",
      fechas: "Por confirmar",
      documentos: ["Constancia de participación deportiva", "Certificado médico"]
    }
  };

  document.querySelectorAll(".beca-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-beca");
      const info = becasInfo[key];
      if (!info) return;

      const detalle = document.getElementById("detalle-beca");
      detalle.style.display = "block";
      document.getElementById("beca-nombre").textContent = info.nombre;

      const estatus = document.getElementById("beca-estatus");
      estatus.textContent = info.estatus;
      estatus.style.color = info.estatus === "Activa" ? "#15803d" : "#b91c1c";

      document.getElementById("beca-requisitos").textContent = info.requisitos;
      document.getElementById("beca-fechas").textContent = info.fechas;

      const docList = document.getElementById("beca-documentos");
      docList.innerHTML = "";
      info.documentos.forEach(doc => {
        const li = document.createElement("li");
        li.className = "list-group-item";
        li.textContent = `📄 ${doc}`;
        docList.appendChild(li);
      });
    });
  });

  // 3. Manejo de Documentos en Offcanvas
  window.mostrarDocs = function (semestre, tipo) {
    if (!semestre) return;

    let urlPDF = "";
    if (tipo === "nuevo" && semestre === "1") {
      urlPDF = "pdfs/requisitos1.pdf";
    } else if (tipo === "reinscripcion") {
      urlPDF = "pdfs/requisitos1.pdf";
    } else if (tipo === "transito") {
      urlPDF = "pdfs/transito.pdf";
    }

    if (urlPDF) {
      window.open(urlPDF, "_blank");
    } else {
      alert("No hay archivo disponible para esta opción.");
    }
  };
});
