import { memo, type FC, SyntheticEvent } from 'react';
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
import { useAppSelector } from '../../redux/hooks/hooks';
import { DEFAULT_IMAGE_URL } from '../../constants';

import {
  sxCard,
  sxData,
  sxAuthor,
  sxTextAlignCenter
} from './sxStyles';
import { PostCardProps } from './types';

const imgBaseUrl = import.meta.env.VITE_APP_PUBLIC_URL;

const PostCard: FC<PostCardProps> = ({
  createdAt,
  title,
  content,
  tags,
  author,
  authorId,
  imageUrl
}) => {
  const navigate = useNavigate();
  const { authUser } = useAppSelector((state) => state.auth);

  const imageSrcUrl =
    imageUrl != null
      ? `${imgBaseUrl}/post-image/${imageUrl}`
      : DEFAULT_IMAGE_URL;

  const handleAuthorClick = () => {
    if (authUser != null) {
      navigate(`/users/${authorId}`);
    }
  };
  const handleImageFetchingError = ({
    currentTarget
  }: SyntheticEvent<HTMLImageElement, ErrorEvent>) => {
    currentTarget.onerror = null;
    currentTarget.src = DEFAULT_IMAGE_URL;
  };

  return (
    <Card sx={sxCard}>
      <CardActionArea>
        <Typography
          sx={sxData}
          gutterBottom
          variant="body1"
          component="div"
          noWrap
        >
          {getFormattedDate(createdAt)}
        </Typography>
        <Typography
          sx={sxAuthor}
          onClick={handleAuthorClick}
          gutterBottom
          variant="body1"
          component="div"
          noWrap
        >
          {author}
        </Typography>
        <CardMedia
          component="img"
          height="300"
          src={imageSrcUrl}
          alt="placeholder"
          onError={handleImageFetchingError}
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
