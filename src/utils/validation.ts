export const validationName = (value: string | undefined) => {
  return value && value.length >= 2 && value.length !== 0;
};

export const validationEmail = (value: string | undefined) => {
  const emailRegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  return !!value && value.match(emailRegExp) && value.length !== 0;
};

export const validationPassword = (value: string | undefined) => {
  return !!value && value.length >= 6 && value.length !== 0;
};

export const validationMatch = (value: string | undefined, matchValue: string | undefined) => {
  return !!value && value === matchValue && matchValue.length !== 0;
};
