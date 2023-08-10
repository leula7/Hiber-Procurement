import { EditOffOutlined, EditOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import { Formik } from "formik";
import Dropzone from "react-dropzone";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useFillTechnicalFormMutation } from "state/api";
import * as yup from "yup";


const TechnicalForm = () => {
  const { supplier_Id} = useParams();
  const navigate = useNavigate();
  console.log(supplier_Id)
  const [FillTechnical] = useFillTechnicalFormMutation();
  const username = useSelector((state) => state.auth.user.username);


  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { palette } = useTheme();
  const initialValues = {
    licence: "",
    // vat:"",
    // tin:"",
  }
  const schema = yup.object().shape({
    licence: yup.string().required("required")
  })
 

    const handleSubmit = async (values) => {
      console.log(values)
         const formData = new FormData();
  // for (let value in values) {
    formData.append("file", values.licence);
  // }
  formData.append("licencePath", values.licence.name);
  // formData.append("vatPath", values.vat.name);
  // formData.append("tinPath", values.tin.name);
  formData.append("username", username);
  formData.append("bid_participate_id", supplier_Id);
  // values.username=username;
  // values.bid_participate_id=supplier_Id;
    console.log(formData);
    const result = await FillTechnical(formData)
    toast.success("sucsusfull");
    navigate(-1)
    console.log(result)
    }
    return (
      <Box  m="1.5rem 2.5rem" >
      <Header title="Technical Form"   />
        <Box  > 
                       <Formik
                onSubmit={handleSubmit}
                initialValues={initialValues}
                validationSchema={schema}
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
                      <Box
                            gridColumn="span 4"
                            border={`1px solid ${palette.neutral.medium}`}
                            borderRadius="5px"
                            p="1rem"
                          >
                            <Dropzone
                              acceptedFiles=".pdf"
                              multiple={false}
                              onDrop={(acceptedFiles) =>
                                setFieldValue("licence", acceptedFiles[0])
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
                                  {!values.licence ? (
                                    <p>Add licence Here</p>
                                  ) : (
                                    <FlexBetween>
                                      <Typography>{values.licence.name}</Typography>
                                      <EditOffOutlined />
                                    </FlexBetween>
                                  )}
                                </Box>
                              )}
                            </Dropzone>
                          </Box>
                          {/* <Box
                            gridColumn="span 4"
                            border={`1px solid ${palette.neutral.medium}`}
                            borderRadius="5px"
                            p="1rem"
                          > */}
                            {/* <Dropzone
                              acceptedFiles=".pdf"
                              multiple={false}
                              onDrop={(acceptedFiles) =>
                                setFieldValue("tin", acceptedFiles[0])
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
                                  {!values.tin ? (
                                    <p>Add tin Here</p>
                                  ) : (
                                    <FlexBetween>
                                      <Typography>{values.tin.name}</Typography>
                                      <EditOffOutlined />
                                    </FlexBetween>
                                  )}
                                </Box>
                              )}
                            </Dropzone>
                          </Box>
                          <Box
                            gridColumn="span 4"
                            border={`1px solid ${palette.neutral.medium}`}
                            borderRadius="5px"
                            p="1rem"
                          >
                            <Dropzone
                              acceptedFiles=".pdf"
                              multiple={false}
                              onDrop={(acceptedFiles) =>
                                setFieldValue("vat", acceptedFiles[0])
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
                                  {!values.vat ? (
                                    <p>Add vat Here</p>
                                  ) : (
                                    <FlexBetween>
                                      <Typography>{values.vat.name}</Typography>
                                      <EditOffOutlined />
                                    </FlexBetween>
                                  )}
                                </Box>
                              )}
                            </Dropzone>
                          </Box> */}
                          <Button
                        fullWidth
                        type="submit"
                        sx={{
                          m: "2rem 0",
                          p: "1rem",
                          backgroundColor: palette.primary.main,
                          color: palette.background.alt,
                          "&:hover": { color: palette.primary.main },
                        }}
                      >
                        submit
                      </Button>
                    </Box>
                    </form>
                )}
              </Formik>
             </Box>
             </Box>
     
    );
  };
  

export default TechnicalForm