
import { Box, Button, Grid, Paper, TextField, Typography, Hidden, Alert, Snackbar, LinearProgress, Select, MenuItem, InputLabel, OutlinedInput, FormControl } from '@mui/material'
import React, { useEffect, useState } from 'react'
import instance from '../Utils/axiosInterceptors'
import Grid1 from '../components/Grid1';
import logo from '../assets/logo.png';
import { useLocation, useNavigate, } from "react-router-dom";

export default function TwoWayAuthQuestions(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const fromLogin = (location.state && location.state.fromLogin) || "";
    const fromChangePassword = props.fromChangePassword;
    const [errorMessage, setErrorMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const [sucessMessage, setSucessMessage] = useState("");
    const [securtityQuestions, setSecurtityQuestions] = useState([]);
    const userId = JSON.parse(localStorage.getItem("id"));
    const [securityQn1, setSecurityQn1] = useState("");
    const [securityQn2, setSecurityQn2] = useState("");
    const [securityQn3, setSecurityQn3] = useState("");
    const [securityAns1, setSecurityAns1] = useState("");
    const [securityAns2, setSecurityAns2] = useState("");
    const [securityAns3, setSecurityAns3] = useState("");
    const [customQn, setCustomQn] = useState("");
    const [password_answers, setPassword_answers] = useState([]);


    const filteredOptions1 = securtityQuestions.filter(option => option !== securityQn2 && option !== securityQn3);
    const filteredOptions2 = securtityQuestions.filter(option => option !== securityQn1 && option !== securityQn3);

    const filteredOptions3 = securtityQuestions.filter(option => option !== securityQn1 && option !== securityQn2);

    const submit = async () => {
        if (securityAns1 === "" || securityAns2 === "" || securityAns3 === "") {
            setErrorMessage("Please answer each of the three questions.");
        }
        else {
            if (fromLogin) {
                if ((securityAns1 === password_answers[0]) && securityAns2 === password_answers[1] && securityAns3 === password_answers[2]) {
                    navigate('/images', { state: { fromImages: true } });
                }
                else {
                    setErrorMessage("Incorrect Anwers");
                }
            } else {
                let data = {};
                let customQuestion = securityQn1 === "customQuestion" ? customQn :securityQn1
                let answerdQuestions = [customQuestion, securityQn2, securityQn3];
                let password_answers = [securityAns1, securityAns2, securityAns3];
                if (answerdQuestions.length > 0) {
                    data.password_questions = answerdQuestions;
                    data.password_answers = password_answers;
                    data.userId = userId;
                    setErrorMessage("");
                    setShowLoader(true);
                    if (fromChangePassword) {
                        await instance({
                            method: "PUT",
                            url: `passwords/${userId}`,
                            data
                        }).then((resp) => {
                            if (resp.status === 200) {
                                setShowLoader(false);
                                setShowAlert(true);
                                setSucessMessage("Updated SucessFully");
                            }
                            else {
                                setShowLoader(false);
                            }
                        })
                    }
                    else {
                        await instance({
                            method: "POST",
                            url: 'passwords',
                            data
                        }).then((resp) => {
                            setShowLoader(false);
                            navigate('/images');
                        })
                    }
                }
            }
        }
    }
    const getPasswordQuestions = async () => {
        await instance({
            method: "GET",
            url: `passwords/${userId}`,
        }).then((resp) => {
            if (resp.status === 200) {
                setPassword_answers(resp.data.password_answers);
                setSecurtityQuestions(resp.data.password_questions);
            }
        });
    }

    useEffect(() => {
        const fetch = async () => {
            await instance({
                method: "GET",
                url: 'questions',
            }).then((resp) => {
                if (resp.status === 200) {
                    setSecurtityQuestions(resp.data.questions_list);
                }
            })
        }
        if (fromLogin) {
            getPasswordQuestions();
        }
        else {
            fetch()
            getPasswordQuestions();
        }
    }, []);

    return (
        <>
            <Grid container component="main" sx={{ height: '100vh' }} style={{ pointerEvents: showLoader ? "none" : "auto" }}>
                {!fromChangePassword &&
                    <Hidden smDown mdDown>
                        <Grid1></Grid1>
                    </Hidden>}
                <Grid item xs={12} sm={12} md={!fromChangePassword ? 8 : 12} component={Paper} elevation={6} square>

                    {showLoader && <LinearProgress />}
                    <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={showAlert} autoHideDuration={3000} onClose={() => setShowAlert(false)}>
                        <Alert onClose={() => setShowAlert(false)} severity="success" sx={{ width: '100%' }}>
                            {sucessMessage}
                        </Alert>
                    </Snackbar>
                    <Box
                        sx={{
                            my: 0,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            py: 2
                        }}
                    >
                        {!fromChangePassword &&
                            <Hidden mdUp>
                                <img src={logo} alt="logo" height="50px" object="contain" />
                            </Hidden>}
                        <Typography component="div" variant="div" sx={{
                            alignSelf: "flex-start",
                            fontWeight: '400', color: "rgba(0, 0, 0, 0.87)", padding: "10px 0px"
                        }}>
                            For your own protection, please answer any three of the following questions to verify your identity and access your account.
                        </Typography>

                        <Typography component="div" variant="div" sx={{
                            alignSelf: "flex-start",
                            fontWeight: '300', color: "rgba(0, 0, 0, 0.87)", fontSize: "13px", paddingBottom: "10px"
                        }}>
                            <span style={{ fontWeight: '400', color: "#3689AA", fontSize: "14px" }}>Note<span style={{ color: "red" }}>*</span>:{" "}</span>
                            Don't forget your security questions and answers! They will be needed to access your account

                        </Typography>
                        <Box sx={{ mt: 1, minWidth: 120, width: "90%" }}>
                            <Box sx={{ mt: 1, mb: 2, minWidth: 120 }}>
                                <FormControl fullWidth>
                                    <InputLabel style={{ fontSize: "14px" }} id="demo-simple-select-label">Choose Securty Question1</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Choose Securty Question1"
                                        value={securityQn1}
                                        onChange={(e) => setSecurityQn1(e.target.value)}
                                        fullWidth
                                    >
                                        {fromLogin &&
                                            <MenuItem value={securtityQuestions[0]}>{securtityQuestions[0]}</MenuItem>
                                        }

                                        {!fromLogin && filteredOptions1.map((value, index) => (

                                            <MenuItem key={index} value={value}>{value}</MenuItem>

                                        ))}
                                        {!fromLogin &&
                                            <MenuItem value="customQuestion">Custom Question</MenuItem>}
                                    </Select>
                                </FormControl>
                                {securityQn1 === "customQuestion" &&
                                    <TextField style={{ fontWeight: "300" }}
                                        inputProps={{
                                            style: {
                                                height: "34px",
                                                fontSize: "14px",
                                                fontWeight: "300"
                                            },
                                        }}
                                        placeholder='write your question'
                                        value={customQn}
                                        onChange={(e) => setCustomQn(e.target.value)}
                                        fullWidth variant='outlined'></TextField>}
                                {securityQn1 &&
                                    <TextField style={{ fontWeight: "300" }}
                                        inputProps={{
                                            style: {
                                                height: "34px",
                                                fontSize: "14px",
                                                fontWeight: "300"
                                            },
                                        }}
                                        placeholder='Answer'
                                        value={securityAns1}
                                        onChange={(e) => setSecurityAns1(e.target.value)}
                                        fullWidth variant='outlined'></TextField>
                                }
                            </Box>
                            <Box sx={{ mt: 1, mb: 2 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label" style={{ fontSize: "14px" }}>Choose Securty Question2</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={securityQn2}
                                        label="Choose Securty Question2"
                                        onChange={(e) => setSecurityQn2(e.target.value)}
                                        fullWidth
                                    >
                                        {fromLogin &&
                                            <MenuItem value={securtityQuestions[1]}>{securtityQuestions[1]}</MenuItem>
                                        }
                                        {!fromLogin && filteredOptions2.map((value, index) => (


                                            <MenuItem key={index} value={value}>{value}</MenuItem>

                                        ))}

                                    </Select>
                                </FormControl>
                                {securityQn2 &&
                                    <TextField multiline style={{ fontWeight: "300" }}
                                        inputProps={{
                                            style: {
                                                height: "34px",
                                                fontSize: "14px",
                                                fontWeight: "300"
                                            },
                                        }}
                                        placeholder='Answer'
                                        value={securityAns2.trim()}
                                        onChange={(e) => setSecurityAns2(e.target.value)}
                                        fullWidth variant='outlined'></TextField>
                                }
                            </Box>
                            <Box sx={{ mt: 1, mb: 2 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label" style={{ fontSize: "14px" }}>Choose Securty Question3</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Choose Securty Question3"
                                        value={securityQn3}
                                        onChange={(e) => setSecurityQn3(e.target.value)}
                                        fullWidth
                                    >
                                        {fromLogin &&
                                            <MenuItem value={securtityQuestions[2]}>{securtityQuestions[2]}</MenuItem>
                                        }
                                        {!fromLogin && filteredOptions3.map((value, index) => (
                                            <MenuItem key={index} value={value}>{value}</MenuItem>
                                        ))}

                                    </Select>
                                </FormControl>
                                {securityQn3 &&
                                    <TextField multiline style={{ fontWeight: "300" }}
                                        inputProps={{
                                            style: {
                                                height: "34px",
                                                fontSize: "14px",
                                                fontWeight: "300"
                                            },
                                        }}
                                        placeholder='Answer'
                                        value={securityAns3.trim()}
                                        onChange={(e) => setSecurityAns3(e.target.value)}
                                        fullWidth variant='outlined'></TextField>
                                }
                            </Box>

                            {/* {securtityQuestions.map((value, index) => (
                                    <Card key={index}>
                                        <CardContent>
                                            <div style={{ fontWeight: "400", fontSize: "14px" }}>{index + 1}{"."}{" "}{value}</div>
                                            <div>
                                                <TextField multiline style={{ fontWeight: "300" }}
                                                    inputProps={{
                                                        style: {
                                                            height: "34px",
                                                            fontSize: "14px",
                                                            fontWeight: "300"
                                                        },
                                                    }}
                                                    value={answers[index]}
                                                    onChange={event => handleAnswerChange(index, event)}
                                                    fullWidth variant='standard'></TextField>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))} */}
                        </Box>
                        <div className='error-message'>{errorMessage}</div>
                        <Button fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, maxWidth: "430px", margin: "0" }}
                            className='button' onClick={() => submit()}>
                            Continue
                        </Button>
                    </Box>

                </Grid>
            </Grid>
        </>
    )
}
