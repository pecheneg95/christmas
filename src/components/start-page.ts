const switchStartPageBtn = document.querySelector(
  ".start-page-button"
) as HTMLTemplateElement;
const startPage = document.querySelector(".start-page") as HTMLTemplateElement;
const toyPage = document.querySelector(".toy-page") as HTMLTemplateElement;
const toyPageNavBtn = document.querySelector(
  ".switch-toy-page"
) as HTMLTemplateElement;
const searchLine = document.querySelector(".search") as HTMLInputElement;

function switchToToyPage(): void {
  startPage.classList.add("hide");
  toyPage.classList.remove("hide");
  toyPageNavBtn.classList.add("active-link");

  searchLine.focus();
  searchLine.select();
}

switchStartPageBtn.addEventListener("click", () => switchToToyPage());
