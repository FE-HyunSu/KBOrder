const customMediaQuery = (maxWidth: number): string => `@media (max-width: ${maxWidth}px)`;

export const COLOR = {
  realBlack: '#000',
  black: '#1a1a1a',
  white: '#fff',
  grayEE: '#eee',
  grayCC: '#ccc',
  gray99: '#999',
  green: '#299438',
  orange: '#f0581a',
  orangeL: '#ff7111',
  blue: '#2E8BC0',
};

export const MEDIA = {
  custom: customMediaQuery,
  pc: customMediaQuery(1440),
  tablet: customMediaQuery(768),
  mobile: customMediaQuery(576),
};
