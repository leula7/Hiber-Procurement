import { LockOpenOutlined, LockOutlined } from '@mui/icons-material'
import { Box, Button, CircularProgress, Divider, LinearProgress, Typography } from '@mui/material'
import Header from 'components/Header'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetOnGoingDetailQuery } from 'state/api'

const OnGoingDetail = () => {
  const {id} = useParams();
  const navigate= useNavigate();
  console.log(id)
  const {data,isLoading,refetch} = useGetOnGoingDetailQuery(id);
  console.log(data);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 5000); 
  
    return () => clearInterval(interval);
  }, [refetch]);
  const financialDetail = () => {
      navigate(`/ongoingdetails/financialwinner/${id}`)
  }
  const handleTechnical = () => {
     navigate(`/ongoingdetails/technicallist/${id}`)
  }
  return (
    <Box  m="1.5rem 2.5rem" >
    <Header title="OnGoing Details"   />
         <Box>  {data && ( 
         <>
         <Button  onClick={handleTechnical} disabled={data[0].tech_visibility === 0} variant='outlined'  sx={{ color: '#fff' 
              }} > <Box >
                <Typography variant="h2">Technical</Typography>
                 {(data[0].tech_visibility) === 0 && (<CircularProgress color="success" />)} 
              </Box>
                 
                  { !(data[0].tech_visibility===0) ? ( <LockOpenOutlined sx={{ fontSize:"10rem"}}  />) : ( <LockOutlined sx={{ fontSize:"10rem"}}/>)} 
                 
            </Button>
            <Divider />
            <Button onClick={financialDetail} disabled={data[0].financial_visiblity === 0} variant='outlined'  sx={{ color: '#fff' 
              }} > <Box >
                <Typography variant="h2">Financial</Typography>
                 {data[0].financial_visiblity === 0 && (<CircularProgress color="success" />)} 
              </Box>
                 
                  { !(data[0].financial_visiblity ===0) ? ( <LockOpenOutlined sx={{ fontSize:"10rem"}}  />) : ( <LockOutlined sx={{ fontSize:"10rem"}}/>)} 
                 
            </Button>
         </>
           
         )}
           </Box>
      </Box>
  )
}

export default OnGoingDetail