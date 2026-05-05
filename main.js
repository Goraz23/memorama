import "./style.css";

const items = [
  {
    name: "Proteinas",
    pair: "Huevo",
    img: "https://cdn-icons-png.flaticon.com/512/5222/5222963.png",
    info: "Ayudan a formar y reparar tejidos."
  },
  {
    name: "Carbohidratos",
    pair: "Pan",
    img: "https://cdn-icons-png.flaticon.com/512/12651/12651927.png",
    info: "Dan energia al cuerpo."
  },
  {
    name: "Grasas saludables",
    pair: "Aguacate",
    img: "https://cdn-icons-png.flaticon.com/512/765/765633.png",
    info: "Protegen el corazon."
  },
  {
    name: "Vitamina C",
    pair: "Naranja",
    img: "https://cdn-icons-png.flaticon.com/512/2564/2564003.png",
    info: "Ayuda a fortalecer defensas."
  },
  {
    name: "Calcio",
    pair: "Leche",
    img: "https://cdn-icons-png.flaticon.com/512/3500/3500270.png",
    info: "Fortalece huesos y dientes."
  },
  {
    name: "Fibra",
    pair: "Avena",
    img: "https://cdn-icons-png.flaticon.com/512/5098/5098762.png",
    info: "Mejora la digestion."
  }
];


const board = document.getElementById("board");
const infoBox = document.getElementById("info");
const scoreDisplay = document.getElementById("score");
const winMessage = document.getElementById("winMessage");
const sound = document.getElementById("matchSound");

let score = 0;
let matches = 0;
let firstCard = null;
let secondCard = null;
let lockBoard = false;

const cards = items
  .flatMap((item) => [
    { type: "text", id: item.name, content: item.name, info: item.info },
    { type: "image", id: item.name, content: item, info: item.info }
  ])
  .sort(() => Math.random() - 0.5);

function createCardContent(cardData) {
  if (cardData.type === "text") {
    return `<span>${cardData.content}</span>`;
  }

  return `
    <img src="${cardData.content.img}" alt="${cardData.content.pair}">
    <span>${cardData.content.pair}</span>
  `;
}

function resetTurn() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

function updateScore() {
  scoreDisplay.textContent = `Puntos: ${score}`;
}

function handleMatch() {
  score += 1;
  matches += 1;
  updateScore();
  infoBox.textContent = firstCard.data.info;
  sound.currentTime = 0;
  sound.play().catch(() => {});

  firstCard.element.classList.add("matched");
  secondCard.element.classList.add("matched");

  if (matches === items.length) {
    winMessage.textContent = "Ganaste. Completaste todos los pares.";
  }

  resetTurn();
}

function handleMismatch() {
  window.setTimeout(() => {
    firstCard.element.classList.remove("flipped");
    secondCard.element.classList.remove("flipped");
    resetTurn();
  }, 900);
}

function onCardClick(cardElement, cardData) {
  if (lockBoard || cardElement.classList.contains("flipped") || cardElement.classList.contains("matched")) {
    return;
  }

  cardElement.classList.add("flipped");

  if (!firstCard) {
    firstCard = { element: cardElement, data: cardData };
    return;
  }

  secondCard = { element: cardElement, data: cardData };
  lockBoard = true;

  if (firstCard.data.id === secondCard.data.id) {
    handleMatch();
    return;
  }

  handleMismatch();
}

function renderBoard() {
  cards.forEach((cardData) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "card";
    card.setAttribute("aria-label", `Carta ${cardData.type === "text" ? cardData.content : cardData.content.pair}`);
    card.innerHTML = `
      <div class="card-inner">
        <div class="card-face card-front">?</div>
        <div class="card-face card-back">${createCardContent(cardData)}</div>
      </div>
    `;

    card.addEventListener("click", () => onCardClick(card, cardData));
    board.appendChild(card);
  });
}

renderBoard();
updateScore();
