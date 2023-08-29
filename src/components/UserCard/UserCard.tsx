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
import { red } from '@mui/material/colors';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import { useAppSelector } from '../../redux/hooks/hooks';
import { getFormattedDate } from '../../utils/getFormattedDate';

export const UserCard: FC = () => {
  const { authUser } = useAppSelector(state => state.auth);
  return(
    <Card variant='outlined'
      sx={{
        width: '50%',
        justifyContent: 'center',
        marginX: 'auto',
        marginY: 3,
        position: 'relative',
        borderRadius: '7px'
      }}>
      <Box
        sx={{
          bgcolor: '#1976d2',
          width: '101%',
          height: '80px',
          position: 'absolute',
          top: 0,
          left: 0,
          borderRadius:'6px 6px 1px 1px'
        }}
      ></Box>
      <Box sx={{ flexDirection: 'column', paddingY: 1, marginX: 0 }}>
        <Avatar sx={{
          bgcolor: red[500],
          marginY: 1,
          marginX: 'auto',
          width: '90px',
          height: '90px'
        }}>
          {authUser?.username[0]}
        </Avatar>
      </Box>
      <CardContent sx={{ textAlign: 'center', paddingY: 0 }}>
        <Typography gutterBottom variant="h4" component="div">
          {authUser?.username}
        </Typography>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          width: '100%',
          marginX: 'auto'
        }}>
          <Typography sx={{ margin: 0, textAlign: 'center' }} variant="body1" color="text.secondary">
            { authUser?.createdAt ? <><AlternateEmailIcon sx={{ verticalAlign: 'bottom', marginX: 1 }} />{authUser.email}</> : ''}
          </Typography>
          <Typography sx={{  margin: 0, textAlign: 'center' }} variant="body1" color="text.secondary">
            { authUser?.createdAt ? <><CalendarMonthIcon sx={{ verticalAlign: 'bottom', marginX: 1 }} />{getFormattedDate(authUser?.createdAt)}</> : ''}
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button sx={{ marginX: 'auto' }} size="small">Edit profile</Button>
      </CardActions>
    </Card>
  );
};
