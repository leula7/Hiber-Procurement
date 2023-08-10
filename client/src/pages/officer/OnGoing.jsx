
import { Box, Typography,Card , CardContent,CardMedia , CardActionArea ,useTheme,Menu, MenuItem, LinearProgress, CircularProgress} from "@mui/material";
import Header from "components/Header";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {  useGetOnGoingQuery, useGetTenderQuery, useTenderRegisterMutation} from "state/api";



const OnGoing = () => {

  const [selectedRow, setSelectedRow] = useState(null);
  const id= useSelector((state) => state.auth.user.user_id);

  const {data,isLoading,refetch}= useGetOnGoingQuery(id);
  // console.log(data)
  const navigate = useNavigate();
  const handleClick = (id) => {
    setSelectedRow(id)
    navigate(`/ongoingdetails/${id}`)
  };
 
  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 5000);
  
    return () => clearInterval(interval);
  }, [refetch]);

    return (
     
    
        <Box  m="1.5rem 2.5rem" >
          <Header title="On Going Tender"  />
            <Box
                display="grid"
                gridTemplateColumns="repeat(4, 1fr)"
                // gridAutoRows="140px"
                gap="20px"
                 >  {data && (
        <>
         {data || !isLoading ? (
        data.map((data) => (
           <Card key={data.bid_id} sx={{ maxWidth: 345 }}>
        
      <CardActionArea disabled={data.tech_visibility === 0} onClick={(event) => handleClick(data.bid_id)}>
        {data.tech_visibility === 0 ? (
         <CircularProgress color="success" />
        ): (
           <CardMedia
          component="img"
          height="140"
          image="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29tcHV0ZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
          alt="Bid image"
        />
        )}  
        
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
           Tender for Year 2023 Computer  
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Details:
          </Typography>
          <Typography variant="h5"> 
           Status : on going <br /> not registered
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    ))
            ) : (
              <>
              <LinearProgress variant="success" />
              <CircularProgress />
              </>
            )}
              </>
              )} 
    </Box>
        </Box>
        
    )
}

export default OnGoing;