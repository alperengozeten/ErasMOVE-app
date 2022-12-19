import React from 'react';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState } from 'react';
import PropTypes from 'prop-types';
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
  Box,
  Button,
  Modal
} from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
// components
import Label from '../label';
import Scrollbar from './scrollbar';
// sections
import { UserListHead, UserListToolbar } from './user';
import ApplicationDetails from "../Application/ApplicationDetails";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'department', label: 'Department', alignRight: true },
  { id: 'semester', label: 'Semester', alignRight: true },
  { id: 'placedUniversity', label: 'Placed University', alignRight: true },
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
    return filter(array, _user => _user.outgoingStudent.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map(el => el[0]);
}

const PlacedStudentsTable = ({ applications, addLanguageByStudentId, languages }) => {

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [department, setDepartment] = useState('');

  const [type, setType] = useState('');


  // const handleOpenApplication = id => {
  //   console.log("id: ", id);
  // };

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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - applications.length) : 0;

  const filterType = type === '' ? applications : ( type === 'Erasmus' ? applications?.filter(application => application.outgoingStudent.isErasmus) : applications.filter(application => !application.outgoingStudent.isErasmus));

  const filterDepartments = department === '' ? filterType : filterType.filter(application => application.outgoingStudent.department.departmentName === department);

  const filteredUsers = applySortFilter(filterDepartments, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  const [open, setOpen] = useState(false);
  const [applicationDetailsID, setApplicationDetailsID] = React.useState(0);

  const handleClickOpen = id => {
    setApplicationDetailsID(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setApplicationDetailsID(0);
  };

  return (
    <>
      <Container>
        <Card>
          <UserListToolbar filterName={filterName} type={type} setType={setType} onFilterName={handleFilterByName} setDepartment={setDepartment} department={department} />

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
                    const { id, outgoingStudent, admittedStatus, selectedSemester, avatarUrl } = row;

                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox" >
                        <TableCell padding="checkbox"></TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={outgoingStudent.name} src={avatarUrl} />
                            <Typography variant="subtitle2" noWrap>
                              {outgoingStudent.name}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="center">{outgoingStudent.department.departmentName}</TableCell>

                        <TableCell align="center">{selectedSemester}</TableCell>

                        <TableCell align="center">{admittedStatus}</TableCell>

                        <TableCell align="center">
                          <Label color={(admittedStatus === 'WAITING' && 'error') || 'success'}>{sentenceCase(admittedStatus)}</Label>
                        </TableCell>

                        <TableCell align="right">
                          <Tooltip describeChild title="Open application details">
                            <IconButton size="large" color="inherit" onClick={() => handleClickOpen(id)}>
                              <DescriptionIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                        <Modal
                              open={open}
                              onClose={handleClose}
                              BackdropProps={{
                                style: { backgroundColor: "rgba(0,0,0,0.04)" },
                              }}
                            >
                              <Box sx={boxStyle}>
                                <Container>
                                  {applicationDetailsID ? (
                                    <ApplicationDetails
                                      addLanguageByStudentId={addLanguageByStudentId}
                                      languages={languages}
                                      languageEditable={true}
                                      application={
                                        applications.filter(
                                          req => req.id === applicationDetailsID
                                        )[0]
                                      }
                                    />
                                  ) : null}
                                  <Box>
                                    <Button onClick={handleClose}>Close</Button>
                                  </Box>
                                </Container>
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
            count={applications.length}
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

const boxStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: '40%',
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "6px",
  boxShadow: 24,
  p: 4,
  maxHeight: "95%",
  mb: 2,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  overflowY: "scroll",
};

PlacedStudentsTable.propTypes = {
    addLanguageByStudentId: PropTypes.func,
    languages: PropTypes.array,
    applications: PropTypes.array,
};
  
PlacedStudentsTable.defaultProps = {
    applications: [],
};


export default PlacedStudentsTable;
