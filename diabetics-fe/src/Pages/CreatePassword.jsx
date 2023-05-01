import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Alert, Hidden, InputAdornment, Snackbar, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Visibility } from '@mui/icons-material';
import { VisibilityOff } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import instance from '../Utils/axiosInterceptors';
import { LinearProgress } from '@mui/material';
import Paper from '@mui/material/Paper';
import { useNavigate,} from "react-router-dom"
import Grid1 from '../components/Grid1';

export default function CreatePassword(props) {
    const navigate = useNavigate();
    const fromChangePassword = props.fromChangePassword;
    const [passwordStrength, setPasswordStrength] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const [sucessMessage, setSucessMessage] = useState("");
    const validatePassword = (password) => {
        const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/g;
        if (!passwordRegex.test(password)) {
            return setPasswordStrength("Weak");
        } else if (password.length < 8) {
            return setPasswordStrength("Weak");
        } else if (password.length <= 10) {
            return setPasswordStrength("Average");
        } else {
            return setPasswordStrength("Strong");;
        }
    };
    const userId = JSON.parse(localStorage.getItem("id"))
    const validationSchemas = yup.object({
        password: yup.string()
            .required("This field is required")
            .min(8, "Must be 8 characters or more")
            .matches(/[a-z]+/, "One lowercase character")
            .matches(/[A-Z]+/, "One uppercase character")
            .matches(/[@$!%*#?&]+/, "One special character")
            .matches(/\d+/, "One number"),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('password'), null], 'Password & Confirm Password should be same')
            .required("This field is required")
    });

    const [toggle_password, setToggle_password] = useState(false);

    const togglePasswordHide = () => {
        setToggle_password(!toggle_password);
    };
    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: ""
        },
        validationSchema: validationSchemas,
        onSubmit: async (values) => {
            setShowLoader(true);
            let data = {};
            data.password = values.password;
            await instance({
                method: "PUT",
                url: `users/${userId}`,
                data,
                validateStatus: () => true
            }).then((resp) => {
                if (resp.status === 200) {
                    setShowLoader(false);
                    if (fromChangePassword) {
                        setSucessMessage("updated Sucessfully");
                        setShowAlert(true);
                        navigate('/changePassword');
                    }
                    else {
                        navigate('/questions');
                    }
                }
                else {
                    setShowLoader(false);
                }
            });
        },
    });

    return (
        <>
            <Grid container component="main" sx={{ height: '100vh' }} style={{ pointerEvents: showLoader ? "none" : "auto" }}>
                {!fromChangePassword &&
                    <Hidden smDown>
                        <Grid1></Grid1>
                    </Hidden>}
                <Grid item xs={12} sm={!fromChangePassword ? 8 : 12} md={!fromChangePassword ? 8 : 12} elevation={6} component={Paper} square>
                    {showLoader && <LinearProgress />}
                    <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={showAlert} autoHideDuration={3000} onClose={() => setShowAlert(false)}>
                        <Alert onClose={() => setShowAlert(false)} severity="success" sx={{ width: '100%' }}>
                            {sucessMessage}
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
                        {!fromChangePassword &&
                            <Typography component="h1" variant="h5">
                                Create new password
                            </Typography>}

                        <Typography component="div" variant="div" sx={{
                            fontWeight: '400', color: "grey", fontSize: "12px", paddingTop: "16px"
                        }}>
                            Password must contain at least 8 characters, including uppercase and lowercase letters, a number, and a symbol.
                        </Typography>

                        <Box sx={{ mt: 1, maxWidth: "430px" }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', float: "right", alignSelf: "self-end", paddingTop: "16px" }}>
                                <Box sx={{ mr: 1 }}>
                                    <Typography variant="body2" color="text.secondary">
                                        {passwordStrength}
                                    </Typography>
                                </Box>
                                <Box sx={{ width: '100px', color: passwordStrength === "Weak" ? "red" : passwordStrength === "Average" ? "orange" : passwordStrength === "Strong" ? "green" : "grey" }}>
                                    <LinearProgress variant="determinate" color='inherit'
                                        value={passwordStrength === "Weak" ? 30 : passwordStrength === "Average" ? 70 : passwordStrength === "Strong" ? 100 : 0} />
                                </Box>
                            </Box>
                            <form onSubmit={formik.handleSubmit}>
                                <TextField
                                    fullWidth
                                    id="password"
                                    name="password"
                                    label="Enter New Password"
                                    type={toggle_password ? "text" : "password"}
                                    margin="normal"
                                    size='small'
                                    value={formik.values.password}
                                    onChange={(e) => {
                                        formik.setFieldValue("password", e.target.value);
                                        validatePassword(e.target.value)
                                    }}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.password}
                                    InputLabelProps={{ style: { fontSize: 14 }, }}
                                    inputProps={{
                                        style: {
                                            height: "34px",
                                            fontSize: "14px"
                                        },
                                    }}
                                    autoFocus
                                    InputProps={
                                        {
                                            endAdornment: (
                                                <InputAdornment position="end"> {
                                                    toggle_password ? (
                                                        <Visibility className="cursor_pointer"
                                                            onClick={
                                                                togglePasswordHide
                                                            }
                                                        />
                                                    ) : (
                                                        <VisibilityOff onClick={togglePasswordHide
                                                        }
                                                        />
                                                    )
                                                }
                                                </InputAdornment>
                                            ),
                                        }
                                    }
                                />
                                <TextField
                                    fullWidth
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    label="Enter Confirm Password"
                                    type="password"
                                    margin="normal"
                                    size='small'
                                    value={formik.values.confirmPassword}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                                    InputLabelProps={{ style: { fontSize: 14 }, }}
                                    inputProps={{
                                        style: {
                                            height: "34px",
                                            fontSize: "14px"
                                        },
                                    }}
                                />
                                <Button fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    className='button' type="submit">
                                    Next
                                </Button>
                            </form>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}