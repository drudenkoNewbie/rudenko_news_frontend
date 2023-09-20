import { ChangeEvent, FC } from 'react';
import { MenuItem, SelectChangeEvent, TextField } from '@mui/material';

import { POSTS_FILTER_OPTIONS } from '../../constants';
import {
  POSTS_FILTER_SELECTOR_HELPER,
  FILTER_LABEL,
  SEARCH_LABEL
} from '../../locales/en.json';

import { sxFilterSelector, sxSearchBar } from './sxStyles';

interface SearchBarProps {
  currentFilter: string;
  changeFilter: (event: SelectChangeEvent<unknown>) => void;
  currentSearch: string;
  changeSearch: (event: ChangeEvent<HTMLInputElement>) => void;
  isAuthorFilterEnabled: boolean;
}

const SearchBar: FC<SearchBarProps> = ({
  currentFilter,
  changeFilter,
  currentSearch,
  changeSearch,
  isAuthorFilterEnabled
}) => {
  const filters = [
    POSTS_FILTER_OPTIONS.all,
    POSTS_FILTER_OPTIONS.title,
    POSTS_FILTER_OPTIONS.tags,
    ...(isAuthorFilterEnabled ? [POSTS_FILTER_OPTIONS.author] : [])
  ];

  return (
    <>
      <TextField
        sx={sxFilterSelector}
        select
        SelectProps={{
          value: currentFilter,
          defaultValue: POSTS_FILTER_OPTIONS.all,
          onChange: changeFilter
        }}
        label={FILTER_LABEL}
        helperText={POSTS_FILTER_SELECTOR_HELPER}
      >
        {filters.map((filter) => (
          <MenuItem key={filter} value={filter}>
            {filter}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label={SEARCH_LABEL}
        sx={sxSearchBar}
        defaultValue={currentSearch}
        onChange={changeSearch}
      />
    </>
  );
};

export default SearchBar;
