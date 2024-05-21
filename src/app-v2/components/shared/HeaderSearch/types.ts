export type FilterResult = {
  title: string;
  results: {image: string; text: string; link: string}[];
};

export type SearchInputCoords = {
  bottom?: number;
  height?: number;
  left?: number;
  right?: number;
  top?: number;
  width?: number;
  x?: number;
  y?: number;
};
