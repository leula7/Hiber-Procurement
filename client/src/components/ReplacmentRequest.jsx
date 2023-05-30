import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";


 const ReplacmentRequest = ({handler}) => {

  const isNonMobile = useMediaQuery("(min-width:600px)");

    const initialValues = {
  item: "",
  reason: "",
  tag: "",
  service: "",
  book: "",
 
};

const checkoutSchema = yup.object().shape({
  item: yup.string().required("required"),
  reason: yup.string().required("required"),
  tag: yup.string().required("required"),
  service: yup.string().required("required"),
  book: yup.string().required("required"),
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
                type="text"
                label="item"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.item}
                name="item"
                error={!!touched.item && !!errors.item}
                helperText={touched.item && errors.item}
                sx={{ gridColumn: "span 5" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="reason"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.reason}
                name="reason"
                error={!!touched.reason && !!errors.reason}
                helperText={touched.reason && errors.reason}
                sx={{ gridColumn: "span 5" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="tag number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.tag}
                name="tag"
                error={!!touched.tag && !!errors.tag}
                helperText={touched.tag && errors.tag}
                sx={{ gridColumn: "span 5" }}
              />
                <TextField
                fullWidth
                variant="filled"
                type="number"
                label="service year"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.service}
                name="service"
                error={!!touched.service && !!errors.service}
                helperText={touched.service && errors.service}
                sx={{ gridColumn: "span 5" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="book value"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.book}
                name="book"
                error={!!touched.book && !!errors.book}
                helperText={touched.book && errors.book}
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

export default ReplacmentRequest;
