import { type FC } from 'react';

import { Grid } from '@mui/material';

import PostCard from '../PostCard';

import { IPosts } from './PostContainer.props';

import { sxPostContainer } from './sxStyles';

export const PostContainer: FC<IPosts> = ({ posts }) => (
  <Grid container sx={sxPostContainer}>
    {posts.map((post) => <PostCard key={post.id} {...post} />)}
  </Grid>
);
