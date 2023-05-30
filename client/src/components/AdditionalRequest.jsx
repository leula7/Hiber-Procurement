import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";

const AdditionalRequest = ({handler}) => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const initialValues = {
        quantity: "",
        time_of_purchase: "",
        title_of_post: "",
        other_reason: "",
      };
      const checkoutSchema = yup.object().shape({
        quantity: yup.string().required("required"),
        time_of_purchase: yup.string().required("required"),
        title_of_post: yup.string().required("required"),
        other_reason: yup.string().required("required"),
      });
  return (
    <Formik
    onSubmit={handler}
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
          margin="10px 0"
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(5, minmax(0, 1fr))"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 5" },
          }}
        >
          <TextField
            fullWidth
            variant="filled"
            type="number"
            label="quantity"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.quantity}
            name="quantity"
            error={!!touched.quantity && !!errors.quantity}
            helperText={touched.quantity && errors.quantity}
            sx={{ gridColumn: "span 5" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="number"
            label="time of purchase"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.time_of_purchase}
            name="time_of_purchase"
            error={!!touched.time_of_purchase && !!errors.time_of_purchase}
            helperText={touched.time_of_purchase && errors.time_of_purchase}
            sx={{ gridColumn: "span 5" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="title of post"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.title_of_post}
            name="title_of_post"
            error={!!touched.title_of_post && !!errors.title_of_post}
            helperText={touched.title_of_post && errors.title_of_post}
            sx={{ gridColumn: "span 5" }}
          />
            <TextField
            fullWidth
            variant="filled"
            type="text"
            label="other reason"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.other_reason}
            name="other_reason"
            error={!!touched.other_reason && !!errors.other_reason}
            helperText={touched.other_reason && errors.other_reason}
            sx={{ gridColumn: "span 5" }}
          />
         
        </Box>
        <Box display="flex" justifyContent="end" mt="20px" gap="1rem">
        <Button  color="secondary" variant="contained"  >
            Reset Fields
          </Button>
          <Button type="submit" color="secondary" variant="contained">
            Add new Form
          </Button>
        </Box>
      </form>
    )}
  </Formik>
  )
}

export default AdditionalRequest