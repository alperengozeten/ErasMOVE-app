import React from 'react';
import { filter } from 'lodash';
import { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Button
} from '@mui/material';
// components
import Scrollbar from './scrollbar';
// sections
import { UniversityListHead } from './university';

import { UniversitiesListToolbar} from "./university";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'University Name', alignRight: false },
  { id: 'type', label: 'Program Type', alignRight: false },
  { id: 'emptyQuota', label: 'Empty Quota', alignRight: false },
  { id: 'totalQuota', label: 'Total Quota', alignRight: false },

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

const UniversityTable = ({universities}) => {

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

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
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - universities.length) : 0;

  const filteredUsers = applySortFilter(universities, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDisabled(true);
    
  };

  const handleEdit = () => {
    setDisabled(false);
  };

  return (
    <>
      <Container>
        <Card>
          <UniversitiesListToolbar filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UniversityListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  onRequestSort={handleRequestSort}
                />
                
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                    const { id, name, type, emptyQuota, totalQuota } = row;

                    return (
                      <TableRow hover key={id} tabIndex={-1}>
                        <TableCell padding="checkbox"></TableCell>

                        <TableCell align="center" component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="inherit" noWrap>
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="center">{type}</TableCell>

                        <TableCell align="center">{emptyQuota}</TableCell>
                        <TableCell align="center">{totalQuota}</TableCell>

                
                        <TableCell align="right">
                            <Button variant="contained" color="inherit" size="small" onClick={handleClickOpen} >
                                Go To Details
                            </Button>
                        </TableCell>
                        <Dialog fullWidth open={open} onClose={handleClose}>
                          <DialogTitle> University Details </DialogTitle>
                          <DialogContent>
                            <DialogContentText>
                              University Name
                            </DialogContentText>
                            <TextField
                              disabled={disabled}
                              autoFocus
                              margin="dense"
                              id="name"
                              fullWidth
                              variant="standard"
                              defaultValue={name}
                            />
                            <DialogContentText>
                               Total Quota
                            </DialogContentText>
                            <TextField
                              disabled={disabled}
                              autoFocus
                              margin="dense"
                              id="quota"
                              fullWidth
                              variant="standard"
                              defaultValue={totalQuota}
                            />
                              <DialogContentText>
                               Empty Quota
                            </DialogContentText>
                            <TextField
                              disabled={disabled}
                              autoFocus
                              margin="dense"
                              id="quota"
                              fullWidth
                              variant="standard"
                              defaultValue={emptyQuota}
                            />
                            <DialogContentText>
                               Program Type
                            </DialogContentText>
                            <TextField
                              disabled={disabled}
                              autoFocus
                              margin="dense"
                              id="type"
                              fullWidth
                              variant="standard"
                              defaultValue={type}

                            />
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleClose}>Close</Button>
                            <Button onClick={handleClose}>Delete</Button>
                            <Button onClick={handleEdit}>Edit</Button>
                          </DialogActions>
                        </Dialog>
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
            count={universities.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </>
  );
};
UniversityTable.propTypes = {
  universities: PropTypes.array,
};

UniversityTable.defaultProps = {
  universities: [],
};

export default UniversityTable;
