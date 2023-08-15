import { Grid } from "@mui/material"
import { v4 as uuidv4 } from 'uuid';

import PostCard from "../PostCard/PostCard"
import { IPost } from "../../types/post/post"

const PostContainer = (props: {posts: IPost[] | undefined}) => {
  return (

    <Grid container justifyContent={'center'} sx={{columnGap: 2, rowGap: 1, margin: '0 auto', width: '90%'}}>
            {props.posts.map((post) => {
        return <Grid key={uuidv4()} item xs='auto'><PostCard {...post} /></Grid>
      })}
    </Grid>
    
  )
}

export default PostContainer