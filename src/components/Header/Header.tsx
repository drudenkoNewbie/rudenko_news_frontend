import { FC } from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import {NEWS} from '../../locales/en.json'

import { sxFlexGrow, sxPositionStatic, sxColorInherit, sxIconButton } from './sxStyles';

const Header: FC = () => {
  return (
    <Box sx={ sxFlexGrow }>
      <AppBar sx={ sxPositionStatic }>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={sxIconButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={ sxFlexGrow }>
              {NEWS}
          </Typography>
          <Button sx={ sxColorInherit }>Sign in</Button>
          <Button sx={ sxColorInherit }>Sign out</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;