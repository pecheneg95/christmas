import * as noUiSlider from "nouislider";
import "nouislider/dist/nouislider.css";
import { filterToy } from "./filter-toy";
import { showToyCard } from "./showToy";
import { filtersToy } from "./toy-page";

const countMin = document.querySelector(".count-min-output");
const countMax = document.querySelector(".count-max-output");
const yearMin = document.querySelector(".year-min-output");
const yearMax = document.querySelector(".year-max-output");
const sliderCount = document.querySelector(
  ".count-slider"
) as noUiSlider.target;
const sliderYear = document.querySelector(".year-slider") as noUiSlider.target;

if (localStorage.getItem("toyCount") != null) {
  filtersToy.count = JSON.parse(localStorage.getItem("toyCount") as string);
}
if (localStorage.getItem("toyYear") != null) {
  filtersToy.year = JSON.parse(localStorage.getItem("toyYear") as string);
}

function createNouisliderCount(): void {
  noUiSlider.cssClasses.target += " range-slider";
  noUiSlider.create(sliderCount, {
    start: filtersToy.count,
    connect: true,
    step: 1,
    orientation: "horizontal",
    animate: true,
    handleAttributes: [{ "aria-label": "lower" }, { "aria-label": "upper" }],
    range: {
      min: 1,
      max: 12,
    },
    format: {
      from: function (value) {
        return parseInt(value);
      },
      to: function (value) {
        return Number(parseInt(String(value)));
      },
    },
  });
  if (countMin != null && countMax != null) {
    countMin.textContent = filtersToy.count[0];
    countMax.textContent = filtersToy.count[1];
  }
}
function createNouisliderYear(): void {
  noUiSlider.cssClasses.target += " range-slider";
  noUiSlider.create(sliderYear, {
    start: filtersToy.year,
    connect: true,
    step: 10,
    orientation: "horizontal",
    animate: true,
    handleAttributes: [{ "aria-label": "lower" }, { "aria-label": "upper" }],
    range: {
      min: 1940,
      max: 2020,
    },
    format: {
      from: function (value) {
        return parseInt(value);
      },
      to: function (value) {
        return Number(parseInt(String(value)));
      },
    },
  });
  if (yearMin != null && yearMax != null) {
    yearMin.textContent = filtersToy.year[0];
    yearMax.textContent = filtersToy.year[1];
  }
}

createNouisliderCount();
createNouisliderYear();

sliderCount.noUiSlider?.on("slide.one", () => {
  filtersToy.count = sliderCount.noUiSlider?.get() as string[];
  localStorage.setItem("toyCount", JSON.stringify(filtersToy.count));
  if (countMin !== null) {
    countMin.textContent = filtersToy.count[0];
  }
  if (countMax !== null) {
    countMax.textContent = filtersToy.count[1];
  }
  showToyCard(filterToy(filtersToy));
});
sliderYear.noUiSlider?.on("slide.one", () => {
  filtersToy.year = sliderYear.noUiSlider?.get() as string[];
  localStorage.setItem("toyYear", JSON.stringify(filtersToy.year));
  if (yearMin !== null) {
    yearMin.textContent = filtersToy.year[0];
  }
  if (yearMax !== null) {
    yearMax.textContent = filtersToy.year[1];
  }
  showToyCard(filterToy(filtersToy));
});

export { sliderCount, sliderYear, countMin, countMax, yearMin, yearMax };
