
import App from "./App";
import ErrorPage from "./components/NotFound";
import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./Pages/login";
import Home from "./Pages/home";
import PrivateRoute from "./Guards/PrivateRoute";
import SignUp from "./Pages/signUp";
import ResetPassword from "./Pages/resetPassword";
import CreatePassword from "./Pages/CreatePassword";
import TwoWayAuthQuestions from "./Pages/TwoWayAuthQuestions";
import Images from "./Pages/Images";
import ChangePassword from "./Pages/changePassword";
const Router = () => {
    return (
        <Suspense fallback={<React.Fragment>Loading...</React.Fragment>}>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <Layout Component={Home}></Layout>
                            </PrivateRoute>
                        
                    }
                ></Route>
                <Route path="/signup" element={
                    <SignUp />
                }></Route>
                <Route path="/resetpassword" element={
                    <ResetPassword />
                }></Route>
                  <Route path="/createpassword" element={
                    <CreatePassword />
                }></Route>
                <Route path="/questions" element={
                    <TwoWayAuthQuestions />
                }></Route>
                 <Route path="/images" element={
                    <Images />
                }></Route>
                 <Route path="/changePassword" element={
                    <PrivateRoute>
                         <Layout Component={ChangePassword}></Layout>
                    </PrivateRoute>
                   
                }></Route>
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </Suspense>
    )
}
export default Router