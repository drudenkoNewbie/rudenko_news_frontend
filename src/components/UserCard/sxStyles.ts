import { red } from '@mui/material/colors';

export const sxCard = {
  width: '50%',
  justifyContent: 'center',
  marginX: 'auto',
  marginY: 3,
  position: 'relative',
  borderRadius: '7px'
};

export const sxTopBgBox = {
  bgcolor: '#1976d2',
  width: '101%',
  height: '80px',
  position: 'absolute',
  top: 0,
  left: 0,
  borderRadius: '6px 6px 1px 1px'
};

export const sxAvatar = {
  bgcolor: red[500],
  marginY: 1,
  marginX: 'auto',
  width: '90px',
  height: '90px'
};

export const sxUsername = { textAlign: 'center', paddingY: 0 };

export const sxUserInfoBox = {
  display: 'flex',
  justifyContent: 'space-evenly',
  width: '100%',
  marginX: 'auto'
};

export const sxAvatarBox = { flexDirection: 'column', paddingY: 1, marginX: 0 };

export const sxTextAlign = { margin: 0, textAlign: 'center' };

export const sxUserInfoIcon = { verticalAlign: 'bottom', marginX: 1 };

export const sxMarginXAuto = { marginX: 'auto' };
