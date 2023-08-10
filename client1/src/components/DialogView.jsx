
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const DialogView = ({open,onClose, row, onAccept, onReject}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Row Details</DialogTitle>
      <DialogContent>
        {/* Display the row details in the dialog */}
        <p>ID: {row?.id}</p>
        <p>Name: {row?.name}</p>
        {/* Add more row details as needed */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onAccept} variant="contained" color="primary">
          Accept
        </Button>
        <Button onClick={onReject} variant="contained" color="secondary">
          Reject
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogView