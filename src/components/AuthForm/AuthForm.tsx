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
  TextField,Box
} from '@mui/material';

import { useAppDispatch } from '../../redux/hooks/hooks';
import { createAuthRequested } from '../../redux/actions/authActions';

import { AuthFormProps, ErrorData, FormData } from './types';

export const AuthForm: FC<AuthFormProps> = ({ formTitle, formSubTitle, actions }) => {
  const [formData, setFormData] = useState<FormData>({ username: '', email: '', password: '' });
  const [errors, setErrors] = useState<ErrorData>({ 'username': '', 'email': '', 'password': '' });
  const dispatch = useAppDispatch();

  const validateField = (name: string, value: string) => {
    let error = '';
    if (name === 'email') {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(value)) {
        error = 'Invalid email';
      }
    } else if (name === 'password' || name === 'username') {
      if (value.trim() === '') {
        error = `${name[0].toUpperCase() + name.slice(1)} can't be empty`;
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
      if (error) isValid = false;
    }
    setErrors(newErrors);
    if (isValid) {
      dispatch(createAuthRequested(formData));
    }
  };

  return (
    <>
      <DialogTitle>{formTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {formSubTitle}
        </DialogContentText>
      </DialogContent>
      <form onSubmit={handleSubmit}>
        <Box sx={{ marginX: 10 }}>
          <TextField
            name="username"
            label="Username"
            value={formData.username}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={errors.username}
            error={Boolean(errors.username)}
            margin='dense'
            fullWidth
          />
          <TextField
            name="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={errors.email}
            error={Boolean(errors.email)}
            margin='dense'
            fullWidth
          />
          <TextField
            name="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={errors.password}
            error={Boolean(errors.password)}
            margin='dense'
            fullWidth
          />
        </Box>
        <DialogActions sx={{ justifyContent: 'center' }}>
          {actions.map((button) =>
            <Button
              key={button.name}
              name={button.name}
              onClick={button.onClick}
              type={button.type}
            >
              {button.name}
            </Button>)}
        </DialogActions>
      </form>
    </>
  );
};
