export const validateMail = (value: string) => {
  const mailRegex = /^[a-zA-Z0-9_-]+@[a-z0-9.]+\.[a-z]{2,4}$/;
  return mailRegex.test(value);
};
