import React from 'react';
import { filter } from 'lodash';
import { useState } from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteModal from '../DeleteModal';

// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  Tooltip,
  Button
} from '@mui/material';
// components
import Scrollbar from './scrollbar';
// sections
import { AdminUsersListHead, AdminUsersListToolbar } from './adminUsers';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'actorType', label: 'Actor Type', alignRight: true },

//   { id: 'department', label: 'Department', alignRight: true },
//   { id: 'score', label: 'Score', alignRight: true },
//   { id: 'semester', label: 'Selected Semester', alignRight: true },
//   { id: 'placedUniversity', label: 'Selected Universities', alignRight: true },
//   { id: 'status', label: 'Status', alignRight: true },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, _user => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map(el => el[0]);
}

const AdminUsersTable = ({ allUsers }) => {
    const [openDelete, setOpenDelete] = React.useState(false);

    // const [openDetails, setOpenDetails] = React.useState(false);
    const [page, setPage] = useState(0);

    const [order, setOrder] = useState('asc');
  
    const [orderBy, setOrderBy] = useState('name');
  
    const [filterName, setFilterName] = useState('');
    
    const [rowsPerPage, setRowsPerPage] = useState(5);
    
    // const [anchorEl, setAnchorEl] = React.useState(null);
  
    const [department, setDepartment] = useState('');

    const handleOpenDelete = () => {
        setOpenDelete(true);
      };
      const handleCloseDelete = () => {

        setOpenDelete(false);
      };
    
    //   const handleOpenDetails = () => {
    //     setOpenDetails(true);
    //   };
    //   const handleCloseDetails = () => { 
    //     setOpenDetails(false);
    //   };
    
      const handleDelete = () => {
        handleCloseDelete();
      };



  const handleOpenApplication = id => {
    console.log("id: ", id);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = event => {
    setPage(0);
    setFilterName(event.target.value);
  };

//   const handlePopoverOpen = event => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handlePopoverClose = () => {
//     setAnchorEl(null);
//   };

//   const openPopover = Boolean(anchorEl);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - allUsers.length) : 0;

  const filterDepartments = department === '' ? allUsers : allUsers.filter(application => application.department === department);

  const filteredUsers = applySortFilter(filterDepartments, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Container>
        <Card>
          <AdminUsersListToolbar filterName={filterName} onFilterName={handleFilterByName} setDepartment={setDepartment} department={department} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <AdminUsersListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                    const { id, name, actorType, avatarUrl } = row;

                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox" >
                        <TableCell padding="checkbox"></TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={name} src={avatarUrl} />
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="center">{actorType}</TableCell>

                        {/* <TableCell align="center">{score}</TableCell>

                        <TableCell align="center">{selectedSemester}</TableCell> */}

                        <TableCell align="center"> 
                          {/* <div>
                            <Typography
                              aria-owns={openPopover ? 'mouse-over-popover' : undefined}
                              aria-haspopup="true"
                              onMouseEnter={handlePopoverOpen}
                              onMouseLeave={handlePopoverClose}
                            >
                              {`1. ${selectedUniversities[0]}`}
                            </Typography>
                            <Popover
                              id="mouse-over-popover"
                              sx={{
                                pointerEvents: 'none',
                              }}
                              open={openPopover}
                              anchorEl={anchorEl}
                              anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                              }}
                              transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                              }}
                              onClose={handlePopoverClose}
                              disableRestoreFocus
                            >
                              {
                                selectedUniversities.map((university, index) => (
                                  <Typography key={index} sx={{ p: 2 }}>{index + 1}. {university}</Typography>
                                ))
                              }
                            </Popover>
                          </div> */}
                        </TableCell>

                        <TableCell align="right">
                         
                        </TableCell>
                        <TableCell align="right">
                        <Tooltip describeChild title="Open user details">
                            <Button variant="contained" color="inherit" size="small" onClick={() => handleOpenApplication(id) }>
                              Details
                            </Button>
                          </Tooltip>
                          <Tooltip describeChild title="Delete user">
                            <IconButton size="large" color="error" onClick={() => handleOpenDelete() }>
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={allUsers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
        <DeleteModal handleDelete={handleDelete} openDelete={openDelete} handleCloseDelete={handleCloseDelete} name={"User"}/>
      </Container>
    </>
  );
};

AdminUsersTable.propTypes = {
    allUsers: PropTypes.array,
};
  
AdminUsersTable.defaultProps = {
    allUsers: [],
};


export default AdminUsersTable;
