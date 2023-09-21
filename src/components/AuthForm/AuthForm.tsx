import {
  FormEvent,
  type FC,
  useState,
  useEffect
} from 'react';
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  Box,
  IconButton,
  InputAdornment,
  CircularProgress
} from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';

import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { SUBMIT, TOGGLE_PASSWORD_VISIBILITY } from '../../locales/en.json';
import useTextInput from '../../hooks/useTextInput';
import useFileInput from '../../hooks/useFileInput';
import { SHAKE_INPUT_DURATION, BUTTON_NAMES } from '../../constants';
import { AuthUser } from '../../types';
import { createAuthRequested } from '../../redux/actions/authActions';
import { FileField } from '../FileField';

import { shakeAnimation, sxJustifyCenter, sxMargin10 } from './sxStyles';
import {
  avatarSchema,
  usernameSchema,
  emailSchema,
  passwordSchema
} from './constants';
import { AuthFormProps } from './types';

export const AuthForm: FC<AuthFormProps> = ({ formTitle, formSubTitle }) => {
  const dispatch = useAppDispatch();

  const { isAuthLoading } = useAppSelector((state) => state.auth);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [submitAttempt, setSubmitAttempt] = useState(0);

  const handleClickShowPassword = () => setIsPasswordVisible((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const passwordInputType = isPasswordVisible ? 'text' : 'password';

  const avatarInputProps = useFileInput(avatarSchema);
  const usernameInputProps = useTextInput(usernameSchema);
  const emailInputProps = useTextInput(emailSchema);
  const passwordInputProps = useTextInput(passwordSchema);

  useEffect(() => {
    if (submitAttempt > 0) {
      const timer = setTimeout(() => setSubmitAttempt(0), SHAKE_INPUT_DURATION);

      return () => clearTimeout(timer);
    }
  }, [submitAttempt]);

  const formData: AuthUser = {
    username: usernameInputProps.value,
    email: emailInputProps.value,
    password: passwordInputProps.value,
    avatar: avatarInputProps.file
  };

  const isFormError =
    usernameInputProps.error
    || emailInputProps.error
    || passwordInputProps.error
    || avatarInputProps.error
    || Object.values(formData).some((v) => v === '');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitAttempt((attempts) => attempts + 1);

    if (!isFormError) {
      dispatch(createAuthRequested(formData));
    }
  };

  return (
    <Box>
        <DialogTitle>{formTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{formSubTitle}</DialogContentText>
        </DialogContent>
        <form onSubmit={handleSubmit}>
          <Box sx={sxMargin10}>
            {formTitle === 'sign-up' && (
              <FileField
                component="avatar"
                {...avatarInputProps}
                ref={avatarInputProps.inputRef}
              />
            )}
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
                      aria-label={TOGGLE_PASSWORD_VISIBILITY}
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {isPasswordVisible ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Box>
          <DialogActions sx={sxJustifyCenter}>
            <Button disabled={isFormError} name={BUTTON_NAMES.SUBMIT} type="submit">
              {isAuthLoading ? <CircularProgress /> : SUBMIT}
            </Button>
          </DialogActions>
        </form>
      </Box>
  );
};
