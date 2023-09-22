import { FileInputProps, TextInputProps } from '../../types';
import { validateEmail, validatePassword } from '../../utils/validators';

export const usernameSchema: TextInputProps = {
  name: 'username',
  autoComplete: 'username',
  isRequired: true
};

export const emailSchema: TextInputProps = {
  name: 'email',
  autoComplete: 'email',
  isValid: validateEmail,
  isRequired: true
};

export const passwordSchema: TextInputProps = {
  name: 'password',
  autoComplete: 'new-password',
  isValid: validatePassword,
  isRequired: true
};

export const avatarSchema: FileInputProps = {
  name: 'avatar',
  accept: 'image/*'
};
