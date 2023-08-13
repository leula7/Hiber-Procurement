
  import { Formik } from "formik";
  import * as yup from "yup";

import {Box, Dialog, useMediaQuery, useTheme,TextField,DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const SetPriceDialog = ({open,onClose, row,handleFormSubmit}) => {
        const isNonMobile = useMediaQuery("(min-width:600px)");

            const PriceSchema = yup.object().shape({
            price: yup.number().required("required"),
        });
        const initialValues = {
            price: "",
        };
        
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle textAlign="center">Set UnitPrice for{row?.item_name} </DialogTitle>
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
                label="Price"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.price}
                name="price"
                error={Boolean(touched.price) && Boolean(errors.price)}
                helperText={touched.price && errors.price}
                sx={{ gridColumn: "span 4" }}
              />
              <Box >
                <DialogActions  >
                    <Button type="submit" variant="contained" color="secondary">
                    Set Price
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

export default SetPriceDialog