import { memo, type FC } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { getFormattedDate } from '../../utils/getFormattedDate';
import TagContainer from '../TagContainer';
import { Post } from '../../types';
import { DATE } from '../../locales/en.json';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { createUserRequested } from '../../redux/actions/userActions';

import { sxCard, sxData, sxAuthor, sxTextAlignCenter } from './sxStyles';

const PostCard: FC<Post & { author: string | null }> = ({
  createdAt,
  title,
  content,
  tags,
  author,
  authorId
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { authUser } = useAppSelector((state) => state.auth);

  const handleAuthorClick = () => {
    if (authUser) {
      navigate(`/user/${authorId}`);
      dispatch(createUserRequested(authorId));
    }
  };

  return (
    <Card sx={sxCard}>
      <CardActionArea>
        <Typography sx={sxData} gutterBottom variant="body1" component="div">
          {DATE}: {getFormattedDate(createdAt)}
        </Typography>
        <Typography
          sx={sxAuthor}
          onClick={handleAuthorClick}
          gutterBottom
          variant="body1"
          component="div"
        >
          {author}
        </Typography>
        <CardMedia
          component="img"
          height="300"
          image="https://placehold.co/600x400/EEE/31343C"
          alt="placeholder"
        />
        <CardContent>
          <Typography
            sx={sxTextAlignCenter}
            gutterBottom
            variant="h3"
            component="div"
          >
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {content}
          </Typography>
        </CardContent>
      </CardActionArea>
      <TagContainer tags={tags} />
    </Card>
  );
};

export default memo(PostCard);
