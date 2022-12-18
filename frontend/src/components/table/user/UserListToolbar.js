import React from 'react';
import PropTypes from 'prop-types';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Toolbar, OutlinedInput, InputAdornment, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';
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

const UserListToolbar = ({ numSelected, filterName, onFilterName, authType, setDepartment, department, user }) => {

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
            placeholder="Search student..."
            startAdornment={
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
              </InputAdornment>
            }
          />
        </Grid>
        <Grid item xs={5}></Grid>
        <Grid item xs={3}>
            {
              authType === 'Administrative Staff' ? (
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Department</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={department}
                    label="Department"
                    onChange={handleChange}
                  >
                    <MenuItem value={''}>None</MenuItem>
                    {user.departments.map(department => (<MenuItem key={department.id} value={department.departmentName}>{department.departmentName}</MenuItem>))}
                  </Select>
                </FormControl>
              ) : null
            }
        </Grid>
      </Grid>
    </StyledRoot>
  );
};

const mapStateToProps = state => {
  const authType = state.auth.authType;
  const user = state.user.user;
  return {
    authType,
    user,
  };
};

UserListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  setDepartment: PropTypes.func,
  department: PropTypes.string,
  authType: PropTypes.string,
  user: PropTypes.object,
};

UserListToolbar.defaultProps = {
  setDepartment: f => f,
  department: '',
};

export default connect(mapStateToProps, {})(UserListToolbar);