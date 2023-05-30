import {Typography , Box , useTheme} from "@mui/material";
import React from 'react'

const Header = ({title, subtitle}) => {

    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light;


  return (
    <Box backgroundColor={neutralLight} >
        <Typography
            variant="h2"
            color={theme.palette.secondary[100]}
            fontWeight="bold"
            sx={{mb: "15px"}} >
                {title}
            </Typography>
        <Typography 
            variant='h5'
            color={theme.palette.secondary[100]}>
                {subtitle}
            </Typography>
    </Box>
  )
}

export default Header;