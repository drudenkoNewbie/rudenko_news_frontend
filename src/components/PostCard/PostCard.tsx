import { Card, CardContent, CardMedia, Typography, CardActionArea } from '@mui/material';

import { IPost } from '../../types/post/post';
import TagContainer from '../TagContainer/TagContainer';

const tagsArray = (counter: number) => {
  let arr = [];
  for (let index = 0; index < counter; index++) {
    const element = {value: String(Date.now() / 199) };
    arr.push(element)
  }
  return arr
}

const PostCard = (props: IPost) => {
  return (
    <Card sx={{ maxWidth: 345, position: 'relative', margin: '10px auto'}}>
      <CardActionArea>
        <Typography sx={{position: 'absolute', left: '10%', top: 10}} gutterBottom variant='body1' component='div'>
            {props.createdAt}
          </Typography>
        <Typography sx={{position: 'absolute', right: '10%', top: 10}} gutterBottom variant='body1' component='div'>
            {props.authorId}
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
      <TagContainer tags={tagsArray(Math.floor(Math.random() * 5 + 1))} />
    </Card>
  );
}

export default PostCard;