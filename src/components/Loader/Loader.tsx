import { CircularProgress } from "@mui/material"
import { FC } from "react"

import { sxCentering } from "../sxStyles"

export const Loader: FC = () => {
  return <CircularProgress sx={ sxCentering } />
}