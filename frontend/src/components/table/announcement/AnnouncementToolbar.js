import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Toolbar, Typography, OutlinedInput, InputAdornment, Button } from '@mui/material';
// component
import Iconify from '../../table/iconify';

// ----------------------------------------------------------------------

const StyledRoot = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


// ----------------------------------------------------------------------


export default function AnnouncementToolbar() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <StyledRoot
      sx={{
        ...( {
          color: 'primary',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
        <Button variant="contained" color="inherit" size="small" onClick={handleClickOpen}>
        Create Announcement
        </Button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                New Announcement
              </Typography>
              <TextField
                required
                autoFocus
                margin="dense"
                id="name"
                label="From"
                fullWidth
                variant="standard"
              />
              <TextField
                required
                autoFocus
                margin="dense"
                id="date"
                label="Date"
                fullWidth
                variant="standard"
              />
              <TextField
                required
                autoFocus
                margin="dense"
                id="description"
                label="Description"
                fullWidth
                variant="standard"
              />
              <Box alignRight= {true}>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleClose}>Create</Button>
              </Box>
            </Box>
          </Modal>
    </StyledRoot>
  );
}
