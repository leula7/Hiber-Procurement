
import { Formik } from "formik";
import * as yup from "yup";

import {Box, Dialog, useMediaQuery, useTheme,TextField,DialogTitle, DialogContent, DialogActions, Button, MenuItem } from '@mui/material';
import { useGetBranchQuery } from "state/api";

const SetDeadlLine = ({open,onClose,handleFormSubmit}) => {
      const isNonMobile = useMediaQuery("(min-width:600px)");
      const {data} = useGetBranchQuery();
      console.log(data)
      const theme = useTheme();


          const PriceSchema = yup.object().shape({
            First_Name: yup.string().required("required"),
            Last_Name: yup.string().required("required"),
            email: yup.string().email("invalid email").required("required"),
            branch_id: yup.string().required("required"),
            position: yup.string().required("required"),
      });
      const initialValues = {
        First_Name: "",
        Last_Name: "",
        email:"",
        position: "",
        branch_id: ""
      };
      
return (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle textAlign="center">Add Employee </DialogTitle>
    <DialogContent>
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={ initialValues}
      validationSchema={ PriceSchema}
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
              fullWidth
              variant="filled"
              select
              label="Branch Id"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.branch_id}
              name="branch_id"
              error={!!touched.branch_id && !!errors.branch_id}
              helperText={touched.branch_id && errors.branch_id}
              sx={{ gridColumn: "span 5" }}
            >
              {data?.map((item) => (
                <MenuItem sx={{
                  color: theme.palette.secondary.light
                }} key={item.Branch_id} value={item.Branch_id}>
                  {item.Branch_Name}
                </MenuItem>
              ))}
            </TextField>
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
            <Box >
              <DialogActions  >
                  <Button type="submit" variant="contained" color="secondary">
                   Add Employee
                  </Button>
              </DialogActions>
            </Box>
              
            </Box>
            </form>
      )}
    </Formik>
    </DialogContent>
 
  </Dialog>
)
}

export default SetDeadlLine