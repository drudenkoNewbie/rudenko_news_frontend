import { ChangeEvent, FocusEvent } from 'react';

export interface FileFieldProps {
  previewSrc: string;
  fileName: string;
  helperText: string;
  error: boolean;
  accept: string;
  autoComplete: string;
  component: 'avatar' | 'post';
  handlePreviewClick: () => void;
  handleFileChange: ({ target }: ChangeEvent<HTMLInputElement>) => void;
  handleInputBlur: ({ target }: FocusEvent<HTMLInputElement>) => void;
}
