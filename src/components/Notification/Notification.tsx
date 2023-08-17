import { type FC } from 'react';

import { Alert } from '@mui/material';

import { INotification } from './Notification.props';

import { sxCentering } from '../sxStyles';

export const Notification: FC<INotification> = ({ type, message }) => (
  <Alert sx={sxCentering} severity={type}>{message}</Alert>
);
