import { DEFAULT_IMAGE_URL } from '../../constants';
import { FileInputProps, TextInputProps } from '../../types';

export const titleSchema: TextInputProps = {
  name: 'title',
  isRequired: true
};

export const contentSchema: TextInputProps = {
  name: 'content',
  isRequired: true
};

export const tagsSchema: TextInputProps = {
  name: 'tags',
  isRequired: true
};

export const imageSchema: FileInputProps = {
  name: 'image',
  accept: 'image/*',
  initialPreviewSrc: DEFAULT_IMAGE_URL
};

export const BUTTON_NAMES = {
  CANCEL: 'cancel',
  SUBMIT: 'submit'
}