import { type FC } from 'react';

import { Alert } from '@mui/material';

import { Notification } from './Notification.props';

import { sxCentering } from '../sxStyles';

export const Notification: FC<Notification> = ({ type, message }) => (
  <Alert sx={sxCentering} severity={type}>{message}</Alert>
);
