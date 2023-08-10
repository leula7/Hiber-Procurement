import { useTheme } from '@emotion/react';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Header from 'components/Header';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useGetTechnicalListQuery } from 'state/api';

const TechnicalList = () => {
 const theme = useTheme();
    const [open, setOpen] = useState(false);
    const {bidid} = useParams();
    const [selectedRow, setSelectedRow] = useState(null);
    const navigate= useNavigate();
    const {data , isLoading} = useGetTechnicalListQuery(bidid);
    console.log(data)

   useEffect(() => {
    console.log("rowing: ",selectedRow)
    if (selectedRow && selectedRow.tech_setatus === 1) {
      navigate(`/ongoingdetails/technicallist/detail/${bidid}/${selectedRow.bid_participate_id}`, {
        state: { file_names: selectedRow.file_name,username: selectedRow.username  }
      });
    }
  }, [selectedRow,navigate,bidid]);
  
  const handleRowSelection = (params) => {
    setSelectedRow(params.row);
    console.log(":Sekected : row: ",params.row)
  };
  
    const columns = [
      {
        field: "First_Name",
        headerName: "First Name",
        flex: 0.5,
      },
      {
        field: "Last_Name",
        headerName: "Last Name",
        flex: 0.5,
      },
    ];
 
    return (
      <Box m="1.5rem 2.5rem">
        <Header title=" Technical List" subtitle="" />
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
          }}>
          <DataGrid
            loading={isLoading || !data}
            getRowId={(row) => row.bid_participate_id}
            rows={data || []}
            columns={columns}
            onRowClick={handleRowSelection}
          />
        
      </Box>
      </Box>
  )
}

export default TechnicalList