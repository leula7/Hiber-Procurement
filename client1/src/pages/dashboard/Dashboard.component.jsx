import { Box, useTheme } from '@mui/material'
import Header from 'components/Header'
import React from 'react'

const Dashboard = () => {

  const theme = useTheme();

  return (
     <Box m="1.5rem 2.5rem">
      <Header title="DASHBOARD"  />
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        <Box
          gridColumn="span 3"
          backgroundColor={theme.palette.background.alt}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          Total
          </Box>
          <Box
          gridColumn="span 3"
          backgroundColor={theme.palette.background.alt}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          Total
          </Box>
          <Box
          gridColumn="span 3"
          backgroundColor={theme.palette.background.alt}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          Total
          </Box>
          <Box
          gridColumn="span 3"
          backgroundColor={theme.palette.background.alt}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          Total
          </Box>
     </Box>
     </Box>
  )
}

export default Dashboard