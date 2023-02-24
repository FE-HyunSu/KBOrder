export const unitWon = (value) => {
  return (
    Math.round(value)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원"
  );
};
