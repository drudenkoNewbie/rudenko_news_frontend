import { FC, SyntheticEvent, useEffect, useState } from 'react';
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
import { AddPostForm } from '../AddPostForm';

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

const imgBaseUrl = import.meta.env.VITE_APP_PUBLIC_URL;
const editUserPayload = { isOpen: true, modalType: 'Edit profile' };
const addPostPayload = { isOpen: true, modalType: 'Add post' };

export const UserCard: FC = () => {
  const { user, isUserFetching, userError } = useAppSelector(
    (state) => state.user
  );
  const { authUser } = useAppSelector((state) => state.auth);
  const { isOpen, modalType } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isImageFetchingError, setIsImageFetchingError] = useState(false);

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
    dispatch(createChangeModal(editUserPayload));
  };

  const handleAddPostClick = () => {
    dispatch(createChangeModal(addPostPayload));
  };

  const handleClose = () => {
    dispatch(createChangeModal({ isOpen: false, modalType: '' }));
  };

  const handleError = ({
    currentTarget
  }: SyntheticEvent<HTMLImageElement, ErrorEvent>) => {
    currentTarget.onerror = null;
    setIsImageFetchingError(true);
  };

  if (isUserFetching) return <CircularProgress />;

  if (user != null && authUser != null)
    return (
      <Card variant="outlined" sx={sxCard}>
        <Box sx={sxTopBgBox} />
        <Box sx={sxAvatarBox}>
          <Avatar
            src={
              user.avatarUrl != null
                ? `${imgBaseUrl}/avatar/${user.avatarUrl}`
                : '#'
            }
            sx={sxAvatar}
            onError={handleError}
          >
            {(user.avatarUrl == null || isImageFetchingError) &&
              user.username[0]}
          </Avatar>
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
        <BasicDialog
          isOpen={isOpen && editUserPayload.modalType === modalType}
          handleClose={handleClose}
        >
          <EditUserForm handleClose={handleClose} />
        </BasicDialog>
        <BasicDialog
          isOpen={isOpen && addPostPayload.modalType === modalType}
          handleClose={handleClose}
        >
          <AddPostForm handleClose={handleClose} />
        </BasicDialog>
        {userError != null && (
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={SNACKBAR_DELAY}
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
            <Button
              sx={sxMarginXAuto}
              size="small"
              onClick={handleAddPostClick}
            >
              Add Post
            </Button>
          </CardActions>
        )}
      </Card>
    );
};
