import { type FC } from 'react';

import { CircularProgress } from '@mui/material';

import { sxCentering } from '../sxStyles';

export const Loader: FC = () => <CircularProgress sx={sxCentering} />;

