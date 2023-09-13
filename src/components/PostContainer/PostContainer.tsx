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

  const filterPosts = () => posts.filter((post) => {
    const filterOptions: {[key: string]: string[]} = {
      all: [
        post.title,
        post.content,
        isSelfDisplayed ? post.user.username : '',
        ...post.tags.map(({ value }) => value)
      ],
      title: [post.title],
      tags: [...post.tags.map(({ value }) => value)],
      authors: [isSelfDisplayed ? post.user.username : '']
    }
  
    return filterOptions[currentFilter].some((value) => value.includes(currentSearch));
  });

  const filteredPosts = filterPosts();

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
