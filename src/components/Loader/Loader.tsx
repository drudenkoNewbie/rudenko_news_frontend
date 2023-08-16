import { FC } from "react"

import { CircularProgress } from "@mui/material"

import { sxCentering } from "../sxStyles"

export const Loader: FC = () => {
  return <CircularProgress sx={ sxCentering } />
}