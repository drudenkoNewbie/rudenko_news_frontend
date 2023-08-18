import { type FC } from 'react';

import { Alert } from '@mui/material';

import NotificationProps from './types/';

import { sxCentering } from '../sxStyles';

export const Notification: FC<NotificationProps> = ({ type, message }) => (
  <Alert sx={sxCentering} severity={type}>{message}</Alert>
);
