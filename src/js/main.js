import "../styles/main.scss";
import { renderDifficulties } from "./screens/Difficulties.js";
import { renderAncients } from "./screens/Ancients.js";
import { renderResults } from "./screens/Results.js";

const main = document.createElement("main");
main.classList.add("main");

document.body.append(main);

const defaultUser = {
  ancient: null,
  difficulty: null,
  cards: [],
};

const renderScreen = () => {
  const user = JSON.parse(localStorage.getItem("user")) ?? defaultUser;
  if (!localStorage.getItem("user")) {
    localStorage.setItem("user", JSON.stringify(defaultUser));
  }
  if (!user.ancient) {
    main.append(renderAncients());
  } else if (!user.difficulty) {
    main.append(renderDifficulties());
  } else {
    main.append(renderResults());
  }
};

renderScreen();

export { renderScreen };
