import { FC } from 'react'

import { Grid, Chip } from '@mui/material'

import { ITags } from './TagContainer.props'

import { sxTagContainer } from './sxStyles'

const TagContainer: FC<ITags> = ({ tags }) => {
  return (
    <Grid container sx={sxTagContainer}>
      {tags.map((item) => {
        return <Grid key={item.id} item xs='auto'>
        <Chip label={item.value} variant='outlined' />
        </Grid>
      })}
    </Grid>
  )
}

export default TagContainer
