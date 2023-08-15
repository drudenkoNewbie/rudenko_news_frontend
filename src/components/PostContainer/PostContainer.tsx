import { Alert, Grid } from "@mui/material"
import { v4 as uuidv4 } from 'uuid';

import PostCard from "../PostCard/PostCard"
import { IPost } from "../../types/post/post"

const PostContainer = (props: {posts: IPost[]}) => {
  if(props.posts.length) {
    return (
      <Grid container justifyContent={'center'} sx={{columnGap: 2, rowGap: 1, margin: '0 auto', width: '90%'}}>
              {props.posts.map((post) => {
          return <Grid key={uuidv4()} item xs='auto'><PostCard {...post} /></Grid>
        })}
      </Grid>
    )
  } else {
    return (
      <Alert sx={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '500px'}} severity="info">No posts for you</Alert>
    )
  }
}

export default PostContainer