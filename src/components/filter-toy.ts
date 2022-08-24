import { CardsData } from "./toy-page";
import { OptionsFiltersToy } from "./classes";

function filterToy(options: OptionsFiltersToy): CardsData[] {
  return options.toyCollection.filter(
    (t: CardsData) =>
      Number(t.count) >= Number(options.count[0]) &&
      Number(t.count) <= Number(options.count[1]) &&
      Number(t.year) >= Number(options.year[0]) &&
      Number(t.year) <= Number(options.year[1]) &&
      (!options.favoriteOn || t.favorite === options.favoriteOn) &&
      (options.shapes.includes(t.shape) || options.shapes.length === 0) &&
      (options.colors.includes(t.color) || options.colors.length === 0) &&
      (options.sizes.includes(t.size) || options.sizes.length === 0) &&
      (options.searchCollection.includes(t) ||
      options.searchCollection.length === 0)
  );
}

export { filterToy };
