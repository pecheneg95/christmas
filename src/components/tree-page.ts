import data from "../data";
import { filtersTree } from "./classes";
import { showToyCollection } from "./showToy";
import { filtersToy } from "./toy-page";

const toyContainer = document.querySelector(
  ".favorites-container"
) as HTMLTemplateElement;
const favoriteToyContainer = document.querySelector(
  ".favorites-container"
) as HTMLImageElement;
const mainTree = document.querySelector(".main-tree") as HTMLImageElement;
const treeSelectionContainer = document.querySelector(
  ".tree-container"
) as HTMLImageElement;
const bgSelectionContainer = document.querySelector(
  ".bg-container"
) as HTMLImageElement;
const mainTreeContainer =
  (document.querySelector(".main-tree-container") as HTMLImageElement) || Node;
const btnSnowOn = document.querySelector(".snow-control") as HTMLImageElement;
const snowContainer = document.querySelector(".snowflakes") as HTMLImageElement;
const garlandContainer = document.querySelector(
  ".garland-tree-container"
) as HTMLImageElement;
const garlandOnOffControll = document.querySelector(
  ".onoffswitch-label"
) as HTMLImageElement;
const garlandColorControllContainer = document.querySelector(
  ".garland-btns"
) as HTMLTemplateElement;
const resetBtnTreePage = document.querySelector(
  ".reset-tree-page"
) as HTMLImageElement;
const playBtn = document.querySelector(".audio-control") as HTMLImageElement;
const copyData = [...data];
const coordsTrees = [
  "47,577,8,579,1,557,7,538,73,534,90,517,78,497,56,505,42,491,39,476,51,464,22,463,18,441,25,434,41,430,59,433,75,433,88,433,104,430,110,417,109,398,109,384,91,382,78,375,73,369,73,357,79,345,91,342,109,348,121,350,136,354,146,355,154,345,162,334,144,343,131,343,118,337,114,329,114,321,115,312,121,307,134,305,151,302,160,298,158,289,144,286,126,283,118,272,122,259,140,257,155,258,174,260,179,250,145,249,127,244,108,236,99,226,108,215,119,206,153,219,168,213,184,214,185,204,168,202,165,187,180,176,182,162,156,147,158,132,171,124,196,141,208,140,202,113,207,104,190,93,195,80,210,74,203,54,216,44,235,48,238,4,249,2,262,7,266,38,289,42,290,55,276,71,295,62,308,67,310,79,276,105,275,127,289,114,302,113,313,121,315,134,304,160,342,138,356,144,358,158,325,183,343,182,351,193,352,214,346,227,388,216,401,220,404,237,347,265,392,276,397,293,389,306,357,308,351,315,367,323,384,332,387,347,423,343,431,365,416,380,370,378,367,390,358,402,336,409,336,416,356,413,383,404,404,403,411,414,409,427,393,436,425,438,447,439,457,458,443,476,405,471,426,487,419,503,434,514,436,528,492,536,497,548,491,564,451,572,475,589,472,604,451,617,466,627,440,638,450,653,440,670,390,663,370,663,376,689,356,699,333,672,332,696,307,701,289,670,285,696,252,705,232,693,238,667,224,666,216,699,201,710,185,705,165,649,146,682,127,689,104,675,124,634,98,641,78,651,63,636,67,617,99,604,94,588,52,622,32,612,25,599",
  "250,5,2,640,246,665,483,654",
  "238,6,15,612,150,703,243,677,313,696,477,655,476,539",
  "245,6,6,627,244,680,491,620",
  "245,6,6,627,244,680,491,620",
  "256,4,247,62,224,48,227,78,207,75,183,134,181,164,155,144,171,200,131,197,167,235,113,258,154,270,103,286,134,314,68,361,124,377,53,428,105,425,55,466,91,495,24,512,79,526,24,554,51,593,4,612,75,636,65,658,192,667,406,663,427,641,474,639,434,606,449,580,494,580,440,552,462,530,429,529,454,502,419,499,452,477,400,468,451,456,392,431,423,414,370,390,442,378,395,364,411,345,394,340,367,324,401,309,353,298,393,276,359,264,384,244,346,233,361,196,332,202,344,156,324,169,330,132,319,110,300,117,304,87,272,91,291,69,290,36,265,64",
];
const treeMap = document.querySelector("map") as HTMLMapElement;
const audio = new Audio();

audio.src = "../assets/audio/audio.mp3";
audio.currentTime = 0;
audio.loop = true;

if (localStorage.getItem("numTreeImg") !== null) {
  filtersTree.numTreeImg = localStorage.getItem("numTreeImg") as string;
  mainTree.src = `../assets/tree/${filtersTree.numTreeImg}.png`;
}
if (localStorage.getItem("numBg") !== null) {
  filtersTree.numBg = localStorage.getItem("numBg") as string;
  mainTreeContainer.style.backgroundImage = `url(../../assets/bg/${filtersTree.numBg}.jpg)`;
}
if (localStorage.getItem("showSnow") !== null) {
  filtersTree.snowIsShow = JSON.parse(
    localStorage.getItem("showSnow") as string
  );
}
if (localStorage.getItem("garlandColor") !== null) {
  filtersTree.garlandColor = localStorage.getItem("garlandColor") as string;
}
if (localStorage.getItem("isPlay") !== null) {
  filtersTree.audioIsPlay = JSON.parse(
    localStorage.getItem("isPlay") as string
  );
}
if (filtersTree.snowIsShow === true) {
  setInterval(createSnowFlake, 50);
}

