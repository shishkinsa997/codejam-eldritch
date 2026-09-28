import "../../styles/difficulties.scss";
import Difficulties from "../../data/difficulties.js";
import { renderScreen } from "../main.js";

export function renderDifficulties() {
  const difficulties = document.createElement("section");
  difficulties.classList = "section";
  difficulties.id = "difficulties";

  const renderDifficulty = (id) => {
    const data = Difficulties.find((el) => el.id === id);

    const card = `
      <h2 class="difficulty-name">${data.name}</h2>
      <p>${data.description}</p>
    `;

    return card;
  };

  Difficulties.forEach((an) => {
    const difficulty = document.createElement("button");
    difficulty.classList = "difficulty";
    difficulty.id = an.id;

    difficulty.innerHTML = `${renderDifficulty(an.id)}`;
    difficulties.append(difficulty);

    difficulty.addEventListener("click", (e) => {
      const user = JSON.parse(localStorage.getItem("user"));
      user.difficulty = an.id;
      localStorage.setItem("user", JSON.stringify(user));
      difficulties.remove();
      renderScreen();
    });
  });

  return difficulties;
}
