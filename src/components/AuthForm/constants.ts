import { InputProps } from "../../types";
import { validateEmail, validatePassword } from "../../utils/validators";

export const usernameSchema: InputProps = {
  name: 'username',
  autoComplete: 'username',
  required: true
};

export const emailSchema: InputProps = {
  name: 'email',
  autoComplete: 'email',
  isValid: validateEmail,
  required: true
};

export const passwordSchema: InputProps = {
  name: 'password',
  autoComplete: 'new-password',
  isValid: validatePassword,
  required: true
};

export const avatarSchema: InputProps = {
  name: 'avatar',
  autoComplete: 'off',
  required: true
};
