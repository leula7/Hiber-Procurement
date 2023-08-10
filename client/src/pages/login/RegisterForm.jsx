import { EditOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";

const registerSchema = yup.object().shape({
  First_Name: yup.string().required("required"),
  Last_Name: yup.string().required("required"),
  username: yup.string().required("required"),
  tin_number: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password:yup
  .string()
  .min(8, 'Password must be at least 8 characters')
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
  )
  .required('Password is required'),
});
const initialValuesRegister = {
  First_Name: "",
  Last_Name: "",
  username: "",
  password: "",
  email:"",
  tin_number:""

};

const RegisterForm = ( {handleFormSubmit}) => {
  const { palette } = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");


    return(
            <Formik
        onSubmit={handleFormSubmit}
        initialValues={ initialValuesRegister}
        validationSchema={ registerSchema}
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
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.First_Name}
                  name="First_Name"
                  error={
                    Boolean(touched.First_Name) && Boolean(errors.First_Name)
                  }
                  helperText={touched.First_Name && errors.First_Name}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.Last_Name}
                  name="Last_Name"
                  error={Boolean(touched.Last_Name) && Boolean(errors.Last_Name)}
                  helperText={touched.Last_Name && errors.Last_Name}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.username}
                  name="username"
                  error={Boolean(touched.username) && Boolean(errors.username)}
                  helperText={touched.username && errors.username}
                  sx={{ gridColumn: "span 4" }}
                />
               
                <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  {/* <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("picture", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Add Picture Here</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlined />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone> */}
                  
                </Box>
            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
             <TextField
              label="Tin Number"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.tin_number}
              name="tin_number"
              error={Boolean(touched.tin_number) && Boolean(errors.tin_number)}
              helperText={touched.tin_number && errors.tin_number}
              sx={{ gridColumn: "span 4" }}
            />
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
              REGISTER
            </Button>
          </Box>
        </form>
      )}
    </Formik>

    )
}

export default RegisterForm;