import {
  ChangeEvent,
  FocusEvent,
  FormEvent,
  FC,
  useState
} from 'react';
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  Box
} from '@mui/material';

import { useAppDispatch } from '../../redux/hooks/hooks';
import { createAuthRequested } from '../../redux/actions/authActions';
import { createChangeModal } from '../../redux/actions/modalActions';
import { isValidEmail } from '../../utils/validateEmail';
import {
  USERNAME,
  EMAIL,
  PASSWORD,
  CANCEL,
  CANT_BE_EMPTY,
  SUBMIT,
  INVALID_EMAIL
} from '../../locales/en.json';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter';

import { AuthFormProps, ErrorData, FormData } from './types';
import { sxJustifyCenter, sxMargin10 } from './sxStyles';

export const AuthForm: FC<AuthFormProps> = ({ formTitle, formSubTitle }) => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<ErrorData>({
    username: '',
    email: '',
    password: ''
  });
  const dispatch = useAppDispatch();

  const validateField = (name: string, value: string) => {
    let error = '';

    if (name === 'email') {
      if (!isValidEmail(value)) {
        error = INVALID_EMAIL;
      }
    } else if (['password', 'username'].includes(name)) {
      if (value.trim() === '') {
        error = `${capitalizeFirstLetter(name)} ${CANT_BE_EMPTY}`;
      }
    }

    return error;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);

    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: error });
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);

    setErrors({ ...errors, [name]: error });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let isValid = true;
    const newErrors: ErrorData = {};
    for (const [name, value] of Object.entries(formData)) {
      const error = validateField(name, value);

      newErrors[name] = error;
      if (error !== '') isValid = false;
    }
    setErrors(newErrors);
    if (isValid) {
      dispatch(createAuthRequested(formData));
    }
  };

  const handleClose = () => {
    dispatch(createChangeModal({ isOpen: false, modalType: '' }));
  };

  return (
    <>
      <DialogTitle>{formTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText>{formSubTitle}</DialogContentText>
      </DialogContent>
      <form onSubmit={handleSubmit}>
        <Box sx={sxMargin10}>
          <TextField
            name="username"
            label={USERNAME}
            value={formData.username}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={errors.username}
            error={Boolean(errors.username)}
            margin="dense"
            fullWidth
          />
          <TextField
            name="email"
            label={EMAIL}
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={errors.email}
            error={Boolean(errors.email)}
            margin="dense"
            fullWidth
          />
          <TextField
            name="password"
            label={PASSWORD}
            type="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={errors.password}
            error={Boolean(errors.password)}
            margin="dense"
            fullWidth
          />
        </Box>
        <DialogActions sx={sxJustifyCenter}>
          <Button name="cancel" onClick={handleClose}>
            {CANCEL}
          </Button>
          <Button name="submit" type="submit">
            {SUBMIT}
          </Button>
        </DialogActions>
      </form>
    </>
  );
};
