import "../../styles/ancients.scss";
import Ancients from "../../data/ancients.js";
import { renderScreen } from "../main.js";
import { renderDifficulties } from "../../js/screens/Difficulties.js";

export function renderAncients() {
  const ancients = document.createElement("section");
  ancients.classList = "section";
  ancients.id = "ancients";

  const renderAncient = (id) => {
    const data = Ancients.find((el) => el.id === id);

    const card = `
      <div class="ancient-image">
        <img src="${data.cardFace}" alt="${data.name}"/>
      </div>
      <h2 class="ancient-name">${data.name}</h2>
      <div class="ancient-stage_wrapper">
      <div class="ancient-stage">
        <span class="stage-name">Stage I</span>
        <span class="stage-green">${data.firstStage.greenCards}</span>
        <span class="stage-brown">${data.firstStage.brownCards}</span>
        <span class="stage-blue">${data.firstStage.blueCards}</span>
      </div>
      <div class="ancient-stage">
        <span class="stage-name">Stage II</span>
        <span class="stage-green">${data.secondStage.greenCards}</span>
        <span class="stage-brown">${data.secondStage.brownCards}</span>
        <span class="stage-blue">${data.secondStage.blueCards}</span>
      </div>
      <div class="ancient-stage">
        <span class="stage-name">Stage III</span>
        <span class="stage-green">${data.thirdStage.greenCards}</span>
        <span class="stage-brown">${data.thirdStage.brownCards}</span>
        <span class="stage-blue">${data.thirdStage.blueCards}</span>
      </div>
      </div>
    `;

    return card;
  };

  Ancients.forEach((an) => {
    const ancient = document.createElement("button");
    ancient.classList = "ancient";
    ancient.id = an.id;

    ancient.innerHTML = `${renderAncient(an.id)}`;
    ancients.append(ancient);

    ancient.addEventListener("click", () => {
      const user = JSON.parse(localStorage.getItem("user"));
      user.ancient = an.name;
      localStorage.setItem("user", JSON.stringify(user));
      ancients.remove();
      renderScreen();
    });
  });

  return ancients;
}
