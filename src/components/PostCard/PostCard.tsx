import { memo, type FC } from 'react';

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea
} from '@mui/material';

import { IPost } from '../../types/post/post';
import TagContainer from '../TagContainer';

import {
  sxCard, 
  sxData, 
  sxAuthor, 
  sxTextAlignCenter 
} from './sxStyles';

const PostCard: FC<IPost> = ({ 
  createdAt, 
  user, 
  title, 
  content, 
  tags 
}) => (
  <Card sx={sxCard}>
    <CardActionArea>
      <Typography sx={sxData} gutterBottom variant="body1" component="div">
        Data: {String(createdAt).slice(0, 10)}
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