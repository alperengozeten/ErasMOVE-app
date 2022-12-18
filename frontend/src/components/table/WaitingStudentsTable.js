import React from 'react';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState } from 'react';
import PropTypes from 'prop-types';

import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCol,
  MDBContainer,
  MDBRow,
} from "mdb-react-ui-kit";
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  TableRow,
  FormControl,
  MenuItem,
  Select,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  Button,
  Grid,
  Tooltip,
  Box,
  Modal
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import DescriptionIcon from '@mui/icons-material/Description';
import { useDispatch } from 'react-redux';
import ApplicationDetails from '../Application/ApplicationDetails';
// components
import Label from '../label';
import Scrollbar from './scrollbar';
// sections
import { UserListHead, UserListToolbar } from './user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'department', label: 'Department', alignRight: true },
  { id: 'score', label: 'Score', alignRight: true },
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

const WaitingStudentsTable = ({ applications, sendReplacementOffer, typeForReq, erasmusDepartments, exchangeDepartments }) => {

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [universityValue, setUniversityValue] = useState(0);

  const [selectedDep, setSelectedDep] = useState({});

  const [department, setDepartment] = useState('');
  const [type, setType] = useState('');

  const [isModalOpen, setModalOpen] = useState(false);


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleModalClose = () => {
    setModalOpen(false);
    setApplicationDetailsID(0);
    setSelectedDep({});
    setUniversityValue(0);
  };

  const handleChangeRowsPerPage = event => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = event => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleUniversityChange = event => {
    setUniversityValue(event.target.value);
    setSelectedDep((applications?.filter(app => app.id === applicationDetailsID)[0]?.outgoingStudent.isErasmus ? erasmusDepartments : exchangeDepartments).filter(dep => dep.id === event.target.value)[0]);
  };
  
  const dispatch = useDispatch();

  const offerReplacement = id => {
    console.log(1);
    setApplicationDetailsID(id);
    setModalOpen(true);
  };

  const sendReplaceOffer = () => {
    let replacementRequest = '';
    let type = '';
    if (applications?.filter(app => app.id === applicationDetailsID)[0]?.outgoingStudent.isErasmus) {
      replacementRequest = {
        info: 'Erasmus Replacement Request',
        student:{ id: applications.filter(app => app.id === applicationDetailsID)[0]?.outgoingStudent.id},
        erasmusUniversity: {id: selectedDep.erasmusUniversity.id},
      };
      type = 'Erasmus';
    } else {
      replacementRequest = {
        info: 'Exchange Replacement Request',
        student: applications.filter(app => app.id === applicationDetailsID)[0]?.outgoingStudent.id,
        exchangeUniversity: selectedDep.exchangeUniversity,
      };
      type = 'Exchange';
    }
    
    dispatch(sendReplacementOffer(replacementRequest, type));
    handleModalClose();
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
          <UserListToolbar filterName={filterName} onFilterName={handleFilterByName} type={type} setType={setType} setDepartment={setDepartment} department={department} />

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
                    const { id, outgoingStudent, applicationScore, admittedStatus, avatarUrl } = row;

                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox" >
                        <TableCell padding="checkbox"></TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={name} src={avatarUrl} />
                            <Typography variant="subtitle2" noWrap>
                              {outgoingStudent.name}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="center">{outgoingStudent.department.departmentName}</TableCell>

                        <TableCell align="center">{applicationScore}</TableCell>

                        <TableCell align="center">
                          <Label color={(admittedStatus === 'NOT ADMITTED' && 'error') || 'success'}>{sentenceCase(admittedStatus)}</Label>
                        </TableCell>

                        <TableCell align="right">
                          <Tooltip describeChild title="Open application details">
                            <IconButton size="large" color="inherit" onClick={() => handleClickOpen(id) }>
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
                                      languageEditable={false}
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
                        <TableCell align="right">
                          {typeForReq==='departmentCoordinator' ?
                            (<Button variant="contained" color="inherit" size="small" onClick={() => offerReplacement(id)} endIcon={<SendIcon />}>
                                Replacement Offer
                            </Button>): null }
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
            count={applications.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
           <Modal
        open={isModalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack spacing={6}>
            <Typography
              id="modal-modal-title"
              textAlign={"center"}
              variant="h2"
              component="h1"
            >
              Send Replacement Offer
            </Typography>
            <Stack alignItems={"center"} spacing={3}>
              <section style={{ width: "100%", backgroundColor: "#eee" }}>
                <MDBContainer className="py-5">
                  <MDBCard className="mb-4">
                    <MDBCardBody>
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>University</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <FormControl sx={{ minWidth: 250 }}>
                            <Select
                              required
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={universityValue}
                              size="small"
                              onChange={handleUniversityChange}
                            >
                              <MenuItem disabled value={0}>
                                Select
                              </MenuItem>
                              {applicationDetailsID !== 0 ? ((applications?.filter(app => app.id === applicationDetailsID)[0].outgoingStudent.isErasmus ? erasmusDepartments : exchangeDepartments)
                                ?.filter(dep => dep.departmentName === applications[0]?.outgoingStudent?.department?.departmentName)
                                ?.filter(dep => dep.quota > 0)
                                ?.map(department => (<MenuItem key={department.id} value={department.id}>
                                {department.erasmusUniversity.universityName}
                              </MenuItem>))) : null}
                            </Select>
                          </FormControl>
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Empty Quota</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText>{selectedDep?.quota}
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                    </MDBCardBody>
                  </MDBCard>
                </MDBContainer>
              </section>
              <Grid container justifyContent={"center"}>
                <Grid item xs={3}></Grid>
                <Grid item xs={4}>
                  <Button
                    sx={{ margin: "auto" }}
                    variant="contained"
                    color="success"
                    size="medium"
                    onClick={sendReplaceOffer}
                  >
                    Send
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button
                    sx={{ margin: "auto" }}
                    variant="contained"
                    color="error"
                    size="medium"
                    onClick={handleModalClose}
                  >
                    Close
                  </Button>
                </Grid>
                <Grid item xs={1}></Grid>
              </Grid>
            </Stack>
          </Stack>
        </Box>
      </Modal>
        </Card>
      </Container>
    </>
  );
};

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: "55%",
//   bgcolor: "background.paper",
//   border: "none",
//   borderRadius: "6px",
//   boxShadow: 24,
//   p: 4,
// };

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


WaitingStudentsTable.propTypes = {
    applications: PropTypes.array,
    sendReplacementOffer: PropTypes.func,
    typeForReq: PropTypes.string,
    contractedUniDepartments: PropTypes.array,
    erasmusDepartments: PropTypes.array,
    exchangeDepartments: PropTypes.array,
};
  
WaitingStudentsTable.defaultProps = {
    applications: [],
    sendReplacementOffer: f => f,
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "6px",
  boxShadow: 24,
  p: 4,
};
export default WaitingStudentsTable;
