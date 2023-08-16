import { Alert } from "@mui/material"
import { FC } from "react"

import { INotification } from "./Notification.props"

export const Notification: FC<INotification> = ({type, message}: INotification) => {
  return (
    <>
      <Alert sx={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '500px'}} severity={type}>{ message }</Alert>
    </>
  )
}