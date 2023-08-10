
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const GenerateProposalDialog = ({open,onClose, row, onGenerate}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Row Details</DialogTitle>
      <DialogContent>
        <p>ID: {row?.id}</p>
        <p>Name: {row?.name}</p>
      </DialogContent>
      <DialogActions>
        { row && (
          <>
           
          </>
        )
        }
        <Button onClick={onGenerate} variant="contained" color="primary">
          Generate
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default GenerateProposalDialog