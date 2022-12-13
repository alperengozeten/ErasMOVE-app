import React from 'react';
import PropTypes from 'prop-types';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Toolbar, OutlinedInput, InputAdornment, Grid,Button,Tooltip } from '@mui/material';
// component
import Iconify from '../iconify';
import { connect } from 'react-redux';

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

const AdminUsersListToolbar = ({ numSelected, filterName, onFilterName, authType, setDepartment, department }) => {

  const handleChange = e => setDepartment(e.target.value);

  return (
    <StyledRoot
      sx={{
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      <Grid container >
        <Grid item xs={4} >
          <StyledSearch
            value={filterName}
            onChange={onFilterName}
            placeholder="Search user..."
            startAdornment={
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
              </InputAdornment>
            }
          />
        </Grid>
        <Grid item xs={5}></Grid>
        <Grid item xs={3} align="right">
        <Tooltip describeChild title="Add new user">
            <Button variant="contained" color="inherit" size="medium" >Add User</Button>
            </Tooltip>
        </Grid>
      </Grid>
    </StyledRoot>
  );
};

const mapStateToProps = state => {
  const authType = state.auth.authType;
  return {
    authType,
  };
};

AdminUsersListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  setDepartment: PropTypes.func,
  department: PropTypes.string,
  authType: PropTypes.string,
};

AdminUsersListToolbar.defaultProps = {
  setDepartment: f => f,
  department: '',
};

export default connect(mapStateToProps, {})(AdminUsersListToolbar);