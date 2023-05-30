import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";
import FlexBetween from "components/FlexBetween";
import hibre from 'assets/Hibret-bank-logo.jpg'


const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box  width="100%"  height="100%" backgroundColor={theme.palette.background.paper}>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.default}
        p="1rem 6%"
        textAlign="center"
      >
        <FlexBetween marginLeft="30%" color={theme.palette.secondary.default}>
                <Box  justifyContent="space-around" display="flex" alignItems="center" gap="0.5rem">
                  <Box 
                component="img"
                alt="profile"
                src={hibre}
                height="52px"
                width="52px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
        <Typography fontWeight="bold" fontSize="32px" >
          Hiber Procurnment
        </Typography>
        </Box>
        </FlexBetween>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.default}
      >
        <Typography align="center" fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to Hiber!
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
