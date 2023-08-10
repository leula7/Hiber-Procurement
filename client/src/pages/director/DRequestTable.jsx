import React ,{ useState } from "react";
import { Box, useTheme } from "@mui/material";
import { useGetCustomersQuery, useGetNonFilteredQuery } from "state/api";
import Header from "components/Header";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import TableIcon from "components/TableIcon";
import DialogView from "components/DialogView";
import { useDirectorRequestStatusMutation } from "state/api";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";


const DRequestTable = () => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [DirectorRequestStatus ,{isLoading,isError}] = useDirectorRequestStatusMutation();
    const id = useSelector((state) => state.auth.user.user_id);

    const {data}=useGetNonFilteredQuery();
    // const resultArray = data?.result || [];
    console.log(data)

    const handleRowSelection = (params) => {
        setSelectedRow(params.row);
        setOpen(true);
      };
      const handleAccept = async () => {
        const filter_req_app=  selectedRow.req_app_id;
        const values = { filter_req_app:filter_req_app,
                       user_id: id}
        console.log(values)
       const result= await DirectorRequestStatus(values);
       console.log(result)
      //  if(result.status ==='200'){
        toast.success("Approved sucessfully")
      // } else{
      //   toast.success(result.message)
      // }
                setOpen(false);
      };
      const handleReject = () => {
      
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
          headerName: "Item",
          flex: 0.5,
        },
        {
          field: "purpose",
          headerName: "Purpose",
          flex: 0.5,
        },
        {
          field: "req_status",
          headerName: "Status",
          flex: 0.5,
        },
        {
          field: "time_of_purchase",
          headerName: "Time",
          flex: 0.5,
        },
      ];
     
  return (
    <Box m="1.5rem 2.5rem">
    <Header title="REQUEST LIST" subtitle="List of Suppliers" />
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
        rows={data || []}
        columns={columns}
        onRowClick={handleRowSelection}
        slots={{ toolbar: GridToolbar }}    

      />
     <DialogView
      open={open}
      onClose={() => setOpen(false)}
      row={selectedRow}
      onAccept={handleAccept}
      onReject={handleReject}
      />
   
  </Box>
  </Box>
  )
}

export default DRequestTable