treeSelectionContainer.addEventListener("click", (event) => {
  const target = event.target as HTMLTemplateElement;

  if (target.matches(".tree") && mainTree && target.dataset.tree) {
    filtersTree.numTreeImg = target.dataset.tree;
    mainTree.src = `../assets/tree/${filtersTree.numTreeImg}.png`;
    localStorage.setItem("numTreeImg", `${filtersTree.numTreeImg}`);
    createMapTree(coordsTrees[Number(filtersTree.numTreeImg) - 1]);
  }
});
bgSelectionContainer.addEventListener("click", (event) => {
  const target = event.target as HTMLTemplateElement;

  if (target.matches(".bg") && target.dataset.bg) {
    filtersTree.numBg = target.dataset.bg;
    mainTreeContainer.style.backgroundImage = `url(../../assets/bg/${filtersTree.numBg}.jpg)`;
    localStorage.setItem("numBg", filtersTree.numBg);
    createMapTree(coordsTrees[Number(filtersTree.numBg) - 1]);
  }
});
btnSnowOn.addEventListener("click", () => {
  filtersTree.snowIsShow = !filtersTree.snowIsShow;
  localStorage.setItem("showSnow", filtersTree.snowIsShow.toString());
  setInterval(createSnowFlake, 50);
});
garlandColorControllContainer.addEventListener("click", (event) => {
  const target = event.target as HTMLTemplateElement;

  if (target.matches(".color-btn") && target.dataset.color) {
    filtersTree.garlandColor = target.dataset.color;
    localStorage.setItem("garlandColor", filtersTree.garlandColor);
    createGarland(filtersTree.garlandColor);
  }
});
garlandOnOffControll.addEventListener("click", () => {
  filtersTree.garlandIsOn = !filtersTree.garlandIsOn;
  if (filtersTree.garlandIsOn === true) {
    garlandContainer?.classList.remove("hide");
  } else {
    garlandContainer?.classList.add("hide");
  }
});

resetBtnTreePage.addEventListener("click", () => {
  const toyOnTree = treeMap.querySelectorAll(".favorites-card-img") as NodeList;
  Array.from(toyOnTree).forEach((el) => {
    treeMap.removeChild(el);
  });

  localStorage.clear();
  filtersTree.resetFilters();
  mainTree.src = `../assets/tree/${filtersTree.numTreeImg}.png`;
  mainTreeContainer.style.backgroundImage = `url(../../assets/bg/${filtersTree.numBg}.jpg)`;
  createGarland(filtersTree.garlandColor);
  playAudio();
  if (filtersToy.selectCards.length > 0) {
    showToyCollection(filtersToy.selectCards);
  } else {
    const basicCards = [];
    for (let i = 0; i < 20; i++) {
      basicCards.push(copyData[i]);
    }
    showToyCollection(basicCards);
  }
});

document.addEventListener("click", () => {
  playAudio();
});

playBtn.addEventListener("click", () => {
  filtersTree.audioIsPlay = !filtersTree.audioIsPlay;
  localStorage.setItem("isPlay", `${filtersTree.audioIsPlay}`);
  playAudio();
});

