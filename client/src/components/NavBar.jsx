import React, { useState } from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
} from "@mui/icons-material";
import FlexBetween from "./FlexBetween";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state/state";
import ProfileImage from "../assets/profile.jpeg";
import {
  useTheme,
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Button,
  Box,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const NavBar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(setLogout());
    navigate("/");
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  
  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Left side */}
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
          <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search....." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        </FlexBetween>
        
        {/* Right side */}
        <FlexBetween gap="1.5rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>
          <IconButton>
            <SettingsOutlined sx={{ fontSize: "25px" }} />
          </IconButton>
          
          {/* User profile and logout dropdown */}
          <FlexBetween>
            <Button
              onClick={handleClick}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textTransform: "none",
                gap: "1rem",
              }}
            >
              <Box
                component="img"
                alt="profile"
                src={ProfileImage}
                height="32px"
                width="32px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
            </Button>
            <Box textAlign="left">
              <Typography
                fontWeight="bold"
                fontSize="0.8rem"
                sx={{ color: theme.palette.secondary[100] }}
              >
                {user.username}
              </Typography>
              <Typography
                fontSize="0.75rem"
                sx={{ color: theme.palette.secondary[200] }}
              >
                {user.position}
              </Typography>
            </Box>
            <ArrowDropDownOutlined
              sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
            />
            
            {/* Logout dropdown menu */}
            <Menu
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <MenuItem onClick={logoutHandler}>Log Out</MenuItem>
            </Menu>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
