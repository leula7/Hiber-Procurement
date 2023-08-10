
import { AddCircleOutlineOutlined } from "@mui/icons-material";
import { Box, Typography,Card , CardContent,CardMedia , CardActionArea ,useTheme, Fab, Button, Menu, MenuItem, Skeleton, LinearProgress} from "@mui/material";
import AddProposalDialog from "components/AddProposalDialog";
import FinancialDate from "components/FinancialDate";
import GenerateProposalDialog from "components/GenerateProposalDialog";
import Header from "components/Header";
import SetDeadlLine from "components/SetDeadLine";
import UploadDoc from "components/UploadDocDialog";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useGenerateProposalMutation , useGetProposalQuery,useAddProposalMutation, useUpdateTenderMutation, useGetBidQuery, useUploadDocMutation, useUploadDocmentMutation} from "state/api";



const Tender = () => {

  const [openSetDeadline, setOpenSetDeadline] = useState(false);
  const [openSetFinancial, setOpenSetFinancial] = useState(false);

  const [openUploadDoc, setOpenUploadDoc] = useState(false);
  const id = useSelector((state) => state.auth.user.user_id);
  const {data , isLoading} = useGetBidQuery(id);
  // console.log(data)
  const [selectedRow, setSelectedRow] = useState(null);
  const [GenerateProposal] = useGenerateProposalMutation();
  const [AddProposal] = useAddProposalMutation();
  const [UpdateTender]= useUpdateTenderMutation();
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
   const theme = useTheme();
  const [UploadDocument] = useUploadDocmentMutation();
  const handleClick = (event,values) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(values)
    console.log(selectedRow)
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeadline= ()=> {
    setOpenSetDeadline(true);
    setAnchorEl(false)
  }
  const handleUploadClick= ()=>{
    setOpenUploadDoc(true)
    setAnchorEl(false)
  }
  const handleFinancial = () => {
    setOpenSetFinancial(true);
    setAnchorEl(false)
  }
//deadline
  const handleDeadLineSubmite = async (values) => {
    console.log(values)
    const id =selectedRow
    values.bid_id =id

   console.log(values);
     const result = await UpdateTender(values)
       if(result.data.message) {
        toast.success("Sucussfull")
       }
        // console.log(result);
   setOpenSetDeadline(false);
  }

  const handleFinancialDate = async (values) => {
    console.log(values)
    const id =selectedRow
    values.bid_id =id
    // const [date, time] = values.Price.split('T');
    // values.deadline_date=date
    // values.deadline_time=time
   console.log(values);
     const result = await UpdateTender(values)
     if(result.data.message) {
      toast.success("Sucussfull")
     }
        console.log(result);
   setOpenSetFinancial(false)
  }
  
  const handleUpload= async (values) => {
    const id =selectedRow
    const formData = new FormData();
      for (let value in values) {
        formData.append(value, values[value]);
      }
      formData.append("filePath", values.file.name);
      formData.append("bid_id",id)
      console.log(formData)
      const result = await UploadDocument(formData);
      console.log(result)
  }

  const handlepublish = async () => {
    const id =selectedRow
    console.log(id)
    const values={
      bid_id:id,
      publish:1
    }
     const result = await UpdateTender(values)
    console.log(result)
    toast.success("succesfuly")
    setAnchorEl(null)
  }

    return (
        
        <Box  m="1.5rem 2.5rem" >
          <Header title="Tender"  />
           
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
           <Card key={data.bid_id} sx={{ maxWidth: 345 }}>
        
      <CardActionArea onClick={(event) => handleClick(event, data.bid_id)}>
        <CardMedia
          component="img"
          height="140"
          image="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29tcHV0ZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
          alt="Bid image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
           Tender for Year 2023 Computer
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Details:{data.date}
          </Typography>
          <Typography variant="h5"> 
           Status : on going
          </Typography>
        </CardContent>
      </CardActionArea>
            </Card>
            ))
            ) : (
              <LinearProgress variant="success" />
            )}
              </>
              )} 
            <UploadDoc
              open={openUploadDoc}
              onClose={() => setOpenUploadDoc(false)}
              row={selectedRow}
              handleFormSubmit={handleUpload}
            />
            <SetDeadlLine
                open={openSetDeadline}
                onClose={() => setOpenSetDeadline(false)}
                row={selectedRow}
                handleFormSubmit={handleDeadLineSubmite}
            />
              <FinancialDate
                open={openSetFinancial}
                onClose={() => setOpenSetFinancial(false)}
                row={selectedRow}
                handleFormSubmit={handleFinancialDate}
            />
            </Box>
    <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleDeadline}>Set Deadline Date </MenuItem>
        <MenuItem onClick={handleUploadClick}>Uplode Bid Doc</MenuItem>
        <MenuItem onClick={handleFinancial}>Set Financial Opening</MenuItem>
        <MenuItem onClick={handlepublish}>Publish</MenuItem>

      </Menu>

        </Box>
          // const register = async (values, onSubmitProps) => {
          //   // this allows us to send form info with image
          //   const formData = new FormData();
          //   for (let value in values) {
          //     formData.append(value, values[value]);
          //   }
          //   formData.append("picturePath", values.picture.name);
        
          //   const savedUserResponse = await fetch(
          //     "http://localhost:3001/auth/register",
          //     {
          //       method: "POST",
          //       body: formData,
          //     }
          //   );
          //   const savedUser = await savedUserResponse.json();
          //   onSubmitProps.resetForm();
        
          //   if (savedUser) {
          //     setPageType("login");
          //   }
          // };

    )
}

export default Tender;