import { type FC } from 'react';
import { Alert } from '@mui/material';

import { sxCentering } from '../sxStyles';

import { NotificationProps } from './types';

export const Notification: FC<NotificationProps> = ({ type, message }) => (
  <Alert sx={sxCentering} severity={type}>{message}</Alert>
);
