import React, { useState } from 'react'
import { Formik, } from 'formik';
import * as yup from 'yup';
import { useNavigate } from "react-router-dom"
import image from '../assets/logo.png'
import instance from '../Utils/axiosInterceptors';
import { Alert, LinearProgress, Snackbar, Grid, Paper, TextField, Button, Link, Box, Typography, Hidden } from '@mui/material';
import Grid1 from '../components/Grid1';
export default function Login() {
  const [checkPassword, setCheckPassword] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  const validationSchema = yup.object({
    email: yup
      .string('Enter your email')
      .required('This field is required'),
    password: checkPassword ? yup.string().required('This field is required') : yup.string()
    ,
  });
  const login = async (password, id) => {
    setShowLoader(true);
    let data = {};
    data.id = id;
    data.password = password;
    await instance({
      method: "POST",
      url: "users/login",
      data,
    }).then((resp) => {
      if (resp.status === 200) {
        setShowLoader(false);
        localStorage.setItem("id",JSON.stringify(resp.data._id));
        sessionStorage.setItem("userName",JSON.stringify(resp.data.userName));
        if(!resp.data.questionsStatus){
           navigate('/questions');
        }
        else if(!resp.data.imageStatus){
          navigate('/images');
        }
        else {
          navigate('/questions',{state:{fromLogin:true}});
        }
      }
      else {
        setShowLoader(false);
        setShowAlert(true);
        setErrorMessage("Invalid username or password. Please try again.");
      }
    })
  }
  const createAccount = async (values) => {
    if (checkPassword === false) {
      let data = {};
      const email = values.email.indexOf("@");
      if (email) {
        data.email = values.email;
      }
      data.userName = values.email;
      setShowLoader(true)
      await instance({
        method: "POST",
        url: "users/verify",
        data
      }).then((resp => {
        setShowLoader(false)
        if (resp.response && resp.response.data.code && resp.response.data.code === 2) {
          navigate('/createpassword', { state: { id: resp.response.data.id}});
        }
        else if (resp.response && resp.response.data.code && resp.response.data.code === 1) {
          setErrorMessage("Sorry, we could not find a user with this login ID. Please check your login credentials and try again.")
          setShowAlert(true);
        }
        else if (resp.status === 200) {
          setCheckPassword(true);
          setUserId(resp.data._id);
        }
      }))
    } else {
      login(values.password, userId);
    }
  }

  return (
    <>
      <Grid container component="main" sx={{ height: '100vh', overflowX: "hidden" }}>
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
              maxWidth: "430px",
              margin: "32px auto",
              padding: "0px 32px"
            }}
          >
            <Hidden mdUp>
            <img src={image} alt="logo" height="50px" object="contain" />
            </Hidden>
            <Typography component="h1" variant="h5" sx={{ padding: "16px 0px" }}>
              Sign In
            </Typography>
            <Typography component="div" variant="div" sx={{
              fontWeight: '400', color: "rgba(0, 0, 0, 0.87)", fontSize: "14px"
            }}>
              Please sign in to your account.
            </Typography>
            <Box sx={{ mt: 1, width: "100%", }}>
              <Formik initialValues={{
                email: '',
                password: '',
                valiTrue: false
              }} onSubmit={createAccount} validationSchema={validationSchema}>
                {formik => (
                  <form onSubmit={formik.handleSubmit}>
                    <TextField
                      fullWidth
                      id="email"
                      name="email"
                      label="Enter Email or UserName"
                      margin="normal"
                      size='small'
                      value={formik.values.email}
                      autoFocus
                      onChange={(e) => {
                        formik.setFieldValue("email", e.target.value);
                        setCheckPassword(false)
                      }}
                      error={formik.touched.email && Boolean(formik.errors.email)}
                      helperText={formik.touched.email && formik.errors.email}
                      InputLabelProps={{ style: { fontSize: 14 }, shrink: true }}
                      inputProps={{
                        style: {
                          height: "34px",
                          fontSize: "14px",
                        },
                      }}
                    />
                    {checkPassword &&
                      <TextField
                        fullWidth
                        id="password"
                        name="password"
                        label="Enter Password"
                        type="password"
                        margin="normal"
                        size='small'
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        InputLabelProps={{ style: { fontSize: 14 } }}
                        inputProps={{
                          style: {
                            height: "34px",
                            fontSize: "14px"
                          },
                        }}
                      />}

                    <Button fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      className='button' type="submit">
                      Next
                    </Button>
                  </form>
                )}
              </Formik>



            </Box>
            <div style={{ fontSize: "12px", padding: "8px 0px" }}>
              Don't have an account?{" "}
              <Link href="/signup" variant="body2" sx={{ color: "#3689AA", textDecoration: "none", fontSize: "12px" }}>
                {"Sign Up"}
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
