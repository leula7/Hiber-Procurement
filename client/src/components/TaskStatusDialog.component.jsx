
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const TaskStatusDialog = ({open,onClose, row, onCompleted}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Row Details</DialogTitle>
      <DialogContent>
        <p>ID: {row?.id}</p>
        <p>Name: {row?.name}</p>
      </DialogContent>
      <DialogActions>
       
            <Button onClick={onCompleted} variant="contained" color="secondary">
          Completed
          </Button>
       
      </DialogActions>
    </Dialog>
  )
}

export default TaskStatusDialog