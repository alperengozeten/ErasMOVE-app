import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
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

const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': {
    width: 320,
    boxShadow: theme.customShadows?.z8,
  },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
  },
}));

// ----------------------------------------------------------------------

UniversitiesListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};



export default function UniversitiesListToolbar({ numSelected, filterName, onFilterName }) {
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
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <StyledSearch
          value={filterName}
          onChange={onFilterName}
          placeholder="Search university..."
          startAdornment={
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
            </InputAdornment>
          }
        />
      )}
      <Button variant="contained" color="inherit" size="small" onClick={handleClickOpen}>
        Add a new university
      </Button>
      <Dialog    fullWidth open={open} onClose={handleClose}>
        <DialogTitle>Add University</DialogTitle>
        <DialogContent>
          <DialogContentText>
            University Name
          </DialogContentText>
          <TextField
            required
            autoFocus
            margin="dense"
            id="name"
            label="University Name"
            fullWidth
            variant="standard"
          />
          <DialogContentText>
            University Quota
          </DialogContentText>
          <TextField
            required
            autoFocus
            margin="dense"
            id="quota"
            label="University Quota(only numbers)"
            fullWidth
            variant="standard"
          />
          <DialogContentText>
            University Program Type
          </DialogContentText>
          <TextField
            required
            autoFocus
            margin="dense"
            id="type"
            label="University Program Type"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Add</Button>
        </DialogActions>
      </Dialog>
    </StyledRoot>
  );
}
