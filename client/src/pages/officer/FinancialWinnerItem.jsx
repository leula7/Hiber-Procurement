import React, { useEffect, useState } from 'react'
import {
    Box,
    LinearProgress } from "@mui/material";
import Header from 'components/Header';
import { useTheme } from '@emotion/react';
import { useGetFinancialItemWinnerQuery, useGetFinancialWinnerQuery, useGetMyTaskQuery , useSetTaskStatusMutation} from 'state/api';
import { DataGrid } from '@mui/x-data-grid';
import TaskStatusDialog from 'components/TaskStatusDialog.component';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';


const FinancialWinnerItem = () => {
  const theme = useTheme();
  const {bidid,item_id} = useParams();
  console.log(item_id)
  const {data , isLoading} = useGetFinancialItemWinnerQuery({bidid,item_id});
    console.log(data)
    const [open, setOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const id = useSelector((state) => state.auth.user.user_id);
    const navigate = useNavigate()

    
  //   const [ setTaskStatus,  ] = useSetTaskStatusMutation();
  const handleRowSelection = (params) => {
    setSelectedRow(params.row);
  };
  
  useEffect(() => {
    }, [item_id]); 
  

  
    const columns = [
      {
        field: "item_name",
        headerName: "Item",
        flex: 0.5,
      },
      {
        field: "price",
        headerName: "Price",
        flex: 0.5,
      },
      {
        field: "FIrst_Name",
        headerName: "First Name",
        flex: 0.5,
      }
      ,
      {
        field: "Last_Name",
        headerName: "First Name",
        flex: 0.5,
      }
      ,
    
    ];
 
    return (
      <Box m="1.5rem 2.5rem">
        <Header title=" Financial Item Price History" subtitle="" />
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
            getRowId={(row) => row.bid_item_id}
            rows={data || []}
            columns={columns}
            onRowClick={handleRowSelection}
          />
         
      </Box>
      </Box>
  )
}

export default FinancialWinnerItem;