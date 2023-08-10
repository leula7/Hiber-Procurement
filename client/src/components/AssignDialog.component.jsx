import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, useMediaQuery, Box, MenuItem, useTheme } from '@mui/material';
import * as yup from "yup";
import { Formik } from "formik";
import { useGetCategoriesIdQuery, useGetProposalIdQuery, useGetTechnicalDetailQuery } from 'state/api';



const AssignDialog = ({ open, onClose, rowData, onAssign }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [selectedProposalId, setselectedProposalId] = useState(null);
  const theme = useTheme();
  const {data:cats,refetch} = useGetCategoriesIdQuery(selectedProposalId);
 console.log(cats)
  const {data:o,} = useGetProposalIdQuery();
 console.log(o);
  const categorySchema = yup.object().shape({
  cat_id: yup.number().required("required"),
  prop_id: yup.number().required("required"),
});
const initialValues = {
  cat_id: "",
  prop_id:"",
};





const handleProposalChange = async (event, setFieldValue) => {
   setselectedProposalId(event.target.value)
  console.log(selectedProposalId)
  try {
      
      setFieldValue("prop_id", selectedProposalId);

  } catch (error) {
    console.error("Error fetching category ID:", error);
  }
};

useEffect(() => {
  refetch();
},[selectedProposalId,refetch]);

  return (
    <Dialog open={open} onClose={onClose}>
    <DialogTitle textAlign="center">Assign Task for{rowData?.First_Name} </DialogTitle>
    <DialogContent>
    <Formik
      onSubmit={onAssign}
      initialValues={ initialValues}
      validationSchema={ categorySchema}
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
              fullWidth
              variant="filled"
              select
              label="Category Id"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.cat_id}
              name="cat_id"
              error={!!touched.cat_id && !!errors.cat_id}
              helperText={touched.cat_id && errors.cat_id}
              sx={{ gridColumn: "span 5" }}
            >
              {cats?.map((item) => (
                <MenuItem sx={{
                  color: theme.palette.secondary.light
                }} key={item.cat_id} value={item.cat_id}>
                  {item.cata_Name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              variant="filled"
              select
              label="Proposal Id"
              onBlur={handleBlur}
              onChange={(event) => {
                setFieldValue("prop_id", event.target.value);          
                      handleProposalChange(event, setFieldValue);
              }}
               value={values.prop_id}
              name="prop_id"
              error={!!touched.prop_id && !!errors.prop_id}
              helperText={touched.prop_id && errors.prop_id}
              sx={{ gridColumn: "span 5" }}
            >
              {o?.map((item) => (
                <MenuItem sx={{
                  color: theme.palette.secondary.light
                }} key={item.prop_id } value={item.prop_id}>
                  {item.title}
                </MenuItem>
              ))}
            </TextField>
           
            <Box >
              <DialogActions  >
                  <Button type="submit" variant="contained" color="secondary">
                      Assign
                  </Button>
              </DialogActions>
            </Box>
              
            </Box>
            </form>
      )}
    </Formik>
    </DialogContent>
 
  </Dialog> )
}

export default AssignDialog