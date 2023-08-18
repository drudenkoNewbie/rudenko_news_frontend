import { type FC } from 'react';

import { Grid } from '@mui/material';

import PostCard from '../PostCard';

import { sxPostContainer } from './sxStyles';

export const PostContainer: FC<PostContainerProps> = ({ posts }) => (
  <Grid container sx={sxPostContainer}>
    {posts.map((post) => <PostCard key={post.id} {...post} />)}
  </Grid>
);
