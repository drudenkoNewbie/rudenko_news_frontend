import { useState, type FC, ChangeEvent, useMemo } from 'react';
import { Grid, Pagination, SelectChangeEvent } from '@mui/material';

import PostCard from '../PostCard';
import SearchBar from '../SearchBar/SearchBar';
import usePagination from '../../hooks/usePagination';

import { sxPagination, sxPostContainer } from './sxStyles';
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
      const author = isSelfDisplayed ? post.user.username.toLowerCase() : '';
      const tags = [...post.tags.map(({ value }) => value.toLowerCase())];
      const title = post.title.toLowerCase();
      const content = post.title.toLowerCase();
      const loweredCurrentSearch = currentSearch.toLowerCase();

      if (currentFilter === 'title') return title.includes(loweredCurrentSearch);

      if (currentFilter === 'authors') return author.includes(loweredCurrentSearch);

      if (currentFilter === 'tags')
        return tags.some((name) => name.includes(loweredCurrentSearch));

      if (currentFilter === 'all')
        return (
          title.includes(loweredCurrentSearch) ||
          author.includes(loweredCurrentSearch) ||
          content.includes(loweredCurrentSearch) ||
          tags.some((name) => name.includes(loweredCurrentSearch))
        );
    });

  const filteredPosts = useMemo(
    () => filterPosts({ currentFilter, currentSearch, posts }),
    [currentFilter, currentSearch]
  );
  const pagination = usePagination({
    postsArray: filteredPosts,
    itemsPerPage: 12
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
      <Pagination
        sx={sxPagination}
        count={pagination.numberOfPages}
        onChange={pagination.changePage}
      />
      {pagination.slicedArray.map((post) => (
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
