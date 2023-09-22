import {
  FormEvent,
  type FC,
  useState,
  useEffect
} from 'react';
import {
  DialogTitle,
  DialogActions,
  Button,
  TextField,
  Box,
  Alert,
  IconButton,
  InputAdornment,
  CircularProgress
} from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';

import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import {
  CANCEL,
  SUBMIT,
  TOGGLE_PASSWORD_VISIBILITY,
  EDIT_PROFILE,
  AT_LEAST_ONE_NON_EMPTY_FIELD
} from '../../locales/en.json';
import useTextInput from '../../hooks/useTextInput';
import { createEditUserRequested } from '../../redux/actions/userActions';
import { SHAKE_INPUT_DURATION, BUTTON_NAMES } from '../../constants';
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

  const [isGlobalError, setIsGlobalError] = useState(false);
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

  const formData = {
    username: usernameInputProps.value,
    email: emailInputProps.value,
    password: passwordInputProps.value,
    avatar: avatarInputProps.file
  };

  const isFormError =
    usernameInputProps.error
    || emailInputProps.error
    || passwordInputProps.error
    || avatarInputProps.error;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const hasAtLeastOneFilledField = Object.values(formData).some((value) => {
      if (value == null) return false;
      if (typeof value === 'string' && value.trim() === '') return false;
      else return true;
    });

    if (!hasAtLeastOneFilledField) {
      setIsGlobalError(true);

      return;
    } else setIsGlobalError(false);

    setSubmitAttempt((attempts) => attempts + 1);

    if (!isFormError && !isGlobalError) {
      if (user != null && 'id' in user)
        dispatch(createEditUserRequested({ userData: formData, id: user.id }));
    }
  };

  return (
    <Box>
        <DialogTitle>{EDIT_PROFILE}</DialogTitle>
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
            {isGlobalError ? (
              <Alert severity="error">
                {isGlobalError ? AT_LEAST_ONE_NON_EMPTY_FIELD : userError}
              </Alert>
            ) : null}
          </Box>
          <DialogActions sx={sxJustifyCenter}>
            <Button name={BUTTON_NAMES.CANCEL} onClick={handleClose}>
              {CANCEL}
            </Button>
            <Button name={BUTTON_NAMES.SUBMIT} type="submit" disabled={isFormError}>
            {isEditUserFetching ? <CircularProgress /> : SUBMIT}
            </Button>
          </DialogActions>
        </form>
      </Box>
  );
};
