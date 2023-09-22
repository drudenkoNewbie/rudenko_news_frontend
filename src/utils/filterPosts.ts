import { FilterParams } from '../types';

export const filterPosts = ({
  currentFilter,
  currentSearch,
  posts,
  isSelfDisplayed
}: FilterParams) =>
  posts.filter((post) => {
    const author = isSelfDisplayed ? post.user.username.toLowerCase() : '';
    const tags = [...post.tags.map(({ value }) => value.toLowerCase())];
    const title = post.title.toLowerCase();
    const content = post.content.toLowerCase();
    const loweredCurrentSearch = currentSearch.toLowerCase();

    if (currentFilter === 'title') return title.includes(loweredCurrentSearch);

    if (currentFilter === 'authors')
      return author.includes(loweredCurrentSearch);

    if (currentFilter === 'tags')
      return tags.some((name) => name.includes(loweredCurrentSearch));

    if (currentFilter === 'all')
      return (
        title.includes(loweredCurrentSearch)
        || author.includes(loweredCurrentSearch)
        || content.includes(loweredCurrentSearch)
        || tags.some((name) => name.includes(loweredCurrentSearch))
      );
  });
