import { filtersToy } from "./toy-page";
import { showToyCollection } from "./tree-page";
import data from "../data";

const pages = document.querySelectorAll(".page");
const startPageNavBtn = document.querySelector(
  ".switch-start-page"
) as HTMLTemplateElement;
const toyPageNavBtn = document.querySelector(
  ".switch-toy-page"
) as HTMLTemplateElement;
const treePageNavBtn = document.querySelector(
  ".switch-tree-page"
) as HTMLTemplateElement;

function switchStartPage(): void {
  pages[0].classList.remove("hide");
  pages[1].classList.add("hide");
  pages[2].classList.add("hide");
  treePageNavBtn.classList.remove("active-link");
  toyPageNavBtn.classList.remove("active-link");
}
function switchToyPage(): void {
  const searchLine = document.querySelector(".search") as HTMLInputElement;

  pages[0].classList.add("hide");
  pages[1].classList.remove("hide");
  pages[2].classList.add("hide");
  treePageNavBtn.classList.remove("active-link");
  toyPageNavBtn.classList.add("active-link");
  searchLine.focus();
  searchLine.select();
}
function switchTreePage(): void {
  pages[0].classList.add("hide");
  pages[1].classList.add("hide");
  pages[2].classList.remove("hide");
  treePageNavBtn.classList.add("active-link");
  toyPageNavBtn.classList.remove("active-link");

  if (filtersToy.selectCards.length === 0) {
    const basicCards = data.slice(0, 20);
    showToyCollection(basicCards);
  } else {
    showToyCollection(filtersToy.selectCards)
  }
}

startPageNavBtn.addEventListener("click", () => switchStartPage());
toyPageNavBtn.addEventListener("click", () => switchToyPage());
treePageNavBtn.addEventListener("click", () => switchTreePage());
