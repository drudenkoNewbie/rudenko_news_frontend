import { memo, type FC } from 'react';
import { Grid, Chip } from '@mui/material';

import { sxTag, sxTagContainer } from './sxStyles';
import { TagContainerProps } from './types';

const TagContainer: FC<TagContainerProps> = ({ tags }) => {
  return (
    <Grid container sx={sxTagContainer}>
      {tags.map((item) => (
        <Chip sx={sxTag} key={item.id} label={item.value} variant="outlined" />
      ))}
    </Grid>
  );
};

export default memo(TagContainer);
