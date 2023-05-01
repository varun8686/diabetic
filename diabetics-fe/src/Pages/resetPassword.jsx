import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { LinearProgress } from '@material-ui/core';
import { Snackbar, Button, TextField, Link, Paper, Box, Grid, Typography, Hidden, Alert, Modal } from '@mui/material';
import { useNavigate } from "react-router-dom";
import logo from '../assets/logo.png'
import Grid1 from '../components/Grid1';
import instance from '../Utils/axiosInterceptors';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};
export default function ResetPassword() {
  const [showLoader, setShowLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    navigate('/');
  }
  const validationSchema = yup.object({
    email: yup
      .string('Enter your email')
      .email("Invalid email")
      .required('Email is required'),
  });
  const navigate = useNavigate()
  const forgotPassword = async (email, id) => {
    setShowLoader(true);
    let data = {};
    data._id = id;
    data.email = email;
    await instance({
      method: "POST",
      url: "forgotpassword",
      data,
    }).then((resp) => {
      if (resp.status === 200) {
        setShowLoader(false);
        setOpen(true);
      }
      else {
        setShowLoader(false);
        setShowAlert(true);
      }
    });
  }

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      let data = {};
      data.email = values.email;
      setShowLoader(true);
      await instance({
        method: "POST",
        url: "users/verify",
        data
      }).then((resp => {
        setShowLoader(false);
        if (resp.response && resp.response.data.code && resp.response.data.code === 1) {
          setErrorMessage("Email id doesn't Exists please try again");
          setShowAlert(true);
        }
        else if (resp.status === 200) {
          forgotPassword(values.email, resp.data._id);
        }
      }));
    },
  });
  return (
    <>
      <Grid container component="main" sx={{ height: '100vh' }} style={{ pointerEvents: showLoader ? "none" : "auto" }}>
        <Hidden smDown mdDown>
          <Grid1></Grid1>
        </Hidden>
        <Grid item xs={12} sm={12} md={8} component={Paper} elevation={6} square>
          {showLoader && <LinearProgress />}
          <Box
            sx={{
              my: 4,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: "430px",
              margin: "32px auto",
              padding: "0px 32px"
            }}
          >
            <Hidden mdUp>
              <img src={logo} alt="logo" height="50px" object="contain" />
            </Hidden>
            <Typography component="h1" variant="h5" sx={{ paddingTop: "16px" }}>
              Forgot Password
            </Typography>
            <Box sx={{ mt: 1, width: "100%", }} >
              <Snackbar anchorOrigin={{ vertical: "bottom", horizontal: "right" }} open={showAlert} autoHideDuration={3000} onClose={() => setShowAlert(false)}>
                <Alert onClose={() => setShowAlert(false)} severity="error" sx={{ width: '100%' }}>
                  {errorMessage}
                </Alert>
              </Snackbar>
              <div  >
                <form onSubmit={formik.handleSubmit}>
                  <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Enter Email"
                    margin="normal"
                    size='small'
                    type="text"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    InputLabelProps={{ style: { fontSize: 14 } }}
                    inputProps={{
                      style: {
                        height: "34px",
                        fontSize: "14px",
                      },
                    }}
                  />

                  <Button fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    className='button' type="submit">
                    Reset
                  </Button>

                </form>
              </div>
            </Box>


            <div style={{ fontSize: "12px", padding: "8px 0px" }}>
              Have an account?{" "}
              <Link href="/" variant="body2" sx={{ color: "#3689AA", textDecoration: "none", fontSize: "12px" }}>
                {"Sign in now"}
              </Link>
            </div>
          </Box>
        </Grid>
      </Grid>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CheckCircleOutlineIcon style={{ width: "45px", height: "45px", color: "#3689AA" }} />
          <Typography>Success!</Typography>
          <Typography id="modal-modal-title" variant="div" component="div">
            Password reset request was sent Successfully. Please check your email to reset your password.
          </Typography>
          <Button fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            className='button' type="submit" onClick={handleClose}>
            Close
          </Button>
        </Box>
      </Modal>
    </>
  )
}