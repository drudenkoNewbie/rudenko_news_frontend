import { DEFAULT_IMAGE_URL } from '../../constants';
import { FileInputProps, TextInputProps } from '../../types';

export const titleSchema: TextInputProps = {
  name: 'title',
  required: true
};

export const contentSchema: TextInputProps = {
  name: 'content',
  required: true
};

export const tagsSchema: TextInputProps = {
  name: 'tags',
  required: true
};

export const imageSchema: FileInputProps = {
  name: 'image',
  accept: 'image/*',
  initialPreviewSrc: DEFAULT_IMAGE_URL
};
