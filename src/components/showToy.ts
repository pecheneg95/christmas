import { CardsData } from "./toy-page";
import { filtersToy } from "./toy-page";


function showToyCard(toyCollection: CardsData[]): void {
  const cardContainer = document.querySelector(
    ".card-container"
  ) as HTMLTemplateElement;
  const fragment = document.createDocumentFragment() as DocumentFragment;

  while (cardContainer.firstChild) {
    cardContainer.removeChild(cardContainer.firstChild);
  }
  if (
    !toyCollection[0] ||
    (filtersToy.searchValue.length > 0 && !filtersToy.searchCollection[0])
  ) {
    const notFoundMessage = document.createElement("div");

    notFoundMessage.classList.add("not-found");
    notFoundMessage.textContent = "Извините, совпадений не обнаружено";
    cardContainer.append(notFoundMessage);
  } else {
    toyCollection.forEach((element) => {
      const card = document.createElement("div");
      const cardTitle = document.createElement("h2");
      const cardImg = document.createElement("img");
      const cardDescription = document.createElement("div");
      const cardDescriptionCount = document.createElement("p");
      const cardDescriptionCountValue = document.createElement("span");
      const cardDescriptionYear = document.createElement("p");
      const cardDescriptionYearValue = document.createElement("span");
      const cardDescriptionShape = document.createElement("p");
      const cardDescriptionShapeValue = document.createElement("span");
      const cardDescriptionColor = document.createElement("p");
      const cardDescriptionColorValue = document.createElement("span");
      const cardDescriptionSize = document.createElement("p");
      const cardDescriptionSizeValue = document.createElement("span");
      const cardDescriptionFavorite = document.createElement("p");
      const cardDescriptionFavoriteValue = document.createElement("span");
      const cardRibbon = document.createElement("div");

      card.classList.add("card");
      card.setAttribute("data-num", element.num);

      cardTitle.classList.add("card-title");
      cardTitle.textContent = element.name;
      card.append(cardTitle);

      cardImg.classList.add("card-img");
      cardImg.src = `./assets/toys/${element.num}.png`;
      card.append(cardImg);

      cardDescription.classList.add("card-description");
      card.append(cardDescription);

      cardDescriptionCount.classList.add("count");
      cardDescriptionCount.textContent = "Количество: ";

      cardDescriptionCountValue.textContent = element.count;
      cardDescriptionCount.append(cardDescriptionCountValue);
      cardDescription.append(cardDescriptionCount);

      cardDescriptionYear.classList.add("year");
      cardDescriptionYear.textContent = "Год покупки: ";

      cardDescriptionYearValue.textContent = element.year;
      cardDescriptionYear.append(cardDescriptionYearValue);
      cardDescription.append(cardDescriptionYear);

      cardDescriptionShape.classList.add("shape");
      cardDescriptionShape.textContent = "Форма: ";

      cardDescriptionShapeValue.textContent = element.shape;
      cardDescriptionShape.append(cardDescriptionShapeValue);
      cardDescription.append(cardDescriptionShape);

      cardDescriptionColor.classList.add("color");
      cardDescriptionColor.textContent = "Цвет: ";

      cardDescriptionColorValue.textContent = element.color;
      cardDescriptionColor.append(cardDescriptionColorValue);
      cardDescription.append(cardDescriptionColor);

      cardDescriptionSize.classList.add("size");
      cardDescriptionSize.textContent = "Размер: ";

      cardDescriptionSizeValue.textContent = element.size;
      cardDescriptionSize.append(cardDescriptionSizeValue);
      cardDescription.append(cardDescriptionSize);

      cardDescriptionFavorite.classList.add("favorite");
      cardDescriptionFavorite.textContent = "Любимая: ";

      if (element.favorite === true) {
        cardDescriptionFavoriteValue.textContent = "да";
      } else if (element.favorite === false) {
        cardDescriptionFavoriteValue.textContent = "нет";
      }
      cardDescriptionFavorite.append(cardDescriptionFavoriteValue);
      cardDescription.append(cardDescriptionFavorite);

      cardRibbon.classList.add("ribbon");
      card.append(cardRibbon);

      filtersToy.selectCards.forEach((elementSelectCards) => {
        if (elementSelectCards.num === element.num) {
          card.classList.add("active");
        }
      });
      fragment.append(card);
    });
  }

  cardContainer.append(fragment);
}

function showToyCollection(selectCards: CardsData[]) {
  const favoriteToyContainer = document.querySelector(".favorites-container");

  while (favoriteToyContainer?.firstChild) {
    favoriteToyContainer.removeChild(favoriteToyContainer.firstChild);
  }

  selectCards.forEach((element) => {
    const favoriteCard = document.createElement("div");

    favoriteCard.classList.add("favorites-card");
    favoriteCard.setAttribute("data-num", element.num);

    for (let i = 0; i < Number(element.count); i++) {
      const imgFavoriteCard = document.createElement("img");
      imgFavoriteCard.classList.add("favorites-card-img");
      imgFavoriteCard.src = `./assets/toys/${element.num}.png`;
      imgFavoriteCard.setAttribute("data-num", element.num);
      imgFavoriteCard.draggable = true;
      favoriteCard?.append(imgFavoriteCard);
    }

    const countFavoriteCard = document.createElement("p");
    
    countFavoriteCard.classList.add("favorites-count");
    countFavoriteCard.textContent = String(
      favoriteCard.querySelectorAll(".favorites-card-img").length
    );
    favoriteCard?.append(countFavoriteCard);

    favoriteToyContainer?.append(favoriteCard);
  });
}
export { showToyCard, showToyCollection };
