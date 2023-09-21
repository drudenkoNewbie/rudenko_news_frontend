import {
  ChangeEvent,
  FocusEvent,
  useState,
  useRef
} from 'react';

import { FileInputProps } from '../types';

const useFileInput = ({
  name = '',
  initialFileName = '',
  initialPreviewSrc = '',
  isRequired = false,
  accept = '',
  label = `${name[0].toUpperCase()}${name.slice(1)}`,
  autoComplete = 'off',
  maxSize = Number(import.meta.env.VITE_MAX_FILE_SIZE)
}: FileInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewSrc, setPreviewSrc] = useState(initialPreviewSrc);
  const [fileName, setFileName] = useState(initialFileName);
  const [helperText, setHelperText] = useState('');
  const [file, setFile] = useState<null | File>(null);

  const handleInputBlur = ({ target }: FocusEvent<HTMLInputElement>) => {
    if (target.files != null) {
      const file = target.files[0];

      if (file == null && isRequired) {
        setHelperText(`${label} is required`);
      } else if (file?.size != null && file.size > maxSize) {
        setHelperText(
          `${label} file size exceeds the maximum limit of ${maxSize}`
        );
      } else setHelperText('');
    }
  };

  const handleFileChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target.files != null) {
      const newFile = target.files[0];

      if (newFile != null) {
        const reader = new FileReader();

        reader.onloadend = () => {
          setFile(newFile);
          setFileName(newFile.name);
          setPreviewSrc(String(reader.result));
        };
        reader.readAsDataURL(newFile);
      }
    }
  };

  const handlePreviewClick = () => {
    if (inputRef.current != null) inputRef.current.click();
  };

  return {
    file,
    previewSrc,
    inputRef,
    fileName,
    helperText,
    error: Boolean(helperText),
    accept,
    autoComplete,
    handlePreviewClick,
    handleFileChange,
    handleInputBlur
  };
};

export default useFileInput;
