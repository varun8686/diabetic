import React from 'react'
import { Box, Button, Card, CardContent, Grid, Paper, TextField, Typography, Hidden, Alert, Snackbar, LinearProgress } from '@mui/material'
import logo from '../assets/logo.png'
import instance from '../Utils/axiosInterceptors'
import backgroundImage from '../assets/bg12.png';
const styles = {
    left: {
       
        
       
    },
    right: {
        position: "relative"
    },
};
export default function Grid1() {
    return (
        <Grid
            item
            xs={false}
            sm={4}
            md={4}
        >
            <Paper style={styles.left} sx={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh',
                backgroundRepeat: 'no-repeat',
                backgroundColor: (t) =>
                    t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],

            }}>  <Box
                sx={{
                    my: 0,
                    mx: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: "center",
                    height: "100%",
                    margin:"0 auto"

                }}
            >
                    <img src={logo} alt="logo" height="100px" object="contain" />
                </Box></Paper>

        </Grid>
    )
}
