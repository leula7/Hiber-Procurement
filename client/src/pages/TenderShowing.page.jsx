
import { Box, Typography,Card , CardContent,CardMedia , CardActionArea ,useTheme} from "@mui/material";



const TenderCard = () => {
 const theme = useTheme();
 const handleClick = () => {
    // Function logic to be executed when the card is clicked
    console.log('Card clicked!');
  };
    return (
        
        <Box  m="1.5rem 2.5rem" >
            <Box
                display="grid"
                gridTemplateColumns="repeat(4, 1fr)"
                // gridAutoRows="140px"
                gap="20px"
                 > 
           <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={handleClick}>
        <CardMedia
          component="img"
          height="140"
          image="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29tcHV0ZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
          alt="Bid image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Bid: Computer and Related
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Details:dasda dsadasdasd
            asdasdasdsa dasdas dasdas 
          </Typography>
          <Typography variant="h5"> 
            Closing Date : May5 2023
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    
    </Box>
        </Box>
    )
}

export default TenderCard;