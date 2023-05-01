import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { PatternFormat } from 'react-number-format';
import instance from '../Utils/axiosInterceptors';
import CreatePassword from './CreatePassword';
import { Alert, LinearProgress, Snackbar, Button, TextField, Link, Paper, Box, Grid, Typography, Hidden } from '@mui/material';
import { useNavigate } from "react-router-dom";
import logo from '../assets/logo.png'
import Grid1 from '../components/Grid1';
export default function SignUp() {
  const [passwordBlock, setPasswordBlock] = useState(false);
  const [createUserData, setCreateUserData] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const validationSchema = yup.object({
    email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
    fullname: yup
      .string()
      .required('FullName is required'),
    phoneNumber: yup
      .number()
      .required("Phone Number is required")
      .min(10, "Phone Number must be 10 digits."),
    userName: yup
      .string()
      .required('UserName is required'),
    dateOfBirth: yup.date()
      .required('Date is required')
      .test('is-current-year', 'DOB cannot be greater than current date', function (value) {
        const currentDate = new Date();
        return value <= currentDate;
      }),
  });
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      email: '',
      fullname: "",
      phoneNumber: "",
      dateOfBirth: "",
      userName: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setShowLoader(true);
      let data = {};;
      data.fullName = values.fullname;
      data.email = values.email;
      data.mobile = values.phoneNumber;
      data.dateOfBirth = values.dateOfBirth;
      data.userName = values.userName;
      await instance({
        method: "POST",
        url: "users",
        data,
        validateStatus: () => true
      }).then((resp) => {
        if (resp.status === 201) {
          setShowLoader(false);
          navigate('/createpassword', { state: { id: resp.data._id } });
          localStorage.setItem("id", JSON.stringify(resp.data._id));
          sessionStorage.setItem("userName",JSON.stringify(resp.data.userName));
        }
        else {
          setShowLoader(false);
          setErrorMessage(resp.data.error);
          setShowAlert(true);
        }
      });

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

          <Snackbar anchorOrigin={{ vertical: "bottom", horizontal: "right" }} open={showAlert} autoHideDuration={3000} onClose={() => setShowAlert(false)}>
            <Alert onClose={() => setShowAlert(false)} severity="error" sx={{ width: '100%' }}>
              {errorMessage}
            </Alert>
          </Snackbar>
          <Box
            sx={{
              my: 4,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Hidden mdUp>
              <img src={logo} alt="logo" height="50px" object="contain" />
            </Hidden>
            <Typography component="h1" variant="h5" sx={{ paddingTop: "16px" }}>
              Create an account
            </Typography>
            <Box sx={{ mt: 1, maxWidth: "430px" }}>
              {passwordBlock ?
                <CreatePassword userData={createUserData} />
                :
                <div>
                  <form onSubmit={formik.handleSubmit}>
                    <div>
                      <TextField
                        fullWidth
                        id="fullname"
                        name="fullname"
                        label="Enter FullName"
                        margin="normal"
                        size='small'
                        value={formik.values.fullname}
                        onChange={formik.handleChange}
                        error={formik.touched.fullname && Boolean(formik.errors.fullname)}
                        helperText={formik.touched.fullname && formik.errors.fullname}
                        autoFocus
                        InputLabelProps={{ style: { fontSize: 14 } }}
                        inputProps={{
                          style: {
                            height: "34px",
                            fontSize: "14px",
                          },
                        }}
                      />
                      <PatternFormat
                        format="(###) ###-####" fullWidth
                        id="phonenumber"
                        name="phoneNumber"
                        label="Enter PhoneNumber"
                        margin="normal"
                        value={formik.values.phoneNumber ? (Number(formik.values.phoneNumber)) : formik.values.phoneNumber}
                        onValueChange={(values) => {
                          const { value } = values;
                          formik.setFieldValue('phoneNumber', value);
                        }}
                        error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                        helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                        InputLabelProps={{ style: { fontSize: 14 } }}
                        inputProps={{
                          style: {
                            height: "34px",
                            fontSize: "14px",
                          },
                        }}
                        size='small' customInput={TextField} variant='outlined' />
                      <TextField
                        fullWidth
                        id="email"
                        name="email"
                        label="Enter Email"
                        margin="normal"
                        size='small'
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
                      <TextField
                        id="dateOfBirth"
                        type="date"
                        fullWidth

                        name="dateOfBirth"
                        label="Enter Date of Birth"
                        margin="normal"
                        size='small'
                        value={formik.values.dateOfBirth}
                        onChange={formik.handleChange}
                        error={formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)}
                        helperText={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
                        InputLabelProps={{ style: { fontSize: 14 }, shrink: true }}
                        inputProps={{
                          style: {
                            height: "34px",
                            fontSize: "14px",
                          },
                        }}

                      />

                      <TextField
                        fullWidth
                        id="userName"
                        name="userName"
                        label="Enter userName"
                        margin="normal"
                        size='small'
                        value={formik.values.userName}
                        onChange={formik.handleChange}
                        error={formik.touched.userName && Boolean(formik.errors.userName)}
                        helperText={formik.touched.userName && formik.errors.userName}
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
                        Next
                      </Button>
                    </div>
                  </form>
                </div>
              }
            </Box>
            <div style={{ fontSize: "12px", padding: "8px 0px" }}>
              Have an account?{" "}
              <Link href="/" variant="body2" sx={{ color: "#3689AA", textDecoration: "none", fontSize: "12px" }}>
                {"Sign in now"}
              </Link>
            </div>
            <div>
              <Link href="/resetpassword" variant="body2" sx={{ color: "#3689AA", textDecoration: "none", fontSize: "12px" }}>
                Forgot password?
              </Link>
            </div>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}