import { Card, CardContent, CardMedia, Typography, CardActionArea } from '@mui/material';
import { FC } from 'react';

import { IPost } from '../../types/post/post';
import TagContainer from '../TagContainer/TagContainer';

const PostCard: FC<IPost> = (props: IPost) => {
  return (
    <Card sx={{ maxWidth: 345, position: 'relative', margin: '10px auto'}}>
      <CardActionArea>
        <Typography sx={{position: 'absolute', left: '10%', top: 10, width: '40%'}} gutterBottom variant='body1' component='div'>
            Data: {String(props.createdAt).slice(0, 10)}
          </Typography>
        <Typography sx={{position: 'absolute', right: '10%', top: 10, width: '40%'}} gutterBottom variant='body1' component='div'>
            Author: {props.user.username}
          </Typography>
        <CardMedia
          component='img'
          height='300'
          image='https://placehold.co/600x400/EEE/31343C'
          alt='placeholder'
        />
        <CardContent>
          <Typography textAlign={'center'} gutterBottom variant='h3' component='div'>
            {props.title}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {props.content}
          </Typography>
        </CardContent>
      </CardActionArea>
      <TagContainer tags={props.tags} />
    </Card>
  );
}

export default PostCard;