import { ChangeEvent, FocusEvent, useState } from 'react';

import { InputProps } from '../types';

const useInput = ({
  name = '',
  initial = '',
  required = false,
  type = 'text',
  label = name[0].toUpperCase() + name.slice(1),
  autoComplete = 'off',
  isValid = () => true
}: InputProps) => {
  const [value, setValue] = useState(initial);
  const [helperText, setHelperText] = useState('');

  const onBlur = ({ target: { value } }: FocusEvent<HTMLInputElement>) => {
    if (value === '' && required) {
      setHelperText(`${label} is required`);
    } else if (value !== '' && isValid != null && !isValid(value)) {
      setHelperText(`${label} is invalid`);
    } else setHelperText('');
  }

  const onChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => setValue(value)

  return {
    value,
    helperText,
    name,
    type,
    label,
    autoComplete,
    error: Boolean(helperText),
    onBlur,
    onChange
  };
};

export default useInput;
