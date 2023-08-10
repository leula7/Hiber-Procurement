import React, { useEffect, useState } from "react";
import { Box, useTheme } from "@mui/material";
import { useGetCustomersQuery } from "state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import TableIcon from "components/TableIcon";
import DialogView from "components/DialogView";
import EditDialog from "components/EditDialog";
import DeleteDialog from "components/DeleteDialog";
import { approves } from "api/Assistant";
import { useSelector } from "react-redux";

const Table = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const [requests, setRequests] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const approved = await approves(user.user_id);
        setRequests(approved.data.approved);
        setColumns([
          { field: "request_id", headerName: "Request ID", flex: 1 },
          { field: "branch_name", headerName: "Branch Name", flex: 1 },
          { field: "user_id", headerName: "User ID", flex: 1 },
          {
            field: "actions",
            headerName: "Actions",
            type: "actions",
            width: 150,
            renderCell: (params) => (
              <TableIcon handledelete={handleDelete} {...params} />
            ),
          },
        ]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [user.user_id]);

  const handleRowSelection = (params) => {
    // setSelectedRow(params.row);
    setOpenDeleteDialog(true);
  };

  const handleAccept = () => {
    setOpen(false);
  };

  const handleReject = () => {
    setOpen(false);
  };

  const handleSave = (editedData) => {
    console.log("Edited data:", editedData);
  };

  const handleDelete = () => {
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = () => {
    console.log("Deleting row:", selectedRow);
    setOpenDeleteDialog(false);
  };

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
          getRowId={(row) => row.request_id} 
          rows={requests}
          columns={columns}
          onRowClick={handleRowSelection}
        />
        {/* <DeleteDialog
          open={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
          onDelete={handleDeleteConfirm}
        /> */}
        <DialogView 
        open={ openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}

         />
      </Box>
    </Box>
  );
};

export default Table;
