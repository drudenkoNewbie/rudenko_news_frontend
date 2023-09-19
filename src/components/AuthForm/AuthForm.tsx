import { FormEvent, FC, useState, useEffect } from 'react';
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  Box,
  IconButton,
  InputAdornment
} from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';

import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { SUBMIT, TOGGLE_VISIBILITY } from '../../locales/en.json';
import useInput from '../../hooks/useInput';
import Loader from '../Loader';
import { SHAKE_INPUT_DURATION } from '../../constants';
import { AuthUser } from '../../types';

import { shakeAnimation, sxJustifyCenter, sxMargin10 } from './sxStyles';
import { usernameSchema, emailSchema, passwordSchema } from './constants';
import { AuthFormProps } from './types';
import { createAuthRequested } from '../../redux/actions/authActions';

export const AuthForm: FC<AuthFormProps> = ({
  formTitle, formSubTitle
}) => {
  const dispatch = useAppDispatch();

  const { isAuthLoading } = useAppSelector((state) => state.auth)

  const [showPassword, setShowPassword] = useState(false);
  const [submitAttempt, setSubmitAttempt] = useState(0);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const passwordInputType = showPassword ? 'text' : 'password';

  const usernameInputProps = useInput(usernameSchema);
  const emailInputProps = useInput(emailSchema);
  const passwordInputProps = useInput(passwordSchema);

  useEffect(() => {
    if (submitAttempt > 0) {
      const timer = setTimeout(() => setSubmitAttempt(0), SHAKE_INPUT_DURATION);

      return () => clearTimeout(timer);
    }
  }, [submitAttempt]);

  const formData: AuthUser = {
    username: usernameInputProps.value,
    email: emailInputProps.value,
    password: passwordInputProps.value
  };

  const isFormError =
    usernameInputProps.error ||
    emailInputProps.error ||
    passwordInputProps.error ||
    Object.values(formData).some((v) => v === '');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSubmitAttempt((attempts) => attempts + 1);

    if (!isFormError) {
      dispatch(createAuthRequested(formData));
    }
  };

  return (
    <>
      <Box sx={isAuthLoading ? { opacity: 0 } : {}}>
        <DialogTitle>{formTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{formSubTitle}</DialogContentText>
        </DialogContent>
        <form onSubmit={handleSubmit}>
          <Box sx={sxMargin10}>
            <TextField
              {...usernameInputProps}
              sx={
                usernameInputProps.error && submitAttempt > 0
                  ? shakeAnimation
                  : {}
              }
              margin="dense"
              fullWidth
            />
            <TextField
              {...emailInputProps}
              sx={
                emailInputProps.error && submitAttempt > 0 ? shakeAnimation : {}
              }
              margin="dense"
              fullWidth
            />
            <TextField
              {...passwordInputProps}
              type={passwordInputType}
              sx={
                passwordInputProps.error && submitAttempt > 0
                  ? shakeAnimation
                  : {}
              }
              margin="dense"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={TOGGLE_VISIBILITY}
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Box>
          <DialogActions sx={sxJustifyCenter}>
            <Button disabled={isFormError} name="submit" type="submit">
              {SUBMIT}
            </Button>
          </DialogActions>
        </form>
      </Box>
      {isAuthLoading ? <Loader /> : null}
    </>
  );
};
