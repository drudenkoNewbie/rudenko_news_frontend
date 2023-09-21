import { FileInputProps, TextInputProps } from '../../types';
import { validateEmail, validatePassword } from '../../utils/validators';

export const usernameSchema: TextInputProps = {
  name: 'username',
  autoComplete: 'username',
  required: true
};

export const emailSchema: TextInputProps = {
  name: 'email',
  autoComplete: 'email',
  isValid: validateEmail,
  required: true
};

export const passwordSchema: TextInputProps = {
  name: 'password',
  autoComplete: 'new-password',
  isValid: validatePassword,
  required: true
};

export const avatarSchema: FileInputProps = {
  name: 'avatar',
  accept: 'image/*'
};
