import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";



const registerSchema = yup.object().shape({
  fname: yup.string().required("required"),
  lname: yup.string().required("required"),
  username: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  branch_id: yup.string().required("required"),
  position: yup.string().required("required"),
});
const initialValuesRegister = {
  fname: "",
  lname: "",
  username: "",
  password: "",
  email:"",
  position: "",
  branch_id: ""
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
                  value={values.firstName}
                  name="fname"
                  error={
                    Boolean(touched.fname) && Boolean(errors.fname)
                  }
                  helperText={touched.fname && errors.fname}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lname}
                  name="lname"
                  error={Boolean(touched.lname) && Boolean(errors.lname)}
                  helperText={touched.lname && errors.lname}
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
                <TextField
                  label="position"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.position}
                  name="position"
                  error={
                    Boolean(touched.position) && Boolean(errors.position)
                  }
                  helperText={touched.position && errors.position}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="branch id"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.branch_id}
                  name="branch_id"
                  error={
                    Boolean(touched.branch_id) && Boolean(errors.branch_id)
                  }
                  helperText={touched.branch_id && errors.branch_id}
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
                            <EditOutlinedIcon />
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