import { memo, type FC } from 'react';

import { Grid, Chip } from '@mui/material';

import { ITags } from './TagContainer.props';

import { sxTagContainer } from './sxStyles';

const TagContainer: FC<ITags> = ({ tags }) => {
  return (
    <Grid container sx={sxTagContainer}>
      {tags.map((item) => (
        <Chip key={item.id} label={item.value} variant="outlined" />
      ))}
    </Grid>
  );}

export default memo(TagContainer);
