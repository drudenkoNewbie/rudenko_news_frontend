import { Grid, Chip } from "@mui/material"
import { v4 as uuidv4 } from 'uuid';

type Props = {
  value: string,
}

const TagContainer = (props: {tags: Props[]}) => {
  return (
    <Grid container spacing={1} justifyContent={'center'} justifyItems={'center'} alignItems={'center'} sx={{margin: '0 auto 20px', padding: '0 0px', width: '100%'}}>
      {props.tags.map((item) => {
        return <Grid key={uuidv4()} item xs='auto'>
        <Chip label={item.value} variant='outlined' />
        </Grid>
      })}
    </Grid>
  )
}

export default TagContainer
