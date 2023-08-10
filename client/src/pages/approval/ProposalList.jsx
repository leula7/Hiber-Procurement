import { Box, Typography, Card, CardContent, CardMedia, CardActionArea, useTheme, LinearProgress, Button } from "@mui/material";
import AssignDialog from "components/AssignDialog.component";
import Header from "components/Header";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAssignTaskMutation, useGetOfficersQuery, useGetProposalQuery, useGetTaskQuery } from "state/api";


const ProposalList = () => {
    const theme = useTheme();
  const { data, isLoading } = useGetProposalQuery();
  const navigate = useNavigate();
  console.log(data)
  const dire_id= useSelector((state) => state.auth.user.user_id);

  const [AssignTask, { isError }] = useAssignTaskMutation();
  const [open, setOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  
  useEffect(() => {
    if (selectedCard) {
      navigate(`/proposals/details/${selectedCard}`);
    }
  }, [selectedCard,navigate]);

  const handle = (id) => {
    setSelectedCard(id)
  }
 
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Proposals" />
      <Box
        display="grid"
        gridTemplateColumns="repeat(4, 1fr)"
        gap="20px"
        sx={{ width: '100%' }}
      >
        {data || !isLoading ? (
          data.map((data) => (
            <Card key={data.prop_id} sx={{ maxWidth: 345 }}>
              <CardActionArea onClick={() => handle(data.prop_id)}>
                <CardMedia
                  component="img"
                  height="140"
                  image={`https://images.pexels.com/photos/48148/document-agreement-documents-sign-48148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Name: {data.title}
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    
                    <br />
                    status: {data.status}
                  </Typography>
                  <Typography variant="h5"></Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))
        ) : (
          <LinearProgress variant="success" />
        )}
      </Box>
    </Box>
  )
}

export default ProposalList