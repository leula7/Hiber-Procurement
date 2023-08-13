import React ,{ useState } from "react";
import { Box, Button, useTheme } from "@mui/material";
import { useAddEmployeeMutation, useGetCustomersQuery, useGetEmployeeQuery, useGetNonFilteredQuery, useInsertEmployeeMutation } from "state/api";
import Header from "components/Header";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import TableIcon from "components/TableIcon";
import DialogView from "components/DialogView";
import { useDirectorRequestStatusMutation } from "state/api";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import AddEmployee from "components/AddEmployee";


const Employee = () => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [openForm, setOpenForm] = useState(false);

    const [selectedRow, setSelectedRow] = useState(null);
    const [DirectorRequestStatus ,{isLoading,isError}] = useDirectorRequestStatusMutation();
    const id = useSelector((state) => state.auth.user.user_id);
<<<<<<< HEAD
=======
    const token = useSelector((state) => state.auth.user.token);
>>>>>>> remove
    const {data } = useGetEmployeeQuery();
    const [InsertEmployee ] = useInsertEmployeeMutation();
    // const resultArray = data?.result || [];
    console.log(data)

    const AddClick = ()=>{
        setOpenForm(true);
    }
<<<<<<< HEAD
=======
    
>>>>>>> remove
    const handleSubmit = async (values, onSubmitProps) => {
        try {
          console.log(values)
          values.password =  Math.random().toString(36).substring(2);
          values.username =  Math.random().toString(36).substring(2);

          const result = await InsertEmployee(values);
          const loggedInUser = result.data;
          console.log(loggedInUser) // Retrieve the data property
          if (loggedInUser.error === '200') {
            toast.success(loggedInUser.message)
          } else if (loggedInUser.error === '400') {
            toast.error(loggedInUser.message)
          }
          setOpenForm(false)
        } catch (error) {
          
          // console.error('Login failed:', ge);
          // if (error) {
          //   toast.error('Invalid username or password!');
          // } else if (error.response && error.response.status === 501) {
          //   toast.error('Server error: Not Implemented');
          // } else {
          //   toast.error('An error dfsdfsdf occurred!');
          //}
        }
      };
    const handleRowSelection = (params) => {
        setSelectedRow(params.row);
        setOpen(true);
      };
<<<<<<< HEAD
      const handleAccept = async () => {
        const filter_req_app=  selectedRow.req_app_id;
        const values = { filter_req_app:filter_req_app,
                       user_id: id}
=======

      const handleAccept = async () => {
        const filter_req_app=  selectedRow.req_app_id;
        const values = { filter_req_app:filter_req_app,
                       user_id: id,token: token}
>>>>>>> remove
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
          field: "First_Name",
          headerName: "First Name",
          flex: 0.5,
        },
        {
          field: "Last_Name",
          headerName: "Last Name",
          flex: 0.5,
        },
        {
          field: "position",
          headerName: "Position",
          flex: 0.5,
        }
      ];
     
  return (
    <Box m="1.5rem 2.5rem">
    <Header title="Employee List" />
    <Box display="flex" justifyContent="end">
            <Button variant="cotained" color="primary" onClick={AddClick} >
                Add Employee
            </Button>
          </Box>
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
        getRowId={(row) => row.user_id}
        rows={data || []}
        columns={columns}
        onRowClick={handleRowSelection}
        slots={{ toolbar: GridToolbar }}    

      />
   
    <AddEmployee 
    open={openForm}
    onClose={() => setOpenForm(false)}
    handleFormSubmit={handleSubmit}
    />
  </Box>
  </Box>
  )
}

export default Employee