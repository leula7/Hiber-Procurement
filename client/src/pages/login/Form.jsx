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
      const loggedInUser = result.data;
      console.log(loggedInUser) // Retrieve the data property
      if (loggedInUser.error === '200') {
        toast.success(loggedInUser.message)
        dispatch( setLogin({
          user: loggedInUser,
          token: loggedInUser.token,
        }))
        navigate('/');
      } else if (loggedInUser.error === '400') {
        toast.error(loggedInUser.message)
      }
      
    } catch (error) {
      
      // console.error('Login failed:', ge);
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
      values.position="supplier"
      const result = await register(values);

      console.log(result)
      const registered = result.data; // Retrieve the data property
      if (registered.error === '200') {
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
