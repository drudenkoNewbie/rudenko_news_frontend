import { useState, type FC, ChangeEvent } from 'react';
import { Grid, SelectChangeEvent } from '@mui/material';

import PostCard from '../PostCard';
import SearchBar from '../SearchBar/SearchBar';

import { sxPostContainer } from './sxStyles';
import { PostContainerProps, filterParams } from './types';

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

  const filterPosts = ({ currentFilter, currentSearch, posts }: filterParams) =>
    posts.filter((post) => {
      const author = isSelfDisplayed ? post.user.username : '';
      const title = post.title;
      const tags = [...post.tags.map(({ value }) => value)];

      if (currentFilter === 'title') return title.includes(currentSearch);

      if (currentFilter === 'authors')
        return author.includes(
          currentSearch
        );

      if (currentFilter === 'tags')
        return tags.some(name => name.includes(currentSearch));

      if (currentFilter === 'all')
        return (
          title.includes(currentSearch) ||
          author.includes(currentSearch) ||
          tags.some(name => name.includes(currentSearch))
        );
    });

  const filteredPosts = filterPosts({ currentFilter, currentSearch, posts });

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
