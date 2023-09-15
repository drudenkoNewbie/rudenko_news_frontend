import { useState, type FC, ChangeEvent, useMemo } from 'react';
import { Grid, Pagination, SelectChangeEvent } from '@mui/material';

import PostCard from '../PostCard';
import SearchBar from '../SearchBar/SearchBar';
import usePagination from '../../hooks/usePagination';
import { filterPosts } from '../../utils/filterPosts';

import { sxPagination, sxPostContainer } from './sxStyles';
import { PostContainerProps } from './types';

const ITEMS_PER_PAGE = 6;

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

  const filteredPosts = useMemo(() => filterPosts({
    currentFilter,
    currentSearch,
    posts,
    isSelfDisplayed
  }), [currentFilter, currentSearch, posts, isSelfDisplayed]);

  const pagination = usePagination({
    postsArray: filteredPosts,
    itemsPerPage: ITEMS_PER_PAGE
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
