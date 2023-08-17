import { type FC } from 'react';

import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton 
} from '@mui/material'

import MenuIcon from '@mui/icons-material/Menu';

import { NEWS, SIGN_IN, SING_UP } from '../../locales/en.json';

import {
  sxFlexGrow,
  sxPositionStatic,
  sxColorInherit,
  sxIconButton,
} from './sxStyles';

const Header: FC = () => (
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
        <Button sx={sxColorInherit}>{SIGN_IN}</Button>
        <Button sx={sxColorInherit}>{SING_UP}</Button>
      </Toolbar>
    </AppBar>
  </Box>
);

export default Header;
