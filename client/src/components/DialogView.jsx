
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const DialogView = ({open,onClose, row, onAccept, onReject}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Row Details</DialogTitle>
      <DialogContent>
        <p>ID: {row?.item_name}</p>
        <p>reason: {row?.purpose}</p>
        {row?.other_reason && (
            <p>{row?.other_reason}</p>
        )}
      </DialogContent>
      <DialogActions>
        { onAccept && (
          <>
            <Button onClick={onAccept} variant="contained" color="primary">
          Accept
        </Button>
        <Button onClick={onReject} variant="contained" color="secondary">
          Reject
        </Button>
          </>
        )
        }
       
      </DialogActions>
    </Dialog>
  )
}

export default DialogView