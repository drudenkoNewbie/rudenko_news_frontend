import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { MouseEvent, useEffect, useState } from 'react';
import { CircularProgress, Snackbar } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { createChangeModal } from '../../redux/actions/modalActions';
import AuthForm from '../AuthForm';
import BasicDialog from '../AuthDialog';
import { createAuthSignOut, createAuthVerifyRequested } from '../../redux/actions/authActions';

import { sxLoaderInvisible, sxLoaderVisible } from './sxStyles';

export const Header = () => {
  const dispatch = useAppDispatch();
  const { isOpen, modalType } = useAppSelector(state => state.modal);
  const { authUser, isAuthLoading, authError } = useAppSelector(state => state.auth);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
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

  const handleAuthButtonClick = ({ target }: MouseEvent<HTMLButtonElement> & {target: {name: string}} ) => {
    dispatch(createChangeModal({ isOpen: true, modalType: target.name }));
  };
  const handleClose = () => {
    dispatch(createChangeModal({ isOpen: false, modalType: '' }));
  };
  const handleSignOut = () => {
    dispatch(createAuthSignOut());
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          {!authUser && <>
            <Button onClick={handleAuthButtonClick} name={'sign-in'} color="inherit">Sign In</Button>
            <Button onClick={handleAuthButtonClick} name={'sign-up'} color="inherit">Sign Up</Button>
          </>}
          {authUser && <>
            <Button name={`${authUser.username}`} color="inherit">{authUser.username}</Button>
            <Button name={'sign-out'} color="inherit" onClick={handleSignOut}>Sign Out</Button>
          </>}
          <CircularProgress sx={isAuthLoading ? sxLoaderVisible : sxLoaderInvisible} />
          <BasicDialog isOpen={isOpen} handleClose={handleClose}>
            <AuthForm formTitle={modalType}
              formSubTitle={`To ${modalType} fill out the form and press submit button`}
              actions={[
                { name: 'cancel', onClick: handleClose },
                { name: 'submit', type: 'submit' }]}>
            </AuthForm>
          </BasicDialog>
        </Toolbar>
      </AppBar>
      {authError && <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        message={`${authError}`}
      />}
    </>
  );
};
