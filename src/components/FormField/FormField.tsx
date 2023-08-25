import { useState } from 'react';
import { TextField } from '@mui/material';

import { isValidEmail } from '../../utils/validateEmail';

import { FormFieldProps } from './types';

export const FormField = ({ label, type }: FormFieldProps) => {

  const [field, setField] = useState({ value: '', error: false, helperText: '' });

  const handleChange = ({ target: { value } }: {target: {value: string}}) => {
    setField({ ...field, value });
    switch (type) {
      case 'email':
        if (!isValidEmail(field.value)) {
          setField({ ...field, error: true, helperText: 'Email should be email' });
        } else {
          setField({ ...field, error: false, helperText: '' });
        }
        break;
      case 'password':
      case 'text':
        if (field.value === '') {
          setField({ ...field, error: true, helperText: `${label} shouldn't be empty` });
        } else {
          setField({ ...field, error: false, helperText: '' });
        }
        break;
      default:
        break;
    }
  };

  return <TextField
    margin="dense"
    label={label}
    type={type}
    fullWidth
    helperText={field.helperText}
    variant="standard"
    error={field.error}
    onChange={handleChange}
    onBlur={handleChange}
    defaultValue={field.value}
  />;
};

