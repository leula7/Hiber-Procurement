import React ,{ useState } from "react";
import { Box, useTheme } from "@mui/material";
import { useGetCustomersQuery } from "state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import TableIcon from "components/TableIcon";
import DialogView from "components/DialogView";
import EditDialog from "components/EditDialog";
import DeleteDialog from "components/DeleteDialog";


const Table = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
//   const { data, isLoading } = useGetCustomersQuery();
const handleRowSelection = (params) => {
  setSelectedRow(params.row);
  setOpenDeleteDialog(true);
};
const handleAccept = () => {
  // Implement your accept logic here
  setOpen(false);
};
const handleReject = () => {
  // Implement your reject logic here
  setOpen(false);
};
const handleSave = (editedData) => {
  // Update the row data or perform save logic
  console.log('Edited data:', editedData);
};
const handleDelete = () => {
  // Delete the row logic
  setOpenDeleteDialog(true);
};
const handleDeleteConfirm = () => {
  // Delete the row logic
  console.log('Deleting row:', selectedRow);
  setOpenDeleteDialog(false);
};
const data = [{
    id:1,
    name:"esepe",
    email:'mu"j"ij'
},
{
    id:2,
    name:"zeborte",
    email:'mu"j"ij'

}]
  console.log(data);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    }
    ,
    {
        field: "actions",
        headerName: "Actions",
       type:'actions',
       width:150,
       renderCell: (params) =>(
        <TableIcon handledelete={handleDelete} {...{params}} />
       )
      }
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="SUPPLIER LIST" subtitle="List of Suppliers" />
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
        //   loading={isLoading || !data}
          getRowId={(row) => row.id}
          rows={data || []}
          columns={columns}
          onRowClick={handleRowSelection}
        />
       {/* <DialogView
        open={open}
        onClose={() => setOpen(false)}
        row={selectedRow}
        onAccept={handleAccept}
        onReject={handleReject}
      /> */}
      {/* <EditDialog
        open={open}
        onClose={() => setOpen(false)}
        rowData={selectedRow}
        onSave={handleSave}
      /> */}
       <DeleteDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onDelete={handleDeleteConfirm}
      />
    </Box>
    </Box>
  );
};

export default Table;