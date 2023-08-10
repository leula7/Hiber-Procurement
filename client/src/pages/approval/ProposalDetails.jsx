import React ,{ useEffect, useState } from "react";
import { Box, Button, useTheme } from "@mui/material";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import DialogView from "components/DialogView";
import { useApproveProposalMutation, useCheckProposalMutation, useGetDetailProposalQuery } from "state/api";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";


const Proposal = () => {
    const theme = useTheme();
    const {prop_id} = useParams();
    const {data , isLoading}= useGetDetailProposalQuery(prop_id);
    console.log(prop_id)
    // console.log(data);
    const [approveProposal] = useApproveProposalMutation();
    const id = useSelector((state) => state.auth.user.user_id);
    let idd ;
    console.log(prop_id)
    const user = useSelector((state) => state.auth.user.user_id);
    const [checkProposal ] = useCheckProposalMutation();
    const [selectedRow, setSelectedRow] = useState(null);
    const {cat_id}=useParams();
    const navigate = useNavigate()

    // useEffect(() => {
    // }, [prop_id]);

   
    const handleRowSelection = (params) => {
      setSelectedRow(params.row);
    };

    const handleapprove = async () => {
      const values = {
        prop_id : prop_id , 
        checked_by: id,
        status:1
      }
      console.log(values)
       const result = await approveProposal(values);
       toast.success(result.data.message)
        console.log(result);
    }
    const columns = [
      {
        field: "cata_Name",
        headerName: "Category Name",
        flex: 0.5,
      },
      {
        field: "total",
        headerName: "Total price",
        flex: 0.5,
      }
    ];
   
return (
  <Box m="1.5rem 2.5rem">
  <Header title="Detail Proposal" />
  <Box display="flex" justifyContent="end">
          
        </Box>
  <Box
    mt="40px"
    height="75vh"
    sx={{
      "& .MuiDataGrid-root": {
        border: "none",
      },
      "& .MuiDataGrid-cell": {
        borderBottom: "none",
      },
      "& .MuiDataGrid-columnHeaders": {
        backgroundColor: theme.palette.background.alt,
        color: theme.palette.secondary[100],
        borderBottom: "none",
      },
      "& .MuiDataGrid-virtualScroller": {
        backgroundColor: theme.palette.primary.light,
      },
      "& .MuiDataGrid-footerContainer": {
        backgroundColor: theme.palette.background.alt,
        color: theme.palette.secondary[100],
        borderTop: "none",
      },
      "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
        color: `${theme.palette.secondary[200]} !important`,
      },
    }}
  >
    <DataGrid
      loading={isLoading || !data}
      getRowId={(row) => row.cat_id}
      rows={data || []}
      columns={columns}
      onRowClick={handleRowSelection}

    />
      
    </Box>
    <Box mt="20px" display="flex" justifyContent="end" gap="10px">
      <Button  variant="contained" color="primary" onClick={handleapprove}>
          Accept
        </Button>
        <Button  variant="contained" color="secondary">
          Reject
        </Button>
    </Box>
      
    </Box>
    
  )
}

export default Proposal