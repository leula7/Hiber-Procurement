
import { AddCircleOutlineOutlined } from "@mui/icons-material";
import { Box, Typography,Card , CardContent,CardMedia , CardActionArea ,useTheme, Fab, Button, LinearProgress} from "@mui/material";
import AddProposalDialog from "components/AddProposalDialog";
import GenerateProposalDialog from "components/GenerateProposalDialog";
import Header from "components/Header";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useGenerateProposalMutation , useGetProposalQuery,useAddProposalMutation} from "state/api";



const OfficerProposal = () => {

  const [open, setOpen] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const id = useSelector((state) => state.auth.user.user_id);

  const [selectedRow, setSelectedRow] = useState(null);
  const [GenerateProposal] = useGenerateProposalMutation();
  const {data,isLoading} = useGetProposalQuery();
  console.log(data)
  const [AddProposal] = useAddProposalMutation();


 const theme = useTheme();
 const handleClick = () => {
    // Function logic to be executed when the card is clicked
    const values = {generated: true};
    // GenerateProposal(values)
    console.log('Card clicked!');
    setOpen(true);
  };

   const handleAdd = async (values) => {
    setOpenAdd(true)
   }
  // const handleSubmit = async(values)=>{
  //   const id =selectedRow.id
  //   values.id =id
   
  // }
  const handlegenerate = async () => {
    const values = { user_id : id}
       const result = await GenerateProposal(values);
       console.log(result)

  }
    return (
        
        <Box  m="1.5rem 2.5rem" >
          <Header title="PROPOSAL"  />
          <Box display="flex" justifyContent="end">
            <Button variant="cotained" onClick={handlegenerate}>
              Generate Proposal
            </Button>
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
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            Name: {data.title}
                          </Typography>
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
                
    <GenerateProposalDialog
       open={open}
       onClose={() => setOpen(false)}
       row={selectedRow}
       onGenerate={handleClick}
    />
    <AddProposalDialog
     open={openAdd}
     onClose={() => setOpenAdd(false)}
     onGenerate={handleAdd}
    />
    </Box>
        </Box>
    )
}

export default OfficerProposal;