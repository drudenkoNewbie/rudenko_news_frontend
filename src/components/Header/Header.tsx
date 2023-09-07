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
import {
  createAuthSignOut,
  createAuthVerifyRequested
} from '../../redux/actions/authActions';
import { createUserRequested } from '../../redux/actions/userActions';

import { sxLoaderInvisible, sxLoaderVisible, sxFlexGrow } from './sxStyles';

export const Header = () => {
  const dispatch = useAppDispatch();
  const { isOpen, modalType } = useAppSelector((state) => state.modal);
  const { authUser, isAuthLoading, authError } = useAppSelector(
    (state) => state.auth
  );
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();
  const SNACKBAR_DELAY = 5000;

  useEffect(() => {
    if (authError != null) {
      setSnackbarOpen(true);
      const timer = setTimeout(() => {
        setSnackbarOpen(false);
      }, SNACKBAR_DELAY);

      return () => clearTimeout(timer);
    }
  }, [authError]);
  useEffect(() => {
    dispatch(createAuthVerifyRequested());
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
              Sign In
            </Button>
            <Button
              onClick={handleAuthButtonClick}
              name="sign-up"
              color="inherit"
            >
              Sign Up
            </Button>
          </>
        ) : (
          <>
            <Button
              name={authUser.username}
              onClick={handleUsernameClick}
              color="inherit"
            >
              {authUser.username}
            </Button>

            <Button name="sign-out" color="inherit" onClick={handleSignOut}>
              Sign Out
            </Button>
          </>
        )}
        <CircularProgress
          sx={isAuthLoading ? sxLoaderVisible : sxLoaderInvisible}
        />
        <BasicDialog isOpen={isOpen} handleClose={handleClose}>
          <AuthForm
            formTitle={modalType}
            formSubTitle={`To ${modalType} fill out the form and press submit button`}
          ></AuthForm>
        </BasicDialog>
      </Toolbar>
      {authError != null && (
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={SNACKBAR_DELAY}
          message={authError}
        />
      )}
    </AppBar>
  );
};
