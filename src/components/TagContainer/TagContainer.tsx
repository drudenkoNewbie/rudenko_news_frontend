import { Grid, Chip } from "@mui/material"
import { v4 as uuidv4 } from 'uuid';
import { FC } from "react";

import { ITags } from "./TagContainer.props";

const TagContainer: FC<ITags> = ({tags}: ITags) => {
  return (
    <Grid container spacing={1} justifyContent={'center'} justifyItems={'center'} alignItems={'center'} sx={{margin: '0 auto 20px', padding: '0 0px', width: '100%'}}>
      {tags.map((item) => {
        return <Grid key={uuidv4()} item xs='auto'>
        <Chip label={item.value} variant='outlined' />
        </Grid>
      })}
    </Grid>
  )
}

export default TagContainer
