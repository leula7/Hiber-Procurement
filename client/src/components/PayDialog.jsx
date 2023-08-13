
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import Pay from 'pages/supplier/pay';

const DialogView = ({open,onClose, row, onAccept, onReject}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Pay</DialogTitle>
      <DialogContent>
        
      </DialogContent>
      <DialogActions>
        { onAccept && (
          <>
          <Pay />
            <Button onClick={onAccept} variant="contained" color="primary">
          Accept
        </Button>
        
          </>
        )
        }
       
      </DialogActions>
    </Dialog>
  )
}

export default DialogView