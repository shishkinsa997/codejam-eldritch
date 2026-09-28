import "../../styles/results.scss";
import {
  brownCards,
  greenCards,
  blueCards,
} from "../../data/mythicCards/index.js";
import { renderScreen } from "../main.js";
import { getRandomItems } from "../utils/getRandom.js";
import Ancients from "../../data/ancients.js";
import backface from "../../assets/mythicCardBackground.png";
console.log(brownCards);
console.log(backface);

export function renderResults() {
  const results = document.createElement("section");
  const reset = document.createElement("button");
  const grid = document.createElement("div");
  const firstPile = document.createElement("div");
  const fsecondPile = document.createElement("div");
  const thirdPile = document.createElement("div");
  const arrBrown = [];
  const arrGreen = [];
  const arrBlue = [];

  arrBrown.push(...brownCards);
  arrGreen.push(...greenCards);
  arrBlue.push(...blueCards);

  results.classList = "section";
  grid.classList = "grid";
  results.id = "results";
  reset.textContent = "Reset";
  reset.className = "reset";

  const renderCard = (c) => {
    const cardContainer = document.createElement("button");
    cardContainer.classList = "card-container";
    cardContainer.id = c.id;
    cardContainer.innerHTML = `
    <div class="card close">
      <div class="card-face front-face">
        <img src="${c.cardFace}" alt="${c.id}"/>
      </div>
      <div class="card-face back-face">
        <img src="${backface}" alt="backface-card"/>
      </div>
    </div>
    `;
    cardContainer.addEventListener("click", () => {
      cardContainer.classList = "open";
    });

    return cardContainer;
  };

  const getCardsByDifficulty = (arr, difficulties, num) => {
    const raw = [];
    const rest = [];

    for (const c of getRandomItems(arr)) {
      if (
        c.difficulty === difficulties[0] ||
        c.difficulty === difficulties[1] ||
        c.difficulty === difficulties[2]
      ) {
        raw.push(c);
      } else {
        rest.push(c);
      }
    }

    arr.length = 0;
    arr.push(...rest);
    const filtered = getRandomItems(raw, num);
    arr.push(...raw);

    return filtered;
  };

  const getCardsByColor = (stage) => {
    const filtered = [];
    filtered.push(...getRandomItems(blue, ancient[stage].blueCards));
    filtered.push(...getRandomItems(brown, ancient[stage].brownCards));
    filtered.push(...getRandomItems(green, ancient[stage].greenCards));

    return getRandomItems(filtered);
  };

  const getFiltered = (arr, num) => {
    const res = [];

    switch (user.difficulty) {
      case "very-easy":
        res.push(...getCardsByDifficulty(arr, ["easy"], num));
        if (num > res.length) {
          res.push(...getCardsByDifficulty(arr, ["normal"], num - res.length));
        }
        break;
      case "easy":
        res.push(...getCardsByDifficulty(arr, ["easy", "normal"], num));
        break;
      case "normal":
        res.push(...getCardsByDifficulty(arr, ["easy", "normal", "hard"], num));
        break;
      case "hard":
        res.push(...getCardsByDifficulty(arr, ["normal", "hard"], num));
        break;
      case "very-hard":
        res.push(...getCardsByDifficulty(arr, ["hard"], num));
        if (num > res.length) {
          res.push(...getCardsByDifficulty(arr, ["normal"], num - res.length));
        }
        break;
      default:
        res;
    }

    return getRandomItems(res);
  };

  const user = JSON.parse(localStorage.getItem("user"));
  const ancient = Ancients.find((a) => a.id === user.ancient);
  const totalCount = {
    blue:
      ancient.firstStage.blueCards +
      ancient.secondStage.blueCards +
      ancient.thirdStage.blueCards,
    brown:
      ancient.firstStage.brownCards +
      ancient.secondStage.brownCards +
      ancient.thirdStage.brownCards,
    green:
      ancient.firstStage.greenCards +
      ancient.secondStage.greenCards +
      ancient.thirdStage.greenCards,
  };

  const blue = getFiltered(arrBlue, totalCount.blue);
  const brown = getFiltered(arrBrown, totalCount.brown);
  const green = getFiltered(arrGreen, totalCount.green);

  const firstStage = getCardsByColor("firstStage");
  const secondStage = getCardsByColor("secondStage");
  const thirdStage = getCardsByColor("thirdStage");

  const totalPile = [firstStage, secondStage, thirdStage];

  totalPile.forEach((arr, i) => {
    const pile = document.createElement("div");
    pile.classList = `stage-${i + 1} pile`;
    arr.forEach((c) => {
      pile.append(renderCard(c));
    });
    console.log(pile.lastChild);
    pile.lastChild.classList.add("open");

    grid.append(pile);
  });

  // firstStage.forEach((c) => {
  //   grid.append(renderCard(c));
  // });

  reset.addEventListener("click", (e) => {
    localStorage.removeItem("user");
    results.remove();
    renderScreen();
  });

  results.append(grid, reset);

  return results;
}
