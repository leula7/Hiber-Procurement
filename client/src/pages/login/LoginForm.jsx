import {
    Box,
    Button,
    TextField,
    useMediaQuery,
    useTheme,
  } from "@mui/material";
  import { Formik } from "formik";
  import * as yup from "yup";

  const loginSchema = yup.object().shape({
    username: yup.string().required("required"),
  password: yup.string().required("required"),
});



const initialValuesLogin = {
  username: "",
  password: "",
};


  const LoginForm = ({handleFormSubmit}) => {
    const { palette } = useTheme();
    const isNonMobile = useMediaQuery("(min-width:600px)");
  

    return(
        <Formik
        onSubmit={handleFormSubmit}
        initialValues={ initialValuesLogin}
        validationSchema={ loginSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          resetForm,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                label="user name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.username}
                name="username"
                error={Boolean(touched.username) && Boolean(errors.username)}
                helperText={touched.username && errors.username}
                sx={{ gridColumn: "span 4" }}/>
                
              <TextField
                label="Password"
                type="password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={Boolean(touched.password) && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box>
              <Button
                fullWidth
                type="submit"
                sx={{
                  m: "2rem 0",
                  p: "1rem",
                  backgroundColor: palette.secondary.main,
                  "&:hover": { color: palette.primary.main },
                }}
              >
                Login
              </Button>
            </Box>
          </form>
        )}
      </Formik>
        )
}
  

  export default LoginForm;