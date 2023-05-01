import React, { useEffect, useState } from 'react'
import { Alert, LinearProgress, Snackbar, Button,Paper, Box, Grid, Typography, Hidden } from '@mui/material';
import image1 from '../assets/grid1.jpg'
import image2 from '../assets/grid2.jpg'
import image3 from '../assets/grid3.jpg'
import image4 from '../assets/grid4.jpg'
import image5 from '../assets/grid5.jpg'
import image8 from '../assets/grid6.jpg'
import image9 from '../assets/grid7.jpg'
import image6 from '../assets/grid8.jpg'
import image10 from '../assets/grid9.jpg'
import logo from '../assets/logo.png'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Grid1 from '../components/Grid1';
import instance from '../Utils/axiosInterceptors';
import { useNavigate, useLocation } from 'react-router-dom';
export default function Images(props) {
    const navigate = useNavigate()
    const listOfIamges = [
        image1,
        image2, image3, image4, image5, image6, image8, image9, image10,
    ];
    const fromChangePassword = props.fromChangePassword;
    const [selectedImage, setSelectedImage] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const userId = JSON.parse(localStorage.getItem("id"));
    const location = useLocation();
    const fromImages = (location.state && location.state.fromImages) || "";
    const [userData, setUserData] = useState();
    const [sucessMessage, setSucessMessage] = useState("");
    const submitImage = async () => {
        if (selectedImage.length === 0) {
            setErrorMessage("Please Choose one image");
        }
        else {
            if (fromImages) {
                if (selectedImage[0] === userData.imageIndex) {
                    navigate('/dashboard');
                    sessionStorage.setItem("login","loggedIn");
                }
                else {
                    setErrorMessage("Incorrect Image");
                }
            } else {
                let data = {};
                data.imageIndex = selectedImage[0];
                setShowLoader(true);
                await instance({
                    method: "PUT",
                    url: `users/image/${userId}`,
                    data
                }).then((resp) => {
                    if (resp.status === 200) {
                        setShowLoader(false)
                        if(fromChangePassword){
                            setSucessMessage("Updated Sucessfully");
                            setShowAlert(true);
                        }
                        else {
                        navigate('/dashboard');
                        sessionStorage.setItem("login","loggedIn");
                        }
                        setSelectedImage([]);
                    }
                    else {
                        setShowLoader(false);
                    }
                });
            }
        }
    }
    useEffect(() => {
        const fetch = async () => {
            await instance({
                method: "GET",
                url: `passwords/${userId}`,
            }).then((resp) => {
                if (resp.status === 200) {
                    setUserData(resp.data.userId);
                }
            })
        }
        if (fromImages) {
            fetch();
        }
    }, []);

    const selectImage = (img, index) => {
        setErrorMessage("");
        if (selectedImage.includes(index)) {
            setSelectedImage(selectedImage.filter((a) => a !== index));
        } else {
            setSelectedImage([index]);
        }
    }
    return (
        <Grid container component="main" sx={{ height: '100vh' }} style={{ pointerEvents: showLoader ? "none" : "auto" }}>
             {!fromChangePassword &&
                <Hidden smDown mdDown>
                    <Grid1></Grid1>
                </Hidden>}
            <Grid item xs={12} sm={12} md={!fromChangePassword  ? 8 : 12} component={Paper} elevation={6} square>
                {showLoader && <LinearProgress />}
                <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={showAlert} autoHideDuration={3000} onClose={() => setShowAlert(false)}>
                    <Alert onClose={() => setShowAlert(false)} severity="success" sx={{ width: '100%' }}>
                        {sucessMessage}
                    </Alert>
                </Snackbar>
                <Box
                    sx={{
                        my: 2,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                     {!fromChangePassword &&
                    <Hidden mdUp>
                        <img src={logo} alt="logo" height="50px" object="contain" />
                    </Hidden>}
                    <Typography component="div" variant="div" sx={{
                        fontWeight: '400', color: "rgba(0, 0, 0, 0.87)", fontSize: "14px", padding: "10px 0px"
                    }}>
                        Please select a single image from the options
                    </Typography>
                    <Typography component="div" variant="div" sx={{
                        fontWeight: '300', color: "rgba(0, 0, 0, 0.87)", fontSize: "13px", paddingBottom: "10px"
                    }}>
                        <span style={{ fontWeight: '400', color: "#3689AA", fontSize: "14px" }}>Note<span style={{ color: "red" }}>*</span>:{" "}</span>Remember this image! It will be required for you to log in to your account.
                    </Typography>

                    <Box sx={{ mt: 1, maxWidth: "430px", }}>
                        <Grid container sx={{ justifyContent: "center" }}>
                            {listOfIamges.length > 0 && listOfIamges.map((img, index) => (
                                <Grid item md={4} sm={4} key={index}>
                                    <div style={{ position: "relative" }}>
                                        <div style={{ position: "absolute", right: "0" }}>
                                            {selectedImage.includes(index) &&
                                                <CheckCircleIcon style={{ width: "30px", height: "30px", color: "orange" }} />}
                                        </div>
                                        <img className='pointer' src={img} alt="logo" height="130px" width="130px" object="contain" onClick={() => selectImage(img, index)} />

                                    </div>
                                </Grid>
                            ))}
                        </Grid>
                        <div className='error-message'>{errorMessage}</div>
                        <Button fullWidth
                            variant="contained"
                            style={{ margin: "0px" }}
                            className='button' onClick={submitImage}>
                            Next
                        </Button>
                    </Box>
                </Box></Grid>
        </Grid>
    )
}
