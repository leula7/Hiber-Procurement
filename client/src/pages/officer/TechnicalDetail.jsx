import { Box,Button, TextField, useMediaQuery } from '@mui/material'
import Header from 'components/Header'
import React, { useRef, useState } from 'react'
import { Formik } from "formik";
import * as yup from "yup";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useGetTechnicalQuery, useSetTechnicalResultMutation } from 'state/api';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useEffect } from 'react';


const TechnicalDetail = () => {
        const {bidid,sup_id} = useParams();
        const location = useLocation();
        const { file_names, username } = location?.state;
        const id = useSelector((state) => state.auth.user.user_id);
        const pdfDatas = useGetTechnicalQuery({username,file_names});
        const data = pdfDatas?.data?.data;

        const iframeRef = useRef(null);
        const navigate = useNavigate()
        const isNonMobile = useMediaQuery("(min-width:600px)");
        const [setTechnicalResult] = useSetTechnicalResultMutation();
        const initialValues = {
            evaluate_value: "",
          };

        const checkoutSchema = yup.object().shape({
          evaluate_value: yup.number().required("required"),
        });

        const handler = async (values) => {
          // const result =setTechnicalResult(values);

          values.technical_id = sup_id
          values.user_id= id
          console.log(values)
          const result = await setTechnicalResult(values)
            toast.success("sucesfully")
            navigate(-1)
            console.log("🚀 ~ file: TechnicalDetail.jsx:37 ~ handler ~ result:", result)
          
        }

        useEffect(() => {
          const pdfData = new Uint8Array(data); // Convert the Array to Uint8Array
          const blob = new Blob([pdfData], { type: 'application/pdf' }); // Create a Blob from the Uint8Array
          const url = URL.createObjectURL(blob);
          iframeRef.current.src = url;
          URL.revokeObjectURL(url);
        }, []);

  return (
    <Box m="1.5rem 2.5rem">
        <Header title="Technical Details" subtitle="" />
        <div>
            Technical File for bid {bidid} participant {sup_id}
        </div>
        <iframe
          ref={iframeRef !==null?iframeRef:""}
          style={{ border: "3px" ,marginTop: 2+"em"}}
          title="PDF Viewer"
          width="100%"
          height="500px">
        </iframe>
        <Formik
          onSubmit={handler}
          initialValues={initialValues}
          validationSchema={checkoutSchema}>
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
            label="Result"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.evaluate_value}
            name="evaluate_value"
            error={!!touched.evaluate_value && !!errors.evaluate_value}
            helperText={touched.evaluate_value && errors.evaluate_value}
            sx={{ gridColumn: "span 5" }}
          />
          </Box>
          <Button type="submit" color="secondary" variant="contained">
            Set Result
          </Button>
          </form>
    )}
  </Formik>
          
    </Box>
  )
}

export default TechnicalDetail