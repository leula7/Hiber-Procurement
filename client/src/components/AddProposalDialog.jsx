
import { Formik } from "formik";
import * as yup from "yup";

import {Box, Dialog, useMediaQuery, useTheme,TextField,DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const AddProposalDialog = ({open,onClose,handleFormSubmit}) => {
      const isNonMobile = useMediaQuery("(min-width:600px)");

          const PriceSchema = yup.object().shape({
          year: yup.string().required("required"),
      });
      const initialValues = {
          year: "",
      };
      
return (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle textAlign="center">Create Proposal</DialogTitle>
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
              label="year"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.year}
              name="year"
              error={Boolean(touched.year) && Boolean(errors.year)}
              helperText={touched.year && errors.year}
              sx={{ gridColumn: "span 4" }}
            />
            <Box >
              <DialogActions  >
                  <Button type="submit" variant="contained" color="secondary">
                     AddProposal
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

export default AddProposalDialog