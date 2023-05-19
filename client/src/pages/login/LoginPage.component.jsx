import React from "react";
import { useDispatch } from "react-redux";
import { login } from "state/authSlice"; // Update the import path accordingly
import { Formik } from "formik";
import * as yup from "yup";
import { Box, Button, TextField, Typography } from "@mui/material";
import hiber from  "assets/Hibret-bank-logo.jpg"

const LoginPage = () => {
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(login()); // Dispatch the login action
  };

  const initialValues = {
    email: "",
    password: "",
  };

  const checkoutSchema = yup.object().shape({
    password: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required")
  });
  
  const handleSubmit = (values) => {
    dispatch(login(values)); 
    }

  return (
    <Box display="flex" justifyContent="center" >
      <Box width="40%" height="30%" mt="300px" >
        <Box align="center" >
            <Box 
                component="img"
                alt="profile"
                src={hiber}
                height="92px"
                width="92px"
                borderRadius="30%"
                sx={{ objectFit: "cover" }} />
        </Box>
        
        <Typography variant="h3" align="center" margin="30px">
            Login 
        </Typography>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="block"
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box display="flex" justifyContent="center" mt="20px" gap="1rem">
            {/* <Button  color="secondary" variant="contained"  onClick={handleFormReset}>
                Reset Fields
              </Button> */}
              <Button type="submit" color="primary" variant="contained">
                Login
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
    </Box>
      
  );
            }
export default LoginPage;
