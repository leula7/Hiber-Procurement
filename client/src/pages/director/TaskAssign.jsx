import { Box, Typography, Card, CardContent, CardMedia, CardActionArea, useTheme, LinearProgress } from "@mui/material";
import AssignDialog from "components/AssignDialog.component";
import Header from "components/Header";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useAssignTaskMutation, useGetOfficersQuery, useGetTaskQuery } from "state/api";

const TaskAssign = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetOfficersQuery();
  const dire_id= useSelector((state) => state.auth.user.user_id);

  const resultArray = data?.result || [];
  console.log(resultArray);
  const [AssignTask, { isError }] = useAssignTaskMutation();
  const [open, setOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleClick = (id) => {
    setSelectedCard(id);
    setOpen(true);
  };
  const handleAssign = async (values) => {

    const emp_id =selectedCard
    const task_desc= "Yalchale"
    values.task_desc=task_desc;
    values.emp_id =emp_id;
    values.dire_id=dire_id;
    console.log(values)
    const result=await AssignTask(values);
    console.log(result);
    if(result.data.status === "200") {
      toast.success("Category Assigned")
    }
   
   setOpen(false);
  }
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="TASKS" subtitle="See your list of Tasks." />

      <Box
        display="grid"
        gridTemplateColumns="repeat(4, 1fr)"
        gap="20px"
        sx={{ width: '100%' }}
      >
        {resultArray || !isLoading ? (
          resultArray.map((data) => (
            <Card key={data.user_id} sx={{ maxWidth: 345 }}>
              <CardActionArea onClick={() => handleClick(data.user_id)}>
                <CardMedia
                  component="img"
                  height="140"
                  image={`https://robohash.org/${data.user_id}test?200x200`}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Name: {data.First_Name}
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    Current task:
                    <br />
                    status:
                  </Typography>
                  <Typography variant="h5"></Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))
        ) : (
          <LinearProgress variant="success" />
        )}
      </Box>
      <AssignDialog open={open} onClose={() => setOpen(false)} rowData={selectedCard} onAssign={handleAssign} />
    </Box>
  );
};

export default TaskAssign;
