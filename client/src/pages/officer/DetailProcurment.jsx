import React, { useState } from 'react'
import {
    Box,
    Button,
    LinearProgress } from "@mui/material";
import Header from 'components/Header';
import { useTheme } from '@emotion/react';
import { 
    useGetAssignedByCategoryQuery,useGenerateBidMutation} from 'state/api';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import TaskStatusDialog from 'components/TaskStatusDialog.component';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';


const DetailProcurment = () => {
  const theme = useTheme();
  const { id } = useParams();
    const [open, setOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const {data , isLoading} = useGetAssignedByCategoryQuery(id);
    console.log(data)
    const resultArray = data?.result || [];
    const user_id = useSelector((state) => state.auth.user.user_id);

    // console.log(resultArray)
    const [GenerateBid] = useGenerateBidMutation();
    const handleRowSelection = (params) => {
      setSelectedRow(params.row);
    };
  

   const handle = async() => {
    console.log("Result ",resultArray);
    const cat_id = resultArray[0].cat_id;
    const prop_id= resultArray[0].prop_id;
      const values = {
        user_id:user_id,
        cat_id:cat_id,
        prop_id:prop_id,
      }
      const result=await GenerateBid(values);
      console.log("Jase: ",result.data)
      if (result.data.message){
        toast.success("result.data.message")
      } else {
        // toast.error(result.error.data.error)
      }
   }
    const columns = [
      {
        field: "item_name",
        headerName: "Item",
        flex: 1,
      },
      {
        field: "quantity",
        headerName: "Quantity",
        flex: 0.5,
      },
      
    ];
 
    return (
      <Box m="1.5rem 2.5rem">
        <Header title="ASSIGNED PROCURMENT" subtitle="List of ASSIGNED" />
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
            getRowId={(row) => row.item_id}
            rows={resultArray || []}
            columns={columns}
            onRowClick={handleRowSelection}
            slots={{ toolbar: GridToolbar }}    
          />
          
         <Button onClick={handle} variant="contained" color="secondary">
            Generate Bid
         </Button> 
      </Box>
      </Box>
  )
}

export default DetailProcurment;