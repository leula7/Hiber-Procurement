import React, { useEffect, useState } from 'react'
import {
    Box,
    LinearProgress } from "@mui/material";
import Header from 'components/Header';
import { useTheme } from '@emotion/react';
import { 
    useGetAssignedProcurmentQuer, useGetMyTaskQuery} from 'state/api';
import { DataGrid } from '@mui/x-data-grid';
import TaskStatusDialog from 'components/TaskStatusDialog.component';
import { Navigate , useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';


const AssignedProcurment = () => {
  const theme = useTheme();
    const navigate= useNavigate();
    const [open, setOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const id = useSelector((state) => state.auth.user.user_id);
    const {data , isLoading} = useGetMyTaskQuery(id);
    const resultArray = data?.result || [];
      // console.log(resultArray)
      // const {data , isLoading} = useGetAssignedProcurmentQuer();

  const handleRowSelection = (params) => {
    setSelectedRow(params.row.cat_id);
    console.log(selectedRow)
      nav();
  };
  useEffect(() => {
    if (selectedRow) {
      navigate(`/procurment/${selectedRow}`);
    }
  }, [selectedRow,navigate]);
 const nav=( )=> {
  // const id = selectedRow.cat_id;
    // navigate(`/procurment/${id}`)

 }
 

  
    const columns = [
      {
        field: "cata_Name",
        headerName: "Category",
        flex: 0.5,
      },
      {
        field: "date",
        headerName: "Date",
        flex: 0.5,
      },
      {
        field: "task_desc",
        headerName: "description",
        flex: 1,
      }
      ,
    
    ];
 
    return (
      <Box m="1.5rem 2.5rem">
        <Header title=" ASSIGNED PROCURMENT" subtitle="List of ASSIGNED" />
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
            loading={isLoading || !data}
            getRowId={(row) => row.task_id}
            rows={resultArray || []}
            columns={columns}
            onRowClick={handleRowSelection}
          />
         {/* <TaskStatusDialog
          open={open}
          onClose={() => setOpen(false)}
          row={selectedRow}
          onCompleted={onCompleted}
        /> */}
      </Box>
      </Box>
  )
}

export default AssignedProcurment;