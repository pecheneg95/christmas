import data from "../data";
import { CardsData } from "./interface";

class OptionsFiltersToy {
  toyCollection = [...data] as CardsData[];
  searchCollection = [] as CardsData[];
  selectCards = [] as CardsData[];
  count = ["1", "12"] as string[];
  year = ["1940", "2020"] as string[];
  shapes = [] as string[];
  colors = [] as string[];
  sizes = [] as string[];
  searchValue = "" as string;
  favoriteOn = false as boolean;
  showOnlySelect = false as boolean;
  optionSort = 0 as number;

  resetFilters(): void {
    this.toyCollection = [...data];
    this.searchCollection = [];
    this.selectCards = [];
    this.count = ["1", "12"];
    this.year = ["1940", "2020"];
    this.shapes = [];
    this.colors = [];
    this.sizes = [];
    this.searchValue = "";
    this.favoriteOn = false;
    this.showOnlySelect = false;
    this.optionSort = 0;
  }
}

class OptionsFiltersTree {
  numTreeImg = "1" as string;
  numBg = "1" as string;
  snowIsShow = false as boolean;
  garlandColor = "multicolor" as string;
  garlandIsOn = true as boolean;
  audioIsPlay = false as boolean;

  resetFilters(): void {
    this.numTreeImg = "1";
    this.numBg = "1";
    this.snowIsShow = false;
    this.garlandColor = "multicolor";
    this.garlandIsOn = true;
    this.audioIsPlay = false;
  }
}

const filtersToy = new OptionsFiltersToy();
const filtersTree = new OptionsFiltersTree();

export { filtersToy, filtersTree, OptionsFiltersToy };
