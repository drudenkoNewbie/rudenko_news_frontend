import { ChangeEvent, FC } from 'react';
import { MenuItem, SelectChangeEvent, TextField } from '@mui/material';

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
    'all',
    'title',
    'tags',
    ...(isAuthorFilterEnabled ? ['authors'] : [])
  ];

  return (
    <>
      <TextField
        sx={{ maxWidth: '15%' }}
        select
        SelectProps={{
          value: currentFilter,
          defaultValue: 'all',
          onChange: changeFilter
        }}
        label="Filter"
        helperText="Please select filter"
      >
        {filters.map((filter) => (
          <MenuItem key={filter} value={filter}>
            {filter}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Search"
        sx={{ width: '80%' }}
        defaultValue={currentSearch}
        onChange={changeSearch}
      />
    </>
  );
};

export default SearchBar;
