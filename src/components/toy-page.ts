import data from "../data";
import "nouislider/dist/nouislider.css";
import { filterToy } from "./filter-toy";
import { showToyCard } from "./showToy";
import { CardsData } from "./interface";
import { filtersToy } from "./classes";
import {
  sliderCount,
  sliderYear,
  countMin,
  countMax,
  yearMin,
  yearMax,
} from "./nouislider";

const shapeButtonsContainer = document.querySelector(
  ".shape"
) as HTMLTemplateElement;
const shapeButtonsElements = Array.from(
  document.querySelectorAll(".shape button")
) as HTMLTemplateElement[];
const colorButtonsContainer = document.querySelector(
  ".color"
) as HTMLTemplateElement;
const colorButtonsElements = Array.from(
  document.querySelectorAll(".color button")
) as HTMLTemplateElement[];
const sizeButtonsContainer = document.querySelector(
  ".size"
) as HTMLTemplateElement;
const sizeButtonsElements = Array.from(
  document.querySelectorAll(".size button")
) as HTMLTemplateElement[];
const favoriteButton = document.querySelector(
  ".favorite-input-label"
) as HTMLTemplateElement;
const favoriteButtonCheked = document.querySelector(
  ".favorite-input"
) as HTMLInputElement;
const optionSortContainer = document.querySelector(
  "select"
) as HTMLSelectElement;
const selectCardContainer = document.querySelector(
  ".select span"
) as HTMLTemplateElement;
const cardContainer = document.querySelector(
  ".card-container"
) as HTMLTemplateElement;
const resetBtn = document.querySelector(".reset") as HTMLTemplateElement;
const showSelectBtn = document.querySelector(
  ".select-button"
) as HTMLTemplateElement;
const searchLine = document.querySelector(".search") as HTMLInputElement;
filtersToy.searchValue = searchLine.value;

if (optionSortContainer.options.selectedIndex) {
  filtersToy.optionSort = optionSortContainer.options.selectedIndex;
}
if (filtersToy.showOnlySelect === true) {
  showSelectBtn.classList.add("active");
  filtersToy.toyCollection = filtersToy.selectCards;
}
if (localStorage.getItem("showOnlySelect")) {
  filtersToy.showOnlySelect = JSON.parse(
    `${localStorage.getItem("showOnlySelect")}`
  );
}
if (localStorage.getItem("selectCards")) {
  filtersToy.selectCards = [];
  const selectCardsFromLocalStorage = JSON.parse(
    `${localStorage.getItem("selectCards")}`
  ) as CardsData[];

  selectCardsFromLocalStorage.forEach((element) => {
    const ind = data.findIndex(
      (dataElement) => dataElement.num === element.num
    );
    if (ind !== -1) {
      filtersToy.selectCards.push(data[ind]);
    }
  });
}
if (localStorage.getItem("shapes") !== null) {
  filtersToy.shapes = JSON.parse(localStorage.getItem("shapes") as string);
}
localStorage.setItem("shapes", JSON.stringify(filtersToy.shapes));
if (localStorage.getItem("colors") !== null) {
  filtersToy.colors = JSON.parse(localStorage.getItem("colors") as string);
}
localStorage.setItem("colors", JSON.stringify(filtersToy.colors));
if (localStorage.getItem("sizes") !== null) {
  filtersToy.sizes = JSON.parse(localStorage.getItem("sizes") as string);
}
localStorage.setItem("sizes", JSON.stringify(filtersToy.sizes));
if (localStorage.getItem("favoriteOn") !== null) {
  filtersToy.favoriteOn = JSON.parse(
    localStorage.getItem("favoriteOn") as string
  );
}
localStorage.setItem("favoriteOn", `${filtersToy.favoriteOn}`);
if (localStorage.getItem("toyCount") !== null) {
  filtersToy.count = JSON.parse(localStorage.getItem("toyCount") as string);
  console.log(filtersToy.count);
}
if (localStorage.getItem("toyYear") !== null) {
  filtersToy.year = JSON.parse(localStorage.getItem("toyYear") as string);
}
if (
  localStorage.getItem("optionSort") !== null &&
  optionSortContainer.options
) {
  filtersToy.optionSort = Number(localStorage.getItem("optionSort"));
  optionSortContainer.options.selectedIndex = filtersToy.optionSort;
}
if (filtersToy.showOnlySelect === true) {
  showSelectBtn.classList.add("active");
}

