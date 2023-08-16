import { Alert } from "@mui/material"
import { FC } from "react"

import { INotification } from "./Notification.props"
import { sxCentering } from "../sxStyles"

export const Notification: FC<INotification> = ({type, message}: INotification) => {
  return (
    <>
      <Alert sx={sxCentering} severity={type}>{ message }</Alert>
    </>
  )
}