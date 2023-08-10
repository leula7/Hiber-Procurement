
import { Formik } from "formik";
import * as yup from "yup";

import {Box, Dialog, useMediaQuery, useTheme,TextField,DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const FinancialDate = ({open,onClose, row,handleFormSubmit}) => {
      const isNonMobile = useMediaQuery("(min-width:600px)");

          const PriceSchema = yup.object().shape({
            financial_open_date: yup.date().required("required"),
      });
      const initialValues = {
        financial_open_date: "",
      };
      
return (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle textAlign="center">Set Financial Date for {row?.name} </DialogTitle>
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
            type="datetime-local"
              label=""
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.financial_open_date}
              name="financial_open_date"
              error={Boolean(touched.financial_open_date) && Boolean(errors.financial_open_date)}
              helperText={touched.financial_open_date && errors.financial_open_date}
              sx={{ gridColumn: "span 4" }}
            />
            <Box >
              <DialogActions  >
                  <Button type="submit" variant="contained" color="secondary">
                  Set Time and Date
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

export default FinancialDate