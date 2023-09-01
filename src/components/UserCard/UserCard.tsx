import { FC } from 'react';
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Avatar,
  Box
} from '@mui/material';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import { useAppSelector } from '../../redux/hooks/hooks';
import { getFormattedDate } from '../../utils/getFormattedDate';

import {
  sxCard,
  sxTopBgBox,
  sxAvatar,
  sxUsername,
  sxUserInfoBox,
  sxTextAlign,
  sxUserInfoIcon,
  sxMarginXAuto,
  sxAvatarBox
} from './sxStyles';

export const UserCard: FC = () => {
  const { user } = useAppSelector((state) => state.user);
  const { authUser } = useAppSelector((state) => state.auth);

  return (
    <Card variant="outlined" sx={sxCard}>
      <Box sx={sxTopBgBox}></Box>
      <Box sx={sxAvatarBox}>
        <Avatar sx={sxAvatar}>{user?.username[0]}</Avatar>
      </Box>
      <CardContent sx={sxUsername}>
        <Typography gutterBottom variant="h4" component="div">
          {user?.username}
        </Typography>
        <Box sx={sxUserInfoBox}>
          <Typography sx={sxTextAlign} variant="body1" color="text.secondary">
            {user?.createdAt ? (
              <>
                <AlternateEmailIcon sx={sxUserInfoIcon} />
                {user.email}
              </>
            ) : (
              ''
            )}
          </Typography>
          <Typography sx={sxTextAlign} variant="body1" color="text.secondary">
            {user?.createdAt ? (
              <>
                <CalendarMonthIcon sx={sxUserInfoIcon} />
                {getFormattedDate(user?.createdAt)}
              </>
            ) : (
              ''
            )}
          </Typography>
        </Box>
      </CardContent>
      {authUser?.id === user?.id && (
        <CardActions>
          <Button sx={sxMarginXAuto} size="small">
            Edit profile
          </Button>
        </CardActions>
      )}
    </Card>
  );
};
