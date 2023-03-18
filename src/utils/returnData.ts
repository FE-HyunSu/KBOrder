export const unitWon = (value: number) => {
  return (
    Math.round(value)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원"
  );
};

export const returnDate = (value: number | string) => {
  return String(value).replace(/(\d{4})(\d{2})(\d{2})/g, "$1-$2-$3");
};
