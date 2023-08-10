import { Box, Button, MenuItem, TextField, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useGetItemsQuery } from "state/api";


 const ReplacmentRequest = ({handler}) => {
  const theme = useTheme()
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const {data:items,isLoding} = useGetItemsQuery();

    const initialValues = {
  item_id: "",
  other_reason: "",
  time_of_purchase:"",
  frequency_of_rep:"",
  tag_no: "",
  service_year: "",
  book_value: "",
 
};

const checkoutSchema = yup.object().shape({
  item_id: yup.number().required("required"),
  time_of_purchase:yup.number().required("required"),
  other_reason: yup.string().required("required"),
  frequency_of_rep:yup.number().required("required"),
  tag_no: yup.string().required("required"),
  service_year: yup.number().required("required"),
  book_value: yup.number().required("required"),

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
              select
              label="Item ID"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.item_id}
              name="item_id"
              error={!!touched.item_id && !!errors.item_id}
              helperText={touched.item_id && errors.item_id}
              sx={{ gridColumn: "span 5" }}
            >
              {items?.map((item) => (
                <MenuItem sx={{
                  color: theme.palette.secondary.light
                }} key={item.item_id} value={item.item_id}>
                  {item.item_name}
                </MenuItem>
              ))}
            </TextField>
               <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Frequency of replacment"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.frequency_of_rep}
                name="frequency_of_rep"
                error={!!touched.frequency_of_rep && !!errors.frequency_of_rep}
                helperText={touched.frequency_of_rep && errors.frequency_of_rep}
                sx={{ gridColumn: "span 5" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="reason"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.other_reason}
                name="other_reason"
                error={!!touched.other_reason && !!errors.other_reason}
                helperText={touched.other_reason && errors.other_reason}
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
            label="Tag no"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.tag_no}
            name="tag_no"
            error={!!touched.tag_no && !!errors.tag_no}
            helperText={touched.tag_no && errors.tag_no}
            sx={{ gridColumn: "span 5" }}
          />
                <TextField
                fullWidth
                variant="filled"
                type="number"
                label="service year"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.service_year}
                name="service_year"
                error={!!touched.service_year && !!errors.service_year}
                helperText={touched.service_year && errors.service_year}
                sx={{ gridColumn: "span 5" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="book value"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.book_value}
                name="book_value"
                error={!!touched.book_value && !!errors.book_value}
                helperText={touched.book_value && errors.book_value}
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
