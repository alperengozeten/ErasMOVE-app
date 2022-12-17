import React from 'react';
import { filter } from 'lodash';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { sentenceCase } from 'change-case';
import Label from '../label';
import DeleteIcon from '@mui/icons-material/Delete';
import UploadFileIcon from '@mui/icons-material/UploadFile';
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
  TableContainer,
  TablePagination,
  Tooltip,
  Button,
  IconButton
} from '@mui/material';
// components
import Scrollbar from './scrollbar';

// sections
import { UserListHead, UserListToolbar } from './user';
import DeleteModal from '../DeleteModal';

// ----------------------------------------------------------------------
const TABLE_HEAD = [
  { id: 'name', label: 'Student Name', alignRight: false },
  { id: 'request', label: 'Requested Document', alignRight: true },
  { id: 'status', label: 'Status', alignRight: true },

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

const RequestsTable = ({ requests, deleteFileRequestRequest, isStaff, respondFileRequestRequest, userId }) => {

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');
  
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [department, setDepartment] = useState('');

  const [openDelete, setOpenDelete] = React.useState(false);

  const [requesDetailsID, setRequesDetailsID] = React.useState(0);

  const [file, setFile] = React.useState(null);

  console.log(file);

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

  const handleOpenDelete = id => {
    setRequesDetailsID(id);
    setOpenDelete(true);
  };
  const handleCloseDelete = () => {
    setRequesDetailsID(0);
    setOpenDelete(false);
  };

  const handleDelete = () => {
    deleteFileRequestRequest(requesDetailsID);
    setRequesDetailsID(0);
    handleCloseDelete();
  };

  const handleRespondFileReq = () => {
    respondFileRequestRequest(requesDetailsID, file, userId);
    handleClose();
    setFile(null);
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = id => {
    setOpen(true);
    setRequesDetailsID(id);
  };

  const handleClose = () => {
    setOpen(false);
    setRequesDetailsID(0);
  };
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - requests.length) : 0;

  const filterDepartments = department === '' ? requests : requests.filter(application => application.department === department);

  const filteredUsers = applySortFilter(filterDepartments, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Container>
        <Card>
          <UserListToolbar filterName={filterName} onFilterName={handleFilterByName} setDepartment={setDepartment} department={department} />

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
                    const { id, student, info, status,avatarUrl } = row;

                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox" >
                        <TableCell padding="checkbox"></TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={student.name} src={avatarUrl} />
                            <Typography variant="subtitle2" noWrap>
                              {student.name}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="center">{info}</TableCell>
                        <TableCell align="center">
                          <Label color={(status === 'WAITING' && 'warning') || (status === 'DECLINED' && 'error') || 'success'}>{sentenceCase(status)}</Label>
                        </TableCell>

                        <TableCell align="right">
                          {(isStaff && status==='WAITING') ? (<Tooltip describeChild title="Add document">
                            <Button variant="contained" color="inherit" size="small" onClick={() => handleClickOpen(id)}>
                                Add Document
                            </Button>
                          </Tooltip>) : null}
                          {(!isStaff && status!=='WAITING') ? (<Tooltip describeChild title="Download document">
                            <Button variant="contained" color="inherit" size="small" onClick={() => handleClickOpen(id)}>
                                Download Document
                            </Button>
                          </Tooltip>) : null}
                          <Tooltip describeChild title="Delete request">
                            <IconButton size="large" color="error" onClick={() => handleOpenDelete(id) }>
                              <DeleteIcon />
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
                            <Typography id="modal-modal-title" variant="h2" textAlign={'center'} component="h2" >
                              Add Document
                            </Typography>
                            <Button startIcon={<UploadFileIcon />} variant="contained" component="label">
                                Upload File
                                <input hidden accept="application/pdf" multiple type="file" onChange={e => setFile(e.target.files[0])} />
                            </Button>
                            {file ? <Button variant="contained" color="error" component="label" onClick={() => setFile(null)}>
                                  Delete File
                              </Button> : null}
                            <Box >
                            <Button onClick={handleRespondFileReq}>Send</Button>
                            <Button onClick={handleClose}>Close</Button>
                            </Box>
                          </Box>
                        </Modal>
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
            count={requests.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
      <DeleteModal openDelete={openDelete} handleDelete={() => handleDelete()} handleCloseDelete={handleCloseDelete} name={"File Request"}/>
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

RequestsTable.propTypes = {
    requests: PropTypes.array,
    deleteFileRequestRequest: PropTypes.func,
    isStaff: PropTypes.bool,
    respondFileRequestRequest: PropTypes.func,
    userId: PropTypes.string,
};
  
RequestsTable.defaultProps = {
    requests: [],
};


export default RequestsTable;
