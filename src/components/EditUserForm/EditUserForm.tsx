import { FormEvent, FC, useState, useEffect } from 'react';
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  Box,
  Alert,
  IconButton,
  InputAdornment
} from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';

import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { CANCEL, SUBMIT } from '../../locales/en.json';
import useTextInput from '../../hooks/useTextInput';
import Loader from '../Loader';
import { createEditUserRequested } from '../../redux/actions/userActions';
import { SHAKE_INPUT_DURATION } from '../../constants';
import useFileInput from '../../hooks/useFileInput';
import { FileField } from '../FileField';

import { shakeAnimation, sxJustifyCenter, sxMargin10 } from './sxStyles';
import {
  usernameSchema,
  emailSchema,
  passwordSchema,
  avatarSchema
} from './constants';

export const EditUserForm: FC<{ handleClose: () => void }> = ({
  handleClose
}) => {
  const dispatch = useAppDispatch();

  const { user, userError, isEditUserFetching } = useAppSelector(
    (state) => state.user
  );

  const [globalError, setGlobalError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [submitAttempt, setSubmitAttempt] = useState(0);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const passwordInputType = showPassword ? 'text' : 'password';

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

  const formData = {
    username: usernameInputProps.value,
    email: emailInputProps.value,
    password: passwordInputProps.value,
    avatar: avatarInputProps.file
  };

  const formError =
    usernameInputProps.error ||
    emailInputProps.error ||
    passwordInputProps.error ||
    avatarInputProps.error;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const hasAtLeastOneFilledField = Object.values(formData).some((value) => {
      if (value == null) return false;
      if (typeof value === 'string' && value.trim() === '') return false;
      else return true;
    });

    if (!hasAtLeastOneFilledField) {
      setGlobalError(true);

      return;
    } else setGlobalError(false);

    setSubmitAttempt((attempts) => attempts + 1);

    if (!formError && !globalError) {
      if (user != null && 'id' in user)
        dispatch(createEditUserRequested({ userData: formData, id: user.id }));
    }
  };

  return (
    <>
      <Box sx={isEditUserFetching ? { opacity: 0 } : {}}>
        <DialogTitle>Edit</DialogTitle>
        <DialogContent>
          <DialogContentText>You can edit your profile here</DialogContentText>
        </DialogContent>
        <form onSubmit={handleSubmit}>
          <Box sx={sxMargin10}>
            <FileField
              component="avatar"
              {...avatarInputProps}
              ref={avatarInputProps.inputRef}
            />
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
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            {globalError ? (
              <Alert severity="error">
                {globalError ? 'At least one non empty field' : userError}
              </Alert>
            ) : null}
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
      </Box>
      {isEditUserFetching ? <Loader /> : null}
    </>
  );
};
