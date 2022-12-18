import React from 'react';
import { filter } from 'lodash';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { sentenceCase } from 'change-case';
import Label from '../label';
import { Button, Grid, Modal, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// @mui
import {
  Card,
  Table,
  Paper,
  TableRow,
  TableBody,
  TableCell,
  Container,
  TableContainer,
  TablePagination,
  Tooltip,
  IconButton,
} from '@mui/material';

// components
import Scrollbar from './scrollbar';
import DescriptionIcon from '@mui/icons-material/Description';

// sections
import { ProposalPageListHead, ProposalPageListToolbar } from './proposal';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'studentName', label: 'Student Name', alignRight: false },
  { id: 'name', label: 'Proposal Number', alignRight: false },
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
const ProposalTable = ({ deleteCourseApprovalRequestRequest, courseRequests }) => {

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');
  
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [requesDetailsID, setRequesDetailsID] = React.useState(0);

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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - courseRequests.length) : 0;

  const filteredUsers = applySortFilter(courseRequests, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  const [openDetails, setOpenDetails] = React.useState(false);
  const [openAccept, setOpenAccept] = React.useState(false);
  const [openDecline, setOpenDecline] = React.useState(false);
  const [requestType, setRequestType] = React.useState("");

  const handleOpenDetails = id => { 
    setRequesDetailsID(id);
    setOpenDetails(true);
  };
  const handleOpenAccept = () => { 
    setOpenAccept(true);
  };
  const handleOpenDecline= () => { 
    setOpenDecline(true);
  };
  const handleCloseDetails = () => { 
    setRequesDetailsID(0);
    setOpenDetails(false);
  };
  const handleCloseAcceptAndDecline = () => { 
    setOpenDecline(false);
    setOpenAccept(false);
  };
  const handleAccept= () => { 
    //TODO

    setOpenAccept(false);
  };
  const handleDecline= () => { 
    //TODO
    setOpenDecline(false);
  };

  const proposals= [{studentName: "Kürşad Güzelkaya", name:"Proposal 1", status: "WAITING"},{studentName: "Gökhan Tekin",name:"Proposal 2", status:"DECLINED"},{studentName: "Alperen Gözeten",name:"Proposal 3", status:"ACCEPTED"} ];

  return (
    <>
      <Container>
        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <ProposalPageListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {proposals.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                    const { id ,studentName, name,status } = row;

                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox" >
                        <TableCell padding="checkbox"></TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="left" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {studentName}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="center">
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                        </TableCell>

                        <TableCell align="center">
                          <Label color={(status === 'WAITING' && 'warning') || (status === 'DECLINED' && 'error') || 'success'}>{sentenceCase(status)}</Label>
                        </TableCell>

                   
                        <TableCell align="right">
                       
                         { status==="WAITING" ? <><Tooltip describeChild title="Accept proposal">
                            <Button variant="contained" size="small" color="success" onClick={() => handleOpenAccept(id) }>
                              Accept
                            </Button>
                          </Tooltip>
                          <Tooltip describeChild title="Accept proposal">
                            <Button variant="contained" size="small"color="error" onClick={() => handleOpenDecline(id) }>
                              Decline
                            </Button>
                          </Tooltip></> : <></>}
                          <Tooltip describeChild title="Open details">
                            <IconButton size="large" color="inherit" onClick={() => handleOpenDetails(id) }>
                              <DescriptionIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>

                        <Modal
            open={openAccept}
            onClose={handleCloseAcceptAndDecline}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            BackdropProps={{ style: { backgroundColor: "rgba(0, 0, 0, 0.2)" } }}
        >
            <Box sx={style}>
                <Stack spacing={6}>
                    <Typography id="modal-modal-title" textAlign={"center"}
                        variant="h2" component="h1">
                        Accept {name}
                    </Typography>
                    <Stack alignItems={"center"} spacing={3}>
                        <Typography id="modal-modal-title" textAlign={"center"}
                            variant="body1" fontSize={18} component="h1">
                            You can not take it back after you accept it. Do you want to accept {name}?
                        </Typography>
                    </Stack>
                    <Stack alignItems={"flex-end"}>
                        <Grid container justifyContent={"flex-end"} spacing={2}>
                            <Grid item xs={4}></Grid>
                            <Grid justifyContent={"flex-end"} item xs={4}>
                            </Grid>
                            <Grid item container spacing={5}   xs={4}>
                                <Grid item xs={4}>
                                    <Button variant="contained" startIcon={<ArrowBackIcon /> } color="primary" size="medium" onClick={handleCloseAcceptAndDecline} >
                                        Back
                                    </Button>
                                </Grid>
                                <Grid item xs={4}>
                                    <Button variant="contained"  color="success" size="medium" onClick={handleAccept} >
                                        Accept
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>   
                    </Stack>
                </Stack>
            </Box>
        </Modal>
        <Modal
            open={openDecline}
            onClose={handleCloseAcceptAndDecline}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            BackdropProps={{ style: { backgroundColor: "rgba(0, 0, 0, 0.2)" } }}
        >
            <Box sx={style}>
                <Stack spacing={6}>
                    <Typography id="modal-modal-title" textAlign={"center"}
                        variant="h2" component="h1">
                        Decline {name}
                    </Typography>
                    <Stack alignItems={"center"} spacing={3}>
                        <Typography id="modal-modal-title" textAlign={"center"}
                            variant="body1" fontSize={18} component="h1">
                            You can not take it back after you accept it. Do you want to decline {name}?
                        </Typography>
                    </Stack>
                    <Stack alignItems={"flex-end"}>
                        <Grid container justifyContent={"flex-end"} spacing={2}>
                            <Grid item xs={4}></Grid>
                            <Grid justifyContent={"flex-end"} item xs={4}>
                            </Grid>
                            <Grid item container spacing={5}   xs={4}>
                                <Grid item xs={4}>
                                    <Button variant="contained" startIcon={<ArrowBackIcon /> } color="primary" size="medium" onClick={handleCloseAcceptAndDecline} >
                                        Back
                                    </Button>
                                </Grid>
                                <Grid item xs={4}>
                                    <Button variant="contained" color="error" size="medium" onClick={handleDecline} >
                                        Decline
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>   
                    </Stack>
                </Stack>
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

ProposalTable.propTypes = {
    courseRequests: PropTypes.array,
    deleteCourseApprovalRequestRequest: PropTypes.func
};
  
ProposalTable.defaultProps = {
    courseRequests: [],
};

const style ={
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: '60%',
    bgcolor: "background.paper",
    border: "none",
    borderRadius: "6px",
    boxShadow: 24,
    p: 4,
};
export default ProposalTable;
