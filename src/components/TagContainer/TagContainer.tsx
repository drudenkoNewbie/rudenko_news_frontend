import { memo, type FC } from 'react';

import { Grid, Chip } from '@mui/material';

import Tags from './types';

import { sxTagContainer } from './sxStyles';

const TagContainer: FC<Tags> = ({ tags }) => {
  return (
    <Grid container sx={sxTagContainer}>
      {tags.map((item) => (
        <Chip key={item.id} label={item.value} variant="outlined" />
      ))}
    </Grid>
  );}

export default memo(TagContainer);
