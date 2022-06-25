let firstSelectedEl, secondSelectedEl;

let cards = [
  { id: 1, src: "./img/shape_1.png" },
  { id: 2, src: "./img/shape_2.png" },
  { id: 3, src: "./img/shape_3.png" },
  { id: 4, src: "./img/shape_4.png" },
  { id: 5, src: "./img/shape_5.png" },
  { id: 6, src: "./img/shape_6.png" },
  { id: 7, src: "./img/shape_7.png" },
  { id: 8, src: "./img/shape_8.png" },
];

let duplicateCards = [...cards, ...cards];
let dealingCards = [];

const selectRandomCard = () => {
  let randomCardOrder = Math.round(Math.random() * duplicateCards.length - 1);
  return duplicateCards.splice(randomCardOrder, 1);
};

const dealCards = () => {
  for (let i = 0; i < 16; i++) {
    dealingCards = [...dealingCards, ...selectRandomCard()];
  }
};

const drawCards = () => {
  dealCards();
  const cardContainerEl = document.querySelector(".card__container");

  let cardItemsHtml = ``;
  dealingCards.forEach((item) => {
    cardItemsHtml += `<img class="card animate__animated" 
        src="${item.src}"
        data-id="${item.id}"
        onclick="selectCard(this)"/>`;
  });

  cardContainerEl.innerHTML = cardItemsHtml;
};

drawCards();

const selectCard = (el) => {
  if (!el.classList.contains("open")) {
    el.classList.add("open", "animate__flipInY");

    if (firstSelectedEl) {
      secondSelectedEl = el;

      checkSelectedCards(firstSelectedEl, secondSelectedEl);

      firstSelectedEl = null;
      secondSelectedEl = null;
    } else {
      firstSelectedEl = el;
    }
  }
};

const checkSelectedCards = (checkFirstEl, checkSecondEl) => {
  if (checkFirstEl.dataset.id != checkSecondEl.dataset.id) {
    checkFirstEl.classList.remove("animate__flipInY");
    checkSecondEl.classList.remove("animate__flipInY");

    checkFirstEl.classList.add("incorrect", "animate__shakeX");
    checkSecondEl.classList.add("incorrect", "animate__shakeX");
    setTimeout(() => {
      checkFirstEl.classList.add("animate__flipOutY");
      checkSecondEl.classList.add("animate__flipOutY");

      setTimeout(() => {
        checkFirstEl.classList.remove(
          "open",
          "incorrect",
          "animate__shakeX",
          "animate__flipOutY"
        );
        checkSecondEl.classList.remove(
          "open",
          "incorrect",
          "animate__shakeX",
          "animate__flipOutY"
        );
      }, 500);
    }, 1000);
  } else {
    checkFirstEl.classList.remove("animate__flipInY");
    checkSecondEl.classList.remove("animate__flipInY");

    checkFirstEl.classList.add("correct", "animate__bounceIn");
    checkSecondEl.classList.add("correct", "animate__bounceIn");
  }
};
