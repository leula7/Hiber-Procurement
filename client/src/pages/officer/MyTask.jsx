import React, { useState } from 'react'
import {
    Box,
    LinearProgress } from "@mui/material";
import Header from 'components/Header';
import { useTheme } from '@emotion/react';
import { useGetMyTaskQuery , useSetTaskStatusMutation} from 'state/api';
import { DataGrid } from '@mui/x-data-grid';
import TaskStatusDialog from 'components/TaskStatusDialog.component';
import { useSelector } from 'react-redux';


const MyTask = () => {
  const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const id = useSelector((state) => state.auth.user.user_id);

    
  //   const [ setTaskStatus,  ] = useSetTaskStatusMutation();
  const handleRowSelection = (params) => {
    setSelectedRow(params.row);
    setOpen(true);
  };
  const onCompleted= async (selected) => {
    // const id= selectedRow.id;
    // const status = {
    //   id:id,
    //    status:true
    // }
    // const result = await setTaskStatus(status);
    setOpen(false);
  }
  
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
    
    ];
 
    return (
      <Box m="1.5rem 2.5rem">
        <Header title=" LIST" subtitle="List of Suppliers" />
        <Box
          mt="40px"
          height="70vh"
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
         <TaskStatusDialog
          open={open}
          onClose={() => setOpen(false)}
          row={selectedRow}
          onCompleted={onCompleted}
        />
      </Box>
      </Box>
  )
}

export default MyTask;