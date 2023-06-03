import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import { toast } from "react-toastify";
import { useLoginMutation, useRegisterMutation } from 'state/api';
import { setLogin } from "state/state";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";


const Form = () => {
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  const [login, { isLoading: isLoginLoading, isError: isLoginError }] = useLoginMutation();
  const [register, { isLoading: isRegisterLoading, isError: isRegisterError }] = useRegisterMutation();
  
  


  const handlelogin = async (values, onSubmitProps) => {
    try {
      console.log(values)
      const result = await login(values);
      const loggedInUser = result.data; // Retrieve the data property
      console.log("User: ",loggedInUser)
      if (loggedInUser) {
        if(loggedInUser.error == "200"){
          toast.success('Login successful!');
          dispatch( setLogin({
            user: loggedInUser,
            token: loggedInUser.token,
          }));
        }
        navigate('/');
      } else {
        toast.error('Invalid username or password!');
      }
    } catch (error) {
      // console.error('Login failed:', error.message);
      // if (error) {
      //   toast.error('Invalid username or password!');
      // } else if (error.response && error.response.status === 501) {
      //   toast.error('Server error: Not Implemented');
      // } else {
      //   toast.error('An error dfsdfsdf occurred!');
      //}
    }
  };
  const handleregister = async (values, onSubmitProps) => {
    try {
      console.log(`values  ${values}`)
      const result = await register(values);
      const registered = result.data; // Retrieve the data property
      if (registered) {
        toast.success('Registered successfully!');
       // onSubmitProps.resetForm();
        setPageType("login");
      } else {
        toast.error('error registering');
      }
    } catch (error) {
      console.error('Registration failed:', error.message)
    }
  };

  // const handleFormSubmit = async (values, onSubmitProps) => {
  //   console.log(`values  ${values}`)

  //   if (isLogin) await loginn(values, onSubmitProps);
  //   if (isRegister) await handleregister(values, onSubmitProps);
  // };
  return (
          <>
            {isRegister ? (
              <RegisterForm handleFormSubmit={handleregister}  />
            ) : (
              <LoginForm handleFormSubmit={handlelogin} />
            )}
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
              
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up here."
                : "Already have an account? Login here."}
            </Typography>
    </>)
}


export default Form;
