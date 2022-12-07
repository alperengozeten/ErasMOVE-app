import React from 'react';
import { filter } from 'lodash';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { sentenceCase } from 'change-case';
import Label from '../label';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

// @mui
import {
  Card,
  Table,
  Paper,
  Avatar,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Tooltip,
  IconButton,
  Grid,
  FormControl,
  Stack,
  Button
} from '@mui/material';

// components
import Scrollbar from './scrollbar';
import DescriptionIcon from '@mui/icons-material/Description';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


// sections
import { UserListHead, UserListToolbar } from './user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Student Name', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
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
const CourseRequestTable = ({ courseRequests }) => {

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');
  
  const [rowsPerPage, setRowsPerPage] = useState(5);
  
//   const [anchorEl, setAnchorEl] = React.useState(null);

//   const handleOpenApplication = id => {
//     console.log("id: ", id);
//   };

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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - courseRequests.length) : 0;

  const filteredUsers = applySortFilter(courseRequests, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;
  const [rejectOpen, setRejectOpen] = React.useState(false);

  const handleClickRejectOpen = () => {
    setRejectOpen(true);
  };

  const handleRejectClose = () => {
    setRejectOpen(false);
  };
  const [acceptOpen, setAcceptOpen] = React.useState(false);

  const handleClickAcceptOpen = () => {
    setAcceptOpen(true);
  };

  const handleAcceptClose = () => {
    setAcceptOpen(false);
  };
  const [open, setOpen] = useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    
  };

  return (
    <>
      <Container>
        <Card>
          <UserListToolbar filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                    const { id, name, status,avatarUrl } = row;

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
                        <TableCell align="center">
                          <Label color={(status === 'waiting' && 'warning') || (status === 'rejected' && 'error') || 'success'}>{sentenceCase(status)}</Label>
                        </TableCell>

                   
                        <TableCell align="right">
                          <Tooltip describeChild title="Open details">
                            <IconButton size="large" color="inherit" onClick={handleClickOpen }>
                              <DescriptionIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                        <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        BackdropProps={{ style : {backgroundColor: "rgba(0,0,0,0.04)"}}}

                    >
                        <Box sx={style}>
                            <Stack spacing={6}>
                                <Typography id="modal-modal-title" textAlign={"center"}
                                    variant="h2" component="h1">
                                  Course Request Details
                                </Typography>
                                <Stack alignItems={"center"} spacing={3}>
                                    <Grid container spacing={2} width={"80%"} >
                                        <Grid item xs={6} >
                                            <Stack spacing={4   }>
                                                <Box alignItems={"center"}>
                                                <Typography id="modal-modal-title" textAlign={"center"}
                                                    variant="h6" component="h2">
                                                  Student Name: {name}
                                                </Typography> 
                                                </Box>
                                                <Box alignItems={"center"}>
                                                  <Typography id="modal-modal-title" textAlign={"center"}
                                                      variant="h6" component="h2">
                                                    Status: {status}
                                                  </Typography> 
                                                </Box>
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Stack spacing={2}>
                                                <Box>
                                                    <Button size= "small" variant="contained" component="label">
                                                        Download File
                                                    </Button>
                                                </Box>
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                </Stack>
                                <Box style={{ display: "flex", justifyContent: 'flex-end' }}>
                                    <Button style={{ marginLeft: 5 }}  variant="contained" color="success" size="small" onClick={handleClickAcceptOpen} >
                                        Accept
                                    </Button>
                            
                                    <Button style={{ marginLeft: 5 }} variant="contained" color="error" size="small"onClick={handleClickRejectOpen} >
                                        Reject
                                    </Button>
                                    <Button  style={{ marginLeft: 5 }}  variant="contained" color="primary" size="small"onClick={handleClose} >
                                        Close
                                    </Button>
                                </Box>
                            </Stack>
                        </Box>
                    </Modal>
                   
                        <Dialog
                          open={rejectOpen}
                          onClose={handleRejectClose}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                        >
                        <DialogTitle id="alert-dialog-title">
                          {"Reject the course request?"}
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                            Do you want to continue reject the course request?
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleRejectClose}>Cancel</Button>
                        <Button onClick={handleRejectClose} autoFocus>
                          Continue
                        </Button>
                      </DialogActions>
                    </Dialog>
                    <Dialog
                      open={acceptOpen}
                      onClose={handleAcceptClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">
                        {"Accept the course request?"}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          Do you want to continue accept the course request?
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleAcceptClose}>Cancel</Button>
                        <Button onClick={handleAcceptClose} autoFocus>
                          Continue
                        </Button>
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
            count={courseRequests.length}
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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: '50%',
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "6px",
  boxShadow: 24,
  p: 4,
};
CourseRequestTable.propTypes = {
    courseRequests: PropTypes.array,
};
  
CourseRequestTable.defaultProps = {
    courseRequests: [],
};


export default CourseRequestTable;
