import { memo, type FC } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea
} from '@mui/material';

import { getFormattedDate } from '../../utils/getFormattedDate';
import TagContainer from '../TagContainer';
import { Post } from '../../types';

import {
  sxCard,
  sxData,
  sxAuthor,
  sxTextAlignCenter
} from './sxStyles';

const PostCard: FC<Post> = ({
  createdAt,
  user,
  title,
  content,
  tags
}) => (
  <Card sx={sxCard}>
    <CardActionArea>
      <Typography sx={sxData} gutterBottom variant="body1" component="div">
        Data: {getFormattedDate(createdAt)}
      </Typography>
      <Typography sx={sxAuthor} gutterBottom variant="body1" component="div">
        Author: {user.username}
      </Typography>
      <CardMedia
        component="img"
        height="300"
        image="https://placehold.co/600x400/EEE/31343C"
        alt="placeholder"
      />
      <CardContent>
        <Typography sx={sxTextAlignCenter} gutterBottom variant="h3" component="div">
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

export default memo(PostCard);
