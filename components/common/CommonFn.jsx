export const unitWon = (value) => {
  return (
    Math.round(value)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원"
  );
};

export const dateText = (value) => {
  return String(value).replace(/(\d{4})(\d{2})(\d{2})/g, "$1-$2-$3");
};
