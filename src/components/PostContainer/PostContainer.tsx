import { type FC } from 'react';

import { Grid } from '@mui/material';

import PostCard from '../PostCard';

import Posts from './types';

import { sxPostContainer } from './sxStyles';

export const PostContainer: FC<Posts> = ({ posts }) => (
  <Grid container sx={sxPostContainer}>
    {posts.map((post) => <PostCard key={post.id} {...post} />)}
  </Grid>
);
