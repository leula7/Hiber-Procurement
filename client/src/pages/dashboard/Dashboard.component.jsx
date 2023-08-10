import { Box, useTheme } from '@mui/material'
import Header from 'components/Header'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useGetManagerTotalApproveRequestQuery, useGetManagerTotalBranchRequestQuery, 
          useGetManagerTotalPendingRequestQuery, useGetMarketTotalRequestQuery, 
          useGetTotalApprovesRequestQuery, useGetTotalPendingRequestQuery, 
          useGetTotalRequestQuery, useGetTotalTaskQuery } from 'state/api';
import jwt_decode from 'jwt-decode'; 

const Dashboard = () => {
  const {token} = useSelector((state)=>state?.auth.user);
  const [user,setUser] = useState(null);
  
    useEffect(()=>{
      try {
        // Decode the JWT to get the user information
        const jwtPayload = token.split('.')[1];
        const decodedJwt = JSON.parse(atob(jwtPayload));
        setUser(decodedJwt);
      } catch (error) {
        console.log("🚀 ~ file: Dashboard.component.jsx:22 ~ useEffect ~ error: encoding JWT", error)
      }
    },[token]);

  const totalRequest = useGetTotalRequestQuery(user?.user_id)
  const totalPendingRequest = useGetTotalPendingRequestQuery(user?.user_id);
  const totalApproveRequest = useGetTotalApprovesRequestQuery(user?.user_id);
  
  const getManagerTotalApproveRequest = useGetManagerTotalApproveRequestQuery(user?.branch_id);
  const getManagerTotalPendingRequest =useGetManagerTotalPendingRequestQuery(user?.branch_id);
  const getManagerTotalBranchRequest = useGetManagerTotalBranchRequestQuery(user?.branch_id);

  const getTotalTask =useGetTotalTaskQuery(user?.user_id);
  const getTotalRequest = useGetMarketTotalRequestQuery();

  const theme = useTheme();

  return (
     <Box m="1.5rem 2.5rem">
      <Header title="DASHBOARD"  />
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px">
          <Box gridColumn="span 3"
            backgroundColor={theme.palette.background.alt}
            display="flex"
            alignItems="center"
            justifyContent="center">
           
              {(() => {
                  try {
                    if (user?.position === 'assistant') {
                      return 'Total Requests: '+ totalRequest?.data.total_request
                    } else if (user?.position === 'marketofficer') {
                      return 'Total Tasks: '+ getTotalTask?.data.tasks
                    } else if (user?.position === 'manager') {
                      return 'Total Branch Request: '+ getManagerTotalBranchRequest?.data.total_count
                    } else if (user?.position === 'supplier') {
                      
                    } else if(user?.position === 'director'){
                      
                    }
                  } catch (error) {
                    console.log("🚀 ~ file: Dashboard.component.jsx:67 ~ Dashboard ~ error:", error)
                  }
              })()}
          </Box>
         
          <Box gridColumn="span 3"
              backgroundColor={theme.palette.background.alt}
              display="flex"
              alignItems="center"
              justifyContent="center" >
            
            {(() => {
                try {
                  if (user?.position === 'assistant') {
                    return 'Pending Requests: '+ totalPendingRequest?.data.total_request
                  } else if (user?.position === 'marketofficer') {
                    return 'Total Requests: '+ getTotalRequest?.data.total_request
                  } else if (user?.position === 'manager') {
                    return 'Total Pending Requests: '+ getManagerTotalPendingRequest?.data.total_count
                  } else if(user?.position === 'director'){
                    
                  }else if (user?.position === 'supplier') {
                    
                  }
                } catch (error) {
                  console.log("🚀 ~ file: Dashboard.component.jsx:92 ~ Dashboard ~ error:", error)  
                }
              })()}
          </Box>
        
          <Box gridColumn="span 3"
              backgroundColor={theme.palette.background.alt}
              display="flex"
              alignItems="center"
              justifyContent="center">
         
          {(() => {
                try {
                  if (user?.position === 'assistant') {
                    return 'Total Approved Requests: '+ totalApproveRequest?.data.total_request
                  } else if (user?.position === 'marketofficer') {
                    
                  } else if (user?.position === 'manager') {
                    return 'Total Approved Requests: '+ getManagerTotalApproveRequest?.data.total_count
                  } else if(user?.position === 'director'){
                    
                  }else if (user?.position === 'manager') {
                    
                  }
                } catch (error) {
                  console.log("🚀 ~ file: Dashboard.component.jsx:117 ~ Dashboard ~ error:", error)
                }
              })()}
          </Box>
      </Box>
     </Box>
  )
}

export default Dashboard