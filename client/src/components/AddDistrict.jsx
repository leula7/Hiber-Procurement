
import { Formik } from "formik";
import * as yup from "yup";

import {Box, Dialog, useMediaQuery, useTheme,TextField,DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const AddDistrict = ({open,onClose,handleFormSubmit}) => {
      const isNonMobile = useMediaQuery("(min-width:600px)");
        
      const PriceSchema = yup.object().shape({
            branch_name: yup.string().required("required"),
      });
      const initialValues = {
        branch_name: ""
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
                  label="Branch Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.branch_name}
                  name="branch_name"
                  error={
                    Boolean(touched.branch_name) && Boolean(errors.branch_name)
                  }
                  helperText={touched.branch_name && errors.branch_name}
                  sx={{ gridColumn: "span 2" }}
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

export default AddDistrict