import React ,{ useState } from "react";
import { Box, useTheme } from "@mui/material";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { useGetAsRequestQuery } from "state/api";
import DialogView from "components/DialogView";
import { useSelector } from "react-redux";



const AsRequestTable = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const id = useSelector((state) => state.auth.user.user_id);
  console.log (id)
  const {data , isLoading} = useGetAsRequestQuery(id);
  const resultArray = data?.result || [];
  console.log(resultArray)
const handleRowSelection = (params) => {
  setSelectedRow(params.row);
  setOpen(true);
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
      headerName: "Time",
      flex:  0.5,
    }
    ,
    {
      field: "title_of_post",
      headerName: "Title",
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
      <Header title=" List of Requests" subtitle="" />
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
      />
    </Box>
    </Box>
  );
};

export default AsRequestTable;