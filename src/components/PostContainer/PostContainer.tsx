import { Grid } from "@mui/material"
import { v4 as uuidv4 } from 'uuid';
import { FC } from "react";

import PostCard from "../PostCard/PostCard"

import { IPosts } from "./PostContainer.props";

const PostContainer: FC<IPosts> = ({posts}: IPosts) => {
  return (
    <Grid container justifyContent={'center'} sx={{columnGap: 2, rowGap: 1, margin: '0 auto', width: '90%'}}>
      {posts.map((post) => {
        return <Grid key={uuidv4()} item xs='auto'><PostCard {...post} /></Grid>
      })}
    </Grid>
  )
}

export default PostContainer