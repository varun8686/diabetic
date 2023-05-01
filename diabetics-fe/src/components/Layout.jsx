import { Grid, LinearProgress } from '@mui/material'
import React,{useState} from 'react'
import Header from './Header'

export default function Layout(props) {
    const {Component} = props
    const [loading, setLoading] = useState(true);
    const [disableLoader, setDisableLoader] = useState(false);
  return (
    <Grid container spacing={2}>
  <Grid item xs={12}>
    <Header></Header>
  </Grid>
  <Grid item xs>
    <Component></Component>
  </Grid>
    </Grid>
  )
}
