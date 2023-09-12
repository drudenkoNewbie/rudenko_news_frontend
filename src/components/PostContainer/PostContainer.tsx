import { useState, type FC, ChangeEvent } from 'react';
import { Grid, SelectChangeEvent } from '@mui/material';

import PostCard from '../PostCard';
import SearchBar from '../SearchBar/SearchBar';

import { sxPostContainer } from './sxStyles';
import { PostContainerProps } from './types';

export const PostContainer: FC<PostContainerProps> = ({
  posts,
  isSelfDisplayed
}) => {
  const [currentFilter, setCurrentFilter] = useState('all');
  const [currentSearch, setCurrentSearch] = useState('');

  const handleChangeFilter = (event: SelectChangeEvent<unknown>) => {
    setCurrentFilter(String(event.target.value));
  };

  const handleChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentSearch(event.target.value);
  };

  const filteredPosts = posts.filter((post) => {
    switch (currentFilter) {
      case 'all':
        return [
          post.title,
          post.content,
          isSelfDisplayed ? post.user.username : '',
          ...post.tags.map(({ value }) => value)
        ].some((value) => value.includes(currentSearch));
      case 'title':
        return [post.title].some((value) => value.includes(currentSearch));
      case 'tags':
        return [...post.tags.map(({ value }) => value)].some((value) =>
          value.includes(currentSearch)
        );
      case 'authors':
        return [isSelfDisplayed ? post.user.username : ''].some((value) =>
          value.includes(currentSearch)
        );
      default:
        return true;
    }
  });

  return (
    <Grid container sx={sxPostContainer}>
      <SearchBar
        currentFilter={currentFilter}
        changeFilter={handleChangeFilter}
        currentSearch={currentSearch}
        changeSearch={handleChangeSearch}
        isAuthorFilterEnabled={isSelfDisplayed}
      />
      {filteredPosts.map((post) => (
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
