import { Alert } from '@mui/material'
import React from 'react'

export default function MessageBox({props}) {
  return (
    <Alert severity={`${props.variant}`}>{props.children}</Alert>
  )
}