function removeItemOnce<T>(arr: T[], value: T): T[] {
  const index = arr.indexOf(value);

  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}
shapeButtonsElements.forEach((element) => {
  if (
    element.dataset.shapeFilter &&
    filtersToy.shapes.includes(element.dataset.shapeFilter)
  )
    element.classList.add("active");
});
shapeButtonsContainer.addEventListener("click", (event) => {
  const target = event.target as HTMLTemplateElement;

  if (target.matches("button")) {
    target.classList.toggle("active");
    if (
      target.dataset.shapeFilter &&
      !filtersToy.shapes.includes(target.dataset.shapeFilter)
    ) {
      filtersToy.shapes.push(target.dataset.shapeFilter);
      localStorage.setItem("shapes", JSON.stringify(filtersToy.shapes));
    } else {
      removeItemOnce(filtersToy.shapes, target.dataset.shapeFilter);
      localStorage.setItem("shapes", JSON.stringify(filtersToy.shapes));
    }
    showToyCard(filterToy(filtersToy));
  }
});
colorButtonsElements.forEach((element) => {
  if (
    element.dataset.colorFilter &&
    filtersToy.colors.includes(element.dataset.colorFilter)
  )
    element.classList.add("active");
});
colorButtonsContainer.addEventListener("click", (event) => {
  const target = event.target as HTMLTemplateElement;

  if (target.matches("button")) {
    target.classList.toggle("active");
    if (
      target.dataset.colorFilter &&
      !filtersToy.colors.includes(target.dataset.colorFilter)
    ) {
      filtersToy.colors.push(target.dataset.colorFilter);
      localStorage.setItem("colors", JSON.stringify(filtersToy.colors));
    } else {
      removeItemOnce(filtersToy.colors, target.dataset.colorFilter);
      localStorage.setItem("colors", JSON.stringify(filtersToy.colors));
    }
    showToyCard(filterToy(filtersToy));
  }
});
sizeButtonsElements.forEach((element) => {
  if (
    element.dataset.sizeFilter &&
    filtersToy.sizes.includes(element.dataset.sizeFilter)
  )
    element.classList.add("active");
});
sizeButtonsContainer.addEventListener("click", (event) => {
  const target = event.target as HTMLTemplateElement;

  if (target.matches("button")) {
    target.classList.toggle("active");
    if (
      target.dataset.sizeFilter &&
      !filtersToy.sizes.includes(target.dataset.sizeFilter)
    ) {
      filtersToy.sizes.push(target.dataset.sizeFilter);
      localStorage.setItem("sizes", JSON.stringify(filtersToy.sizes));
    } else {
      removeItemOnce(filtersToy.sizes, target.dataset.sizeFilter);
      localStorage.setItem("sizes", JSON.stringify(filtersToy.sizes));
    }
    showToyCard(filterToy(filtersToy));
  }
});
favoriteButtonCheked.checked = filtersToy.favoriteOn;
favoriteButton.addEventListener("click", () => {
  filtersToy.favoriteOn = !filtersToy.favoriteOn;
  localStorage.setItem("favoriteOn", `${filtersToy.favoriteOn}`);
  showToyCard(filterToy(filtersToy));
});

function byField(field: "name" | "year") {
  return (a: CardsData, b: CardsData) => (a[field] > b[field] ? 1 : -1);
}
function sortFilter(): void {
  filtersToy.optionSort = optionSortContainer.options.selectedIndex;
  switch (filtersToy.optionSort) {
    case 1:
      filtersToy.toyCollection = filtersToy.toyCollection.sort(byField("year"));
      filtersToy.toyCollection = filtersToy.toyCollection
        .sort(byField("name"))
        .reverse();
      break;
    case 2:
      filtersToy.toyCollection = filtersToy.toyCollection.sort(byField("name"));
      filtersToy.toyCollection = filtersToy.toyCollection.sort(byField("year"));
      break;
    case 3:
      filtersToy.toyCollection = filtersToy.toyCollection.sort(byField("name"));
      filtersToy.toyCollection = filtersToy.toyCollection
        .sort(byField("year"))
        .reverse();
      break;
    default:
      filtersToy.toyCollection = filtersToy.toyCollection.sort(byField("year"));
      filtersToy.toyCollection = filtersToy.toyCollection.sort(byField("name"));
  }
  localStorage.setItem("optionSort", `${filtersToy.optionSort}`);
}
if (optionSortContainer) {
  optionSortContainer.onchange = () => {
    sortFilter();
    showToyCard(filterToy(filtersToy));
  };
}

