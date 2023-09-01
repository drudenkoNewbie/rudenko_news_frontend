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

  useEffect(() => {
    if (authError) {
      setSnackbarOpen(true);
      const timer = setTimeout(() => {
        setSnackbarOpen(false);
      }, 5000);

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
    if (authUser) {
      dispatch(createUserRequested(authUser.id));
    }
    navigate(`/user/${authUser?.id}`);
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
        {!authUser && (
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
        )}
        {authUser && (
          <>
            <Button
              name={`${authUser.username}`}
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
      {authError && (
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={5000}
          message={`${authError}`}
        />
      )}
    </AppBar>
  );
};
