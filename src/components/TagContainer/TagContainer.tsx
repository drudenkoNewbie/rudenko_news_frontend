import { memo, type FC } from 'react';
import { Grid, Chip } from '@mui/material';

import { sxTagContainer } from './sxStyles';
import { TagContainerProps } from './types';

const TagContainer: FC<TagContainerProps> = ({ tags }) => {
  return (
    <Grid container sx={sxTagContainer}>
      {tags.map((item) => (
        <Chip key={item.id} label={item.value} variant="outlined" />
      ))}
    </Grid>
  );}

export default memo(TagContainer);
