import { type FC } from 'react';
import { Grid } from '@mui/material';

import PostCard from '../PostCard';

import { sxPostContainer } from './sxStyles';
import { PostContainerProps } from './types';

export const PostContainer: FC<PostContainerProps> = ({
  posts,
  isSelfDisplayed
}) => {
  return (
    <Grid container sx={sxPostContainer}>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          createdAt={post.createdAt}
          title={post.title}
          content={post.content}
          tags={post.tags}
          authorId={post.authorId}
          author={isSelfDisplayed ? post.user.username : null}
        />
      ))}
    </Grid>
  );
};