function createSnowFlake() {
  const snow_flake = document.createElement("i") as HTMLTemplateElement;

  if (filtersTree.snowIsShow === true) {
    snow_flake.classList.add("fa-snowflake");
    snow_flake.style.left = `${Math.random() * window.innerWidth}` + "px";
    snow_flake.style.animationDuration = `${Math.random() * 3 + 2}` + "s";
    snow_flake.style.opacity = `${Math.random()}`;
    snow_flake.style.fontSize = `${Math.random() * 10 + 10}` + "px";

    snowContainer.append(snow_flake);
  }
  setTimeout(() => {
    snow_flake.remove();
  }, 5000);
}
function createGarland(garlandColor: string): void {
  while (garlandContainer.firstChild) {
    garlandContainer.removeChild(garlandContainer.firstChild);
  }

  for (let i = 0; i < 8; i++) {
    const garlandLine = document.createElement("ul");
    const size = 120 + 65 * i;
    const countLampInLine = i * 2 + 5;

    garlandLine.classList.add("lightrope");
    garlandLine.style.height = `${size}px`;
    garlandLine.style.width = `${size}px`;

    for (let n = 0; n < countLampInLine; n++) {
      const angleOfRotation = (80 / (countLampInLine - 1)) * n;
      const garlandLight = document.createElement("li");

      garlandLight.classList.add(`${garlandColor}`);
      garlandLight.style.transform = `rotate(${
        50 + angleOfRotation
      }deg) translate(${size / 2}px) rotate(-${50 + angleOfRotation}deg)`;
      garlandLine.append(garlandLight);
    }
    garlandContainer.append(garlandLine);
  }
}
function playAudio() {
  if (filtersTree.audioIsPlay === true) {
    audio.play();
  } else {
    audio.currentTime = 0;
    audio.pause();
  }
}
function createMapTree(coords: string) {
  const treeMapArea = document.createElement("area");

  while (treeMap.firstChild) {
    treeMap.removeChild(treeMap.firstChild);
  }

  treeMapArea.coords = coords;
  treeMapArea.shape = "poly";
  treeMapArea.classList.add("dropzone");
  treeMap.append(treeMapArea);
}
toyContainer.addEventListener("mouseover", (event) => {
  const target = event.target as HTMLTemplateElement;
  if (target.matches(".favorites-card-img")) {
    let dragged = ({} as HTMLTemplateElement) || Node;
    let draggedParent = {} as HTMLTemplateElement;
    document.addEventListener(
      "dragstart",
      (event) => {
        const target = event.target as HTMLTemplateElement;
        dragged = target;
        draggedParent = target.parentNode as HTMLTemplateElement;
        target.style.position = "absolute";
        target.style.opacity = ".5";
      },
      false
    );
    document.addEventListener(
      "dragend",
      (event) => {
        const target = event.target as HTMLTemplateElement;
        target.style.opacity = "";
      },
      false
    );
    document.addEventListener(
      "dragover",
      (event) => {
        event.preventDefault();
      },
      false
    );
    document.addEventListener(
      "drop",
      (event) => {
        const target = event.target as HTMLTemplateElement;
        event.preventDefault();
        if (target.className.includes("dropzone") && dragged.parentNode) {
          const countElementInCard = `${
            draggedParent.querySelectorAll(".favorites-card-img").length
          }`;
          const textElementDraggedParent = draggedParent.querySelector(
            "p"
          ) as HTMLParagraphElement;
          const coordX = event.offsetX;
          const coordY = event.offsetY;
          const coordXArea = target.offsetLeft;
          const coordYArea = target.offsetTop;
          if (dragged.parentNode) {
            dragged.parentNode.removeChild(dragged);
          }
          dragged.style.left = `${coordX + coordXArea - 30}` + "px";
          dragged.style.top = `${coordY + coordYArea - 30}` + "px";
          treeMap.appendChild(dragged);
          textElementDraggedParent.textContent = countElementInCard;
          dragged = {} as HTMLTemplateElement;
          draggedParent = {} as HTMLTemplateElement;
        }
      },
      false
    );
  }
});
treeMap.addEventListener("mouseover", (event) => {
  const target = event.target as HTMLTemplateElement;
  if (target.matches(".favorites-card-img")) {
    let dragged = {} as HTMLTemplateElement;
    let draggedParent = {} as HTMLTemplateElement;

    document.addEventListener(
      "dragstart",
      (event) => {
        const target = event.target as HTMLTemplateElement;
        dragged = target;
        draggedParent = target.parentNode as HTMLTemplateElement;
        target.style.position = "absolute";
        target.style.opacity = ".5";
      },
      false
    );
    document.addEventListener(
      "dragend",
      () => {
        target.style.opacity = "";
      },
      false
    );
    document.addEventListener(
      "dragover",
      (event) => {
        event.preventDefault();
      },
      false
    );
    document.addEventListener(
      "drop",
      (event) => {
        event.preventDefault();
        const target = event.target as HTMLTemplateElement;
        if (target.className.includes("dropzone") && dragged.parentNode) {
          const countElementInCard = `${
            draggedParent.querySelectorAll(".favorites-card-img").length
          }` as string;
          const textElementDraggedParent = draggedParent.querySelector(
            "p"
          ) as HTMLParagraphElement;
          const coordX = event.offsetX;
          const coordY = event.offsetY;
          const coordXArea = target.offsetLeft;
          const coordYArea = target.offsetTop;
          dragged.parentNode.removeChild(dragged);
          dragged.style.left = `${coordX + coordXArea - 30}` + "px";
          dragged.style.top = `${coordY + coordYArea - 30}` + "px";
          treeMap.appendChild(dragged);
          textElementDraggedParent.textContent = countElementInCard;
          dragged = {} as HTMLTemplateElement;
          draggedParent = {} as HTMLTemplateElement;
        } else {
          const toy = dragged as HTMLTemplateElement;
          const numToy = toy.dataset.num;
          const cardToy = favoriteToyContainer?.querySelector(
            `.favorites-card[data-num="${numToy}"]`
          ) as HTMLTemplateElement;
          const countElementInCard = `${
            cardToy.querySelectorAll(".favorites-card-img").length
          }` as string;
          const textElementDraggedParent = cardToy.querySelector(
            "p"
          ) as HTMLParagraphElement;
          toy.style.position = "";
          toy.style.left = "";
          toy.style.top = "";
          cardToy.prepend(toy);
          textElementDraggedParent.textContent = countElementInCard;
        }
      },
      false
    );
  }
});
createGarland(filtersTree.garlandColor);
createMapTree(coordsTrees[0]);
showToyCollection(filtersToy.selectCards);
export { showToyCollection };
