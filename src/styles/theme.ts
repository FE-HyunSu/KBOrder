const customMediaQuery = (maxWidth: number): string => `@media (max-width: ${maxWidth}px)`;

export const COLOR = {
  realBlack: '#000',
  black: '#1a1a1a',
  white: '#fff',
  gray: '#eee',
  green: '#299438',
};

export const media = {
  custom: customMediaQuery,
  pc: customMediaQuery(1440),
  tablet: customMediaQuery(768),
  mobile: customMediaQuery(576),
};
