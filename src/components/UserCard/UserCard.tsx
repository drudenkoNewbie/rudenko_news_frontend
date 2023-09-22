import {
  FC,
  useEffect,
  useState
} from 'react';
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
import { MODAL_TYPES, SNACKBAR_DELAY } from '../../constants';
import { AddPostForm } from '../AddPostForm';
import { getAvatarPath } from '../../utils/getAvatarPath';
import { ADD_POST, EDIT_PROFILE } from '../../locales/en.json'

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
  const { isOpen, modalType } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  useEffect(() => {
    if (userError != null) {
      setIsSnackbarOpen(true);

      const timer = setTimeout(() => {
        setIsSnackbarOpen(false);
      }, SNACKBAR_DELAY);

      return () => clearTimeout(timer);
    }
  }, [userError]);

  const openModal = (type: string) => {
      dispatch(createChangeModal({ isOpen: true, modalType: type }));
  };

  const handleClose = () => {
    dispatch(createChangeModal({ isOpen: false, modalType: '' }));
  };

  if (isUserFetching) return <CircularProgress />;

  if (user == null || authUser == null) return null;

  return (
    <Card variant="outlined" sx={sxCard}>
      <Box sx={sxTopBgBox} />
      <Box sx={sxAvatarBox}>
        <Avatar
          src={getAvatarPath(user)}
          sx={sxAvatar}
        />
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
        isOpen={isOpen}
        handleClose={handleClose}
      >
        {modalType === MODAL_TYPES.EDIT_USER && <EditUserForm handleClose={handleClose} />}
        {modalType === MODAL_TYPES.ADD_POST && <AddPostForm handleClose={handleClose} />}
      </BasicDialog>
      {userError != null && (
        <Snackbar
          open={isSnackbarOpen}
          autoHideDuration={SNACKBAR_DELAY}
          message={`${userError}`}
        />
      )}
      {authUser.id === user.id && (
        <CardActions>
          <Button
            sx={sxMarginXAuto}
            size="small"
            onClick={() => openModal(MODAL_TYPES.EDIT_USER)}
          >
            {EDIT_PROFILE}
          </Button>
          <Button
            sx={sxMarginXAuto}
            size="small"
            onClick={() => openModal(MODAL_TYPES.ADD_POST)}
          >
            {ADD_POST}
          </Button>
        </CardActions>
      )}
    </Card>
  );
};
