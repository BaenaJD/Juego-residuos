// Definir los residuos con nombres, tipos y emojis
const residuos = [
  { nombre: "📰 Periódico", tipo: "Aprovechables" },
  { nombre: "🥫 Lata de refresco", tipo: "Aprovechables" },
  { nombre: "🧴 Botella de plástico", tipo: "Aprovechables" },
  { nombre: "🍌 Cáscara de banano", tipo: "Orgánicos" },
  { nombre: "🍾 Botella de vidrio", tipo: "Aprovechables" },
  { nombre: "🔋 Pila", tipo: "Peligrosos" },
  { nombre: "📦 Cartón", tipo: "Aprovechables" },
  { nombre: "🔩 Puntillas", tipo: "Aprovechables" },
  { nombre: "🛍️ Bolsa de plástico", tipo: "Aprovechables" },
  { nombre: "🍎 Restos de comida", tipo: "Orgánicos" },
  { nombre: "🥃 Frasco de vidrio", tipo: "Aprovechables" },
  { nombre: "💨 Gaza usada", tipo: "Peligrosos" },
  { nombre: "📖 Revista", tipo: "Aprovechables" },
  { nombre: "🥫 Lata de conserva", tipo: "Aprovechables" },
  { nombre: "🥤 Envase de yogur", tipo: "Aprovechables" },
  { nombre: "🍂 Hojas secas", tipo: "Orgánicos" },
  { nombre: "🍷 Copa de vidrio", tipo: "Aprovechables" },
  { nombre: "💊 Medicamentos", tipo: "Peligrosos" },
  { nombre: "🗒️ Hoja de papel", tipo: "Aprovechables" },
  { nombre: "🔧 Tornillos", tipo: "Aprovechables" },
  { nombre: "🥛 Vaso plástico", tipo: "Aprovechables" },
  { nombre: "🥚 Cáscaras de huevo", tipo: "Orgánicos" },
  { nombre: "☕ Taza rota", tipo: "Aprovechables" },
  { nombre: "🛢️ Aceite usado", tipo: "Peligrosos" },
  { nombre: "📦 Caja de zapatos", tipo: "Aprovechables" },
  { nombre: "🗝️ Llaves viejas", tipo: "Aprovechables" },
  { nombre: "🧃 Botella PET", tipo: "Aprovechables" },
  { nombre: "🍏 Manzana mordida", tipo: "Orgánicos" },
  { nombre: "🪩 Vidrio roto", tipo: "Aprovechables" },
  { nombre: "🔋 Batería de celular", tipo: "Peligrosos" },
];

let puntuacion = 0;
let intentos = residuos.length;
let tiempoRestante = 60;
let juegoIniciado = false;

// Elementos HTML
const basuraElemento = document.getElementById("basura");
const mensajeElemento = document.getElementById("mensaje");
const temporizadorElemento = document.getElementById("temporizador");
const reinicioBoton = document.getElementById("reinicio");
const globosContenedor = document.getElementById("globos");

let temporizador;

// Mostrar el mensaje de instrucción al cargar el juego
mensajeElemento.innerText = "Desliza el primer residuo para comenzar";

// Función para generar un residuo aleatorio con nombre y emoji
function generarBasura() {
  const residuoAleatorio = residuos[Math.floor(Math.random() * residuos.length)];
  basuraElemento.innerText = `${residuoAleatorio.nombre}`;
  basuraElemento.dataset.tipo = residuoAleatorio.tipo;

  basuraElemento.style.backgroundColor =
    residuoAleatorio.tipo === "Aprovechables"
      ? "#a0c4ff"
      : residuoAleatorio.tipo === "Orgánicos"
      ? "#ffd6a5"
      : residuoAleatorio.tipo === "No Aprovechables"
      ? "#6c757d"
      : "#ff7f7f";
}

// Función para iniciar el temporizador
function iniciarTemporizador() {
  temporizador = setInterval(() => {
    tiempoRestante--;
    temporizadorElemento.innerText = `Tiempo: ${tiempoRestante}`;
    if (tiempoRestante <= 0) {
      clearInterval(temporizador);
      finalizarJuego();
    }
  }, 1000);
}

// Configuración de arrastrar y soltar
basuraElemento.addEventListener("dragstart", (evento) => {
  if (!juegoIniciado) {
    // Iniciar el juego cuando el usuario interactúa por primera vez
    juegoIniciado = true;
    mensajeElemento.innerText = ""; // Eliminar el mensaje de instrucciones
    iniciarTemporizador(); // Iniciar el temporizador
  }
  evento.dataTransfer.setData("tipo", basuraElemento.dataset.tipo);
  evento.dataTransfer.setData("nombre", basuraElemento.innerText);
});

document.querySelectorAll(".caneca").forEach((caneca) => {
  caneca.addEventListener("dragover", (evento) => evento.preventDefault());

  caneca.addEventListener("drop", (evento) => {
    const tipoBasura = evento.dataTransfer.getData("tipo");
    const nombreBasura = evento.dataTransfer.getData("nombre");

    if (tipoBasura === caneca.getAttribute("data-tipo")) {
      puntuacion++;
      mensajeElemento.innerText = `¡Correcto! Puntuación: ${puntuacion}`;
      generarBasura(); // Cambiar la basura por una nueva
    } else {
      puntuacion -= 1; // Se resta la mitad de un punto
      mensajeElemento.innerText = `¡Incorrecto! El residuo "${nombreBasura}" pertenece a la categoría "${tipoBasura}".`;
    }
  });
});

// Función para finalizar el juego
function finalizarJuego() {
  const puntajeMinimo = intentos * 0.6;
  if (puntuacion >= puntajeMinimo) {
    mensajeElemento.innerText = "¡Ganaste! 🎉";
    mostrarGlobos();
  } else {
    mensajeElemento.innerText = "Perdiste. Intenta de nuevo.";
    reinicioBoton.style.display = "block";
  }
}

// Mostrar globos animados
function mostrarGlobos() {
  globosContenedor.style.display = "block";
  for (let i = 0; i < 20; i++) {
    const globo = document.createElement("div");
    globo.className = "globo";
    globo.style.left = `${Math.random() * 100}%`;
    globo.innerText = "🎈";
    globosContenedor.appendChild(globo);
    setTimeout(() => globo.remove(), 4000);
  }
}

// Reiniciar el juego
reinicioBoton.addEventListener("click", () => {
  location.reload(); // Recargar la página para reiniciar el juego
});

// Inicializar el juego generando el primer residuo (sin iniciar el temporizador)
generarBasura();
