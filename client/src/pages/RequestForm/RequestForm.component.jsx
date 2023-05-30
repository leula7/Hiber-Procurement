import { Box, Button, TextField } from "@mui/material";
import Switch from '@mui/material/Switch';
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useState } from "react";
import { useRequestMutation } from "state/api";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import ReplacmentRequest from "components/ReplacmentRequest";
import AdditionalRequest from "components/AdditionalRequest";

const RequestForm = () => {

  const [replacement, setReplacement] = useState(false);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [request, { isLoading, isError }] = useRequestMutation();
  const user = useSelector((state)=> state.auth.user)

  const handleRepacementFormSubmit = async (values) => {
    
    try {
         const id = user._id;
         values.id=id;
         console.log(values)
      const response  = await request(values);
      const r = response.data; // Retrieve the data property
      console.log(request)
      if (r) {
        toast.success(' successfully Requested!');
      } else {
        toast.error('error requesting');
      }
    } catch (error) {
      console.error('request failed:', error.message)
    }
  };


  
  const handleSwitchChange = (event) => {
    setReplacement(event.target.checked);
  };

  const handleAdditionalFormSubmit = async (values) => {
    try {
      const id = user.user_id;
      values.user_id=id;
      values.table="additional_request";
      values.item_id=1
      console.log(values)
   const response  = await request(values);
   const r = response.data.requested_id; // Retrieve the data property
   console.log(request)
   if (r) {
     toast.success(' successfully Requested!');
   } else {
     toast.error('error requesting');
   }
 } catch (error) {
   console.error('request failed:', error.message)
 }
  }

  return (
    <Box m="20px">
      <Header title="REQUEST FORM" subtitle="Create a New Request " />
        <Box display="flex" justifyContent="center" >
        <Box>{!replacement ? <Box>Addtional</Box> : <Box>Replacment</Box>}</Box>
        <Switch checked={replacement} onChange={handleSwitchChange} />
         </Box>
      { !replacement ? (
      <AdditionalRequest handler={handleAdditionalFormSubmit} />
      ) : (
          <ReplacmentRequest handler={handleRepacementFormSubmit} />
      )
      }
     
    </Box>
  );
};
export default RequestForm;