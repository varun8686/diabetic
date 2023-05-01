import * as React from 'react';

import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem, Icon, }
  from '@mui/material';
import { useState, useEffect } from 'react';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import '../assets/logo.png'
import logo from "../assets/logo.png"
const pages = [
  {
    path: "/dashboard",
    label: "Dashboard",
    navigateTo: "/dashboard"
  },
];
const settings = [
  {
    path: "/changePassword",
    label: "Change Password",
    navigateTo: "/changePassword"
  },
  {
    path: "/logout",
    label: "Logout"
  },
]
export default function Header() {
  const [anchorElNav, setAnchorElNav] = useState();
  const [anchorElUser, setAnchorElUser] = useState();
  const [activeMenu, setActiveMenu] = useState("/dashboard")
  const navigate = useNavigate()
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const userName = JSON.parse(sessionStorage.getItem("userName"))
  
  const handleNavigation = (value) => {
    setActiveMenu(value.path)
    if (value.path === "/logout") {
      navigate('/')
      localStorage.clear();
      sessionStorage.clear();
    }
    else {
      navigate(value.navigateTo)
    }
  }
  useEffect(() => {
    const path = window.location.pathname;
    setActiveMenu(path)
  }, [])

  return (
    <AppBar position='static' style={{background:"#3689AA"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <img src={logo} alt="logo" height="50px" object="contain"/>
          <Typography
            variant="h6"
            noWrap
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              flexGrow: 1
            }}
          >
            Diabetics
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
            {pages.map((item, index) => (
              <Typography key={index} sx={{ color: '#fff', mr: 5,fontWeight:"500",cursor:"pointer" }} variant="div" component="div" onClick={() => handleNavigation(item)} className={activeMenu === item.path ? "borderbtn" : ""} >{item.label}</Typography>

            ))}
          </Box>
          <Typography variant="div"  sx={{
              mr: 2,
              display: { xs: 'flex', md: 'flex' },
            }}>
         {userName}
          </Typography>
         
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <AccountCircleIcon style={{width:"45px",height:"45px",color:"white"}}/>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting, index) => (
                <MenuItem key={index} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" className={activeMenu === setting.path ? "menuborderbtn" : ""} onClick={() => handleNavigation(setting)}>{setting.label}</Typography>
                </MenuItem>
              ))}
              {pages.map((item, index) => (
                <MenuItem key={index} sx={{ display: { xs: 'flex', sm: 'none' } }}>
                  <Typography textAlign="center" className={activeMenu === item.path ? "menuborderbtn" : ""} onClick={() => handleNavigation(item)}>{item.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
