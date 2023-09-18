import { InputProps } from '../../types';
import { validateEmail, validatePassword } from '../../utils/validators';

export const usernameSchema: InputProps = {
  name: 'username',
  autoComplete: 'username'
};

export const emailSchema: InputProps = {
  name: 'email',
  autoComplete: 'email',
  isValid: validateEmail
};

export const passwordSchema: InputProps = {
  name: 'password',
  autoComplete: 'new-password',
  isValid: validatePassword
};
