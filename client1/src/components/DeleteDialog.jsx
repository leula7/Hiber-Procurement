import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const DeleteDialog = ({ open, onClose, onDelete }) => {

  const handleDelete = () => {
    onDelete();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Row</DialogTitle>
      <DialogContent>
        <p>Are you sure you want to delete this row?</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDelete} variant="contained" color="primary">
          Delete
        </Button>
        <Button onClick={onClose} variant="contained" color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
