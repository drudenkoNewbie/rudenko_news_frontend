export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);
};

export const validatePassword = ({ length }: string) => {
  const PASSWORD_MIN_LENGTH = 6;
  const PASSWORD_MAX_LENGTH = 20;

  return length >= PASSWORD_MIN_LENGTH && length <= PASSWORD_MAX_LENGTH;
};
