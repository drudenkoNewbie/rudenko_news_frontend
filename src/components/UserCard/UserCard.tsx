import { FC, useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Avatar,
  Box,
  CircularProgress,
  Snackbar
} from '@mui/material';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { getFormattedDate } from '../../utils/getFormattedDate';
import { createChangeModal } from '../../redux/actions/modalActions';
import BasicDialog from '../BasicDialog';
import { EditUserForm } from '../EditUserForm/EditUserForm';
import { SNACKBAR_DELAY } from '../../constants';

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
  const { user, isUserFetching, userError } = useAppSelector(
    (state) => state.user
  );
  const { authUser } = useAppSelector((state) => state.auth);
  const { isOpen } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    if (userError != null) {
      setSnackbarOpen(true);
      const timer = setTimeout(() => {
        setSnackbarOpen(false);
      }, SNACKBAR_DELAY);

      return () => clearTimeout(timer);
    }
  }, [userError]);

  const handleEditUserClick = () => {
    dispatch(createChangeModal({ isOpen: true, modalType: 'Edit profile' }));
  };

  const handleClose = () => {
    dispatch(createChangeModal({ isOpen: false, modalType: '' }));
  };

  if (isUserFetching) return <CircularProgress />;

  if (user != null && authUser != null)
    return (
      <Card variant="outlined" sx={sxCard}>
        <Box sx={sxTopBgBox} />
        <Box sx={sxAvatarBox}>
          <Avatar sx={sxAvatar}>{user.username[0]}</Avatar>
        </Box>
        <CardContent sx={sxUsername}>
          <Typography gutterBottom variant="h4" component="div">
            {user.username}
          </Typography>
          <Box sx={sxUserInfoBox}>
            <Typography sx={sxTextAlign} variant="body1" color="text.secondary">
              <AlternateEmailIcon sx={sxUserInfoIcon} />
              {user.email}
            </Typography>
            <Typography sx={sxTextAlign} variant="body1" color="text.secondary">
              <CalendarMonthIcon sx={sxUserInfoIcon} />
              {getFormattedDate(user.createdAt)}
            </Typography>
          </Box>
        </CardContent>
        <BasicDialog isOpen={isOpen} handleClose={handleClose}>
          <EditUserForm handleClose={handleClose} />
        </BasicDialog>
        {userError != null && (
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={5000}
            message={`${userError}`}
          />
        )}
        {authUser.id === user.id && (
          <CardActions>
            <Button
              sx={sxMarginXAuto}
              size="small"
              onClick={handleEditUserClick}
            >
              Edit profile
            </Button>
          </CardActions>
        )}
      </Card>
    );
};
