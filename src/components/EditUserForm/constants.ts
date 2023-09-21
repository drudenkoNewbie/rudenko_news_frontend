import { FileInputProps, TextInputProps } from '../../types';
import { validateEmail, validatePassword } from '../../utils/validators';

export const usernameSchema: TextInputProps = {
  name: 'username',
  autoComplete: 'username'
};

export const emailSchema: TextInputProps = {
  name: 'email',
  autoComplete: 'email',
  isValid: validateEmail
};

export const passwordSchema: TextInputProps = {
  name: 'password',
  autoComplete: 'new-password',
  isValid: validatePassword
};

export const avatarSchema: FileInputProps = {
  name: 'avatar',
  accept: 'image/*'
};

export const BUTTON_NAMES = {
  CANCEL: 'cancel',
  SUBMIT: 'submit'
}