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

let cards = [];
let score = 0;
let matches = 0;

items.forEach(item => {
    cards.push({ type: "text", content: item.name, id: item.name, info: item.info });
    cards.push({ type: "image", content: item, id: item.name, info: item.info });
});

cards.sort(() => 0.5 - Math.random());

const board = document.getElementById("board");
const infoBox = document.getElementById("info");
const scoreDisplay = document.getElementById("score");
const winMessage = document.getElementById("winMessage");
const sound = document.getElementById("matchSound");

let firstCard = null;
let secondCard = null;
let lock = false;

cards.forEach(cardData => {
    const card = document.createElement("div");
    card.classList.add("card");

    let content = "";

    if (cardData.type === "text") {
        content = `<span>${cardData.content}</span>`;
    } else {
        content = `
            <img src="${cardData.content.img}" alt="${cardData.content.pair}">
            <span>${cardData.content.pair}</span>
        `;
    }

    card.innerHTML = `
        <div class="card-inner">
            <div class="card-front"></div>
            <div class="card-back">${content}</div>
        </div>
    `;

    card.addEventListener("click", () => {
        if (lock || card.classList.contains("flipped")) return;

        card.classList.add("flipped");

        if (!firstCard) {
            firstCard = { element: card, data: cardData };
        } else {
            secondCard = { element: card, data: cardData };
            lock = true;

            if (firstCard.data.id === secondCard.data.id) {
                score++;
                matches++;
                scoreDisplay.textContent = "Puntos: " + score;
                infoBox.textContent = firstCard.data.info;
                sound.currentTime = 0;
                sound.play().catch(() => {});

                if (matches === items.length) {
                    winMessage.textContent = "🎉 ¡Ganaste! 🎉";
                }

                firstCard = null;
                secondCard = null;
                lock = false;
            } else {
                setTimeout(() => {
                    firstCard.element.classList.remove("flipped");
                    secondCard.element.classList.remove("flipped");
                    firstCard = null;
                    secondCard = null;
                    lock = false;
                }, 900);
            }
        }
    });

    board.appendChild(card);
});
