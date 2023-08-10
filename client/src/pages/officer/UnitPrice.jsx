import React ,{ useState } from "react";
import { Box, useTheme } from "@mui/material";
import { useGetCustomersQuery, useGetItemsQuery } from "state/api";
import Header from "components/Header";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import TableIcon from "components/TableIcon";
import DialogView from "components/DialogView";
import { useSetUnitPriceMutation } from "state/api";
import SetPriceDialog from "components/SetPriceDialog";
import { toast } from "react-toastify";

const UnitPrice = () => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const {data,isLoading} = useGetItemsQuery();
    // console.log(data)
    // const resultArray = data?.result || [];
    // console.log(resultArray)
    const [SetUnitPrice] = useSetUnitPriceMutation();
    const handleRowSelection = (params) => {
        setSelectedRow(params.row);
        setOpen(true);
      };
      const handleSubmit = async(values)=>{
        const item_id =selectedRow.item_id;
        values.item_id=item_id
      
       console.log(values)
       const result=await SetUnitPrice(values)
       if(result.data.error==='200'){
        toast.success(result.data.message)
       } else if (result.data.error === "400") {
        toast.error(result.data.message)
       }
       console.log(result)
       setOpen(false)
      }
      const columns = [
        {
          field: "item_name",
          headerName: "Item Name",
          flex: 0.5,
        },
        {
          field: "price",
          headerName: "Price",
          flex: 0.5,
        },
        {
          field: "cata_Name",
          headerName: "Category",
          flex: 1,
        }

      ];
      const dataa = [{
        id:1,
        name:"esepe",
        email:'mu"j"ij'
    },
    {
        id:2,
        name:"zeborte",
        email:'mu"j"ij'
    
    }]

  return (
    <Box m="1.5rem 2.5rem">
    <Header title="ITEM LIST" subtitle="List of Items" />
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
        rows={data || []}
        columns={columns}
        onRowClick={handleRowSelection}
        slots={{ toolbar: GridToolbar }}    

      />
     <SetPriceDialog
      open={open}
      onClose={() => setOpen(false)}
      row={selectedRow}
      handleFormSubmit={handleSubmit}
      />
   
  </Box>
  </Box>
  )
}

export default UnitPrice