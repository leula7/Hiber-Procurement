
import { AddCircleOutlineOutlined } from "@mui/icons-material";
import { Box, Typography,Card , CardContent,CardMedia , CardActionArea ,useTheme, Fab, Button, LinearProgress, Skeleton} from "@mui/material";
import AddProposalDialog from "components/AddProposalDialog";
import GenerateProposalDialog from "components/GenerateProposalDialog";
import Header from "components/Header";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGenerateProposalMutation , useGetProposalQuery,useAddProposalMutation} from "state/api";



const SpecificProposal = () => {

  const navigate= useNavigate();
  const [selectedRow, setSelectedRow] = useState(null);
  const {data,isLoading} = useGetProposalQuery();
  console.log(data)
  const id = useSelector((state) => state.auth.user.user_id);

 const theme = useTheme();
 const handleClick = (id) => {
    navigate(`/proposals/details/${id}`)
    console.log('Card clicked');
  };

   const handleAdd = async (values) => {
   }
  // const handleSubmit = async(values)=>{
  //   const id =selectedRow.id
  //   values.id =id
   
  // }

    return (
        
        <Box  m="1.5rem 2.5rem" >
          <Header title="Proposal Details"  />
          <Box display="flex" justifyContent="end">
 
          </Box>
            <Box
                display="grid"
                gridTemplateColumns="repeat(4, 1fr)"
                // gridAutoRows="140px"
                gap="20px"
                 > 
                 {data && (
                  <>
                   {data || !isLoading ? (
                  data.map((data) => (
                    <Card key={data.prop_id} sx={{ maxWidth: 345 }}>
                      <CardActionArea onClick={() => handleClick(data.prop_id)}>
                        <CardMedia
                          component="img"
                          height="140"
                          image="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29tcHV0ZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
                        />
                        {!isLoading && (
                            <Skeleton variant="rectangular" width={210} height={60} />
                        )}
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            Name: {data.title}
                          </Typography>
                          {!isLoading && (
                            <Skeleton variant="rectangular" width={210} height={80} />
                        )}
                          <Typography variant="h6" color="text.secondary">
                            Status: {data.status}
                            <br />
                            Total Price:{ data.total_price}
                          </Typography>
                          <Typography variant="h5"></Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  ))
                ) : (
                  <LinearProgress variant="success" />
                )}
                  </>
                 )} 
            
    </Box>
        </Box>
    )
}

export default SpecificProposal;