filtersToy.toyCollection = filtersToy.toyCollection.sort(byField("name"));
selectCardContainer.textContent = `${filtersToy.selectCards.length}`;
cardContainer.addEventListener("click", (event) => {
  const target = event.target as HTMLTemplateElement;

  if (target.matches(".card")) {
    const cardNumber = Number(target.dataset.num) - 1;
    if (filtersToy.selectCards.includes(data[cardNumber])) {
      target.classList.remove("active");
      removeItemOnce(filtersToy.selectCards, data[cardNumber]);
    } else {
      target.classList.add("active");
      filtersToy.selectCards.push(data[cardNumber]);
      if (filtersToy.selectCards.length > 20) {
        target.classList.remove("active");
        removeItemOnce(filtersToy.selectCards, data[cardNumber]);
        alert("Извините, все слоты заполнены");
      }
    }
  }
  if (
    target.matches("h2") ||
    target.matches(".ribbon") ||
    target.matches("img")
  ) {
    const parentEventCard = target.parentNode as HTMLTemplateElement;
    const cardNumber = Number(parentEventCard.dataset.num) - 1;

    if (filtersToy.selectCards.includes(data[cardNumber])) {
      parentEventCard.classList.toggle("active");
      removeItemOnce(filtersToy.selectCards, data[cardNumber]);
    } else {
      parentEventCard.classList.toggle("active");
      filtersToy.selectCards.push(data[cardNumber]);
      if (filtersToy.selectCards.length > 20) {
        parentEventCard.classList.toggle("active");
        removeItemOnce(filtersToy.selectCards, data[cardNumber]);
        alert("Извините, все слоты заполнены");
      }
    }
  }
  selectCardContainer.textContent = `${filtersToy.selectCards.length}`;
  sortFilter();
  serchByName();
  showToyCard(filterToy(filtersToy));
  localStorage.setItem("selectCards", JSON.stringify(filtersToy.selectCards));
});
resetBtn.addEventListener("click", () => resetSettings());

function resetSettings(): void {
  localStorage.clear();
  filtersToy.resetFilters();
  favoriteButtonCheked.checked = filtersToy.favoriteOn;
  searchLine.value = "";
  sliderCount.noUiSlider?.set(filtersToy.count);
  optionSortContainer.options.selectedIndex = filtersToy.optionSort;
  if (countMin !== null) {
    countMin.textContent = filtersToy.count[0];
  }
  if (countMax !== null) {
    countMax.textContent = filtersToy.count[1];
  }
  sliderYear.noUiSlider?.set(filtersToy.year);
  if (yearMin) {
    yearMin.textContent = filtersToy.year[0];
  }
  if (yearMax) {
    yearMax.textContent = filtersToy.year[1];
  }
  shapeButtonsContainer.querySelectorAll("button").forEach((element) => {
    element.classList.remove("active");
  });
  colorButtonsContainer.querySelectorAll("button").forEach((element) => {
    element.classList.remove("active");
  });
  sizeButtonsContainer.querySelectorAll("button").forEach((element) => {
    element.classList.remove("active");
  });
  showSelectBtn.classList.remove("active");

  sortFilter();
  showToyCard(filterToy(filtersToy));
}

showSelectBtn.addEventListener("click", () => showSelcetCards());
function showSelcetCards(): void {
  filtersToy.showOnlySelect = !filtersToy.showOnlySelect;
  if (filtersToy.showOnlySelect === true) {
    showSelectBtn.classList.add("active");
    filtersToy.toyCollection = filtersToy.selectCards;
  } else {
    showSelectBtn.classList.remove("active");
    filtersToy.toyCollection = [...data];
  }
  localStorage.setItem("showOnlySelect", `${filtersToy.showOnlySelect}`);
  sortFilter();
  serchByName();
  showToyCard(filterToy(filtersToy));
}
function serchByName(): void {
  filtersToy.searchValue = searchLine.value;
  filtersToy.searchCollection = [];
  filtersToy.toyCollection.forEach((element) => {
    if (
      element.name.toLowerCase().includes(filtersToy.searchValue.toLowerCase())
    ) {
      filtersToy.searchCollection.push(element);
    }
  });
}
searchLine.oninput = () => {
  sortFilter();
  serchByName();
  showToyCard(filterToy(filtersToy));
};

sortFilter();
serchByName();
showToyCard(filterToy(filtersToy));
export { CardsData, filtersToy };
