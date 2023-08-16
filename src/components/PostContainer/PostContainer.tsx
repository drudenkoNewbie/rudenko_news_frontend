import { Grid } from "@mui/material"
import { FC } from "react";

import PostCard from "../PostCard/PostCard"

import { IPosts } from "./PostContainer.props";
import { sxPostContainer } from "./sxStyles";

const PostContainer: FC<IPosts> = ({posts}: IPosts) => {
  return (
    <Grid container sx={sxPostContainer}>
      {posts.map((post) => {
        return <Grid key={post.id} item xs='auto'><PostCard {...post} /></Grid>
      })}
    </Grid>
  )
}

export default PostContainer