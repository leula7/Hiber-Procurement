import React ,{ useState } from "react";
import { Box, useTheme } from "@mui/material";
import { useApproveProposalMutation, useGetCustomersQuery, useGetNonFilteredQuery } from "state/api";
import Header from "components/Header";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import TableIcon from "components/TableIcon";
import DialogView from "components/DialogView";
import { useDirectorRequestStatusMutation } from "state/api";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";


const ProposalCategory = () => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [DirectorRequestStatus ,{isLoading,isError}] = useDirectorRequestStatusMutation();
    const [approveProposal] = useApproveProposalMutation();
    const id = useSelector((state) => state.auth.user.user_id);

    const {data}=useGetNonFilteredQuery();
    const resultArray = data?.result || [];
    console.log(resultArray)

          const columns = [
        {
          field: "cata_Name",
          headerName: "Catagory Name",
          flex: 0.5,
        },
        {
          field: "total",
          headerName: "Total Price",
          flex: 0.5,
        }
      ];
     
      const handleRowSelection = () => {
        setSelectedRow(true)
      }

      const handleapprove = async () => {
        const values = {
          prop_id : 45 , 
          checked_by: id,
          status:1
        }
         const result = approveProposal(values);
          console.log(result);
      }
  return (
    <Box m="1.5rem 2.5rem">
    <Header title="Proposal Category" subtitle="List of Category Item" />
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
        getRowId={(row) => row.request_id}
        rows={resultArray || []}
        columns={columns}
        onRowClick={handleRowSelection}
        slots={{ toolbar: GridToolbar }}    
      />
  </Box>
  </Box>
  )
}

export default ProposalCategory