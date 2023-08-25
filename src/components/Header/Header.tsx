import { type FC } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { NEWS, SIGN_IN, SING_UP } from '../../locales/en.json';
import { FormModal } from '../FormModal/FormModal';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { createChangeModal } from '../../redux/actions/modalActions';

import {
  sxFlexGrow,
  sxPositionStatic,
  sxColorInherit,
  sxIconButton
} from './sxStyles';

export const Header: FC = () => {
  const dispatch = useAppDispatch();
  const { authUser } = useAppSelector(state => state.auth);
  const handleSignInClick = () => {
    dispatch(createChangeModal({ isOpen: true, modalType: 'Sign in' }));
  };
  const handleSignUpClick = () => {
    dispatch(createChangeModal({ isOpen: true, modalType: 'Sign up' }));
  };
  return (
    <>
      <FormModal />
      <Box sx={sxFlexGrow}>
        <AppBar sx={sxPositionStatic}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              aria-label="menu"
              sx={sxIconButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={sxFlexGrow}>
              {NEWS}
            </Typography>
            {!authUser && (<><Button sx={sxColorInherit} onClick={handleSignInClick}>{SIGN_IN}</Button>
              <Button sx={sxColorInherit} onClick={handleSignUpClick}>{SING_UP}</Button></>)}
            {authUser && (<Button sx={sxColorInherit} onClick={handleSignUpClick}>{authUser.username}</Button>)}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );};
