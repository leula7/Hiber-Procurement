import  { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { useGetCustomersQuery, useGetRequestManagerQuery, useManagerRequestRejectMutation, useManagerRequestStatusMutation } from "state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import TableIcon from "components/TableIcon";
import DialogView from "components/DialogView";
import EditDialog from "components/EditDialog";
import DeleteDialog from "components/DeleteDialog";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const MaRequestTable = () => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [ManagerRequestStatus, { isLoading: isLoginLoading, isError: isLoginError }] = useManagerRequestStatusMutation();
    const id = useSelector((state) => state.auth.user.user_id);
    const [ManagerRequestReject] = useManagerRequestRejectMutation();
    const branch_id = useSelector((state) => state.auth.user.branch_id);
    const { data, isLoading } = useGetRequestManagerQuery(branch_id);
    console.log(data)
    const resultArray = data?.result || [];
    console.log(resultArray)
  const handleRowSelection = (params) => {
    setSelectedRow(params.row);
    setOpen(true);
  };

  const handleAccept = async () => {
    const requestId=  selectedRow.req_app_id;
    const status = { requestId:requestId,
    user_id: id}
    console.log(status)
    const result=await ManagerRequestStatus(status)
    console.log(result)
    if(result.data.error === '400'){
      toast.error(result.data.message)
    } else if (result.data.error === '200'){
      toast.success(result.data.message)
    }
    setOpen(false);
  };
  const handleReject = async() => {
    const requestId=  selectedRow.req_app_id;
    const status = { requestId:requestId,
    user_id: id}
    const result= await ManagerRequestReject(status)    
    if(result.data.error === '400'){
      toast.error(result.data.message)
    } else if (result.data.error === '200'){
      toast.success(result.data.message)
    }
    setOpen(false);
  };

  const columns = [
    {
      field: "branch_name",
      headerName: "Branch",
      flex: 0.5,
    },
    {
      field: "item_name",
      headerName: "Item Name",
      flex: 0.5,
    },
    {
      field: "time_of_purchase",
      headerName: "Time of Purchase",
      flex:  0.5,
    }
    ,
    {
      field: "other_reason",
      headerName: "Reason",
      flex:  0.5,
    }
    ,
    {
      field: "purpose",
      headerName: "Purpose",
      flex:  0.5,
    }
    ,
    {
      field: "req_status",
      headerName: "Status",
      flex:  0.5,
    }
  
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title=" LIST" subtitle="List of Suppliers" />
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
        />
       <DialogView
        open={open}
        onClose={() => setOpen(false)}
        row={selectedRow}
        onAccept={handleAccept}
        onReject={handleReject}
      />
    </Box>
    </Box>  )
}

export default MaRequestTable;