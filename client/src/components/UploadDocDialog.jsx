
import { Formik } from "formik";
import * as yup from "yup";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";


import {Box, Dialog, useMediaQuery, useTheme,TextField,DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import { EditOutlined } from "@mui/icons-material";
import { useUploadDocmentMutation } from "state/api";

const UploadDoc = ({open,onClose, row,handleFormSubmit}) => {
      const isNonMobile = useMediaQuery("(min-width:600px)");
      const [UploadDocument] = useUploadDocmentMutation();
      const { palette } = useTheme();
          const PriceSchema = yup.object().shape({
            file: yup.string().required("required"),
      });
      const initialValues = {
        file: "",
      };
      // const handleFormSubmit = (values) => {
      //     const result = UploadDocument(values)
      //   console.log(values)
      // }
return (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle textAlign="center">Upload bid Document{row?.name} </DialogTitle>
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
            gridTemplateColumns="repeat(1, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            <Dropzone
                    acceptedFiles=".pdf"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("file", acceptedFiles[0])
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
                        {!values.file ? (
                          <p>Add Document Here</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.file.name}</Typography>
                            <EditOutlined />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
            <Box >
              <DialogActions  >
                  <Button type="submit" variant="contained" color="secondary">
                  Upload Document
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

export default UploadDoc