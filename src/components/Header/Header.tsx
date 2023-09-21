import { MouseEvent, useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  CircularProgress,
  Snackbar
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { createChangeModal } from '../../redux/actions/modalActions';
import AuthForm from '../AuthForm';
import BasicDialog from '../BasicDialog';
import { createAuthSignOut } from '../../redux/actions/authActions';
import { createUserRequested } from '../../redux/actions/userActions';
import { SNACKBAR_DELAY } from '../../constants';
import { createVerifyRequested } from '../../redux/actions/verifyUserActions';
import {
  SIGN_IN,
  SIGN_UP,
  SIGN_OUT,
  BY_FILLING_THE_FORM
} from '../../locales/en.json'

import { sxLoaderInvisible, sxLoaderVisible, sxFlexGrow } from './sxStyles';

export const Header = () => {
  const dispatch = useAppDispatch();
  const { isOpen, modalType } = useAppSelector((state) => state.modal);
  const { authUser, isAuthLoading, authError, isLoggedIn } = useAppSelector(
    (state) => state.auth
  );
  const { userError, isUserFetching, isEditUserFetching } = useAppSelector(
    (state) => state.user
  );
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (authError != null || userError != null) {
      setIsSnackbarOpen(true);
      const timer = setTimeout(() => {
        setIsSnackbarOpen(false);
      }, SNACKBAR_DELAY);

      return () => clearTimeout(timer);
    }
  }, [isAuthLoading, isUserFetching, isEditUserFetching]);
  useEffect(() => {
    if (isLoggedIn) dispatch(createVerifyRequested());
  }, []);

  const handleAuthButtonClick = ({
    target
  }: MouseEvent<HTMLButtonElement> & { target: { name: string } }) => {
    dispatch(createChangeModal({ isOpen: true, modalType: target.name }));
  };

  const handleSignOut = () => {
    dispatch(createAuthSignOut());
    navigate('/');
  };

  const handleClose = () => {
    dispatch(createChangeModal({ isOpen: false, modalType: '' }));
  };

  const handleUsernameClick = () => {
    if (authUser != null) dispatch(createUserRequested(authUser.id));
    navigate(`/users/${authUser?.id}`);
  };

  const handleTitleClick = () => {
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          color="#fff"
          onClick={handleTitleClick}
          variant="h4"
          component="div"
          sx={sxFlexGrow}
        >
          <Button color="inherit">News</Button>
        </Typography>
        {authUser == null ? (
          <>
            <Button
              onClick={handleAuthButtonClick}
              name="sign-in"
              color="inherit"
            >
              {SIGN_IN}
            </Button>
            <Button
              onClick={handleAuthButtonClick}
              name="sign-up"
              color="inherit"
            >
              {SIGN_UP}
            </Button>
          </>
        ) : (
          <>
            <Button
              name="user-page"
              onClick={handleUsernameClick}
              color="inherit"
            >
              {authUser.username}
            </Button>

            <Button name="sign-out" color="inherit" onClick={handleSignOut}>
              {SIGN_OUT}
            </Button>
          </>
        )}
        <CircularProgress
          sx={isAuthLoading ? sxLoaderVisible : sxLoaderInvisible}
        />
        <BasicDialog isOpen={isOpen} handleClose={handleClose}>
          <AuthForm
            formTitle={modalType}
            formSubTitle={`${modalType} ${BY_FILLING_THE_FORM}`}
          ></AuthForm>
        </BasicDialog>
      </Toolbar>
      {(authError != null || userError != null) && (
        <Snackbar
          open={isSnackbarOpen}
          autoHideDuration={SNACKBAR_DELAY}
          message={authError ?? userError}
        />
      )}
    </AppBar>
  );
};
