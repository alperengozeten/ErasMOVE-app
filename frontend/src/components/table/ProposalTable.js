import React from 'react';
import { filter } from 'lodash';
import { useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import { sentenceCase } from 'change-case';
import Label from '../label';
import { Button, Grid, Modal, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ProposalDetail from './detailModals/ProposalDetail';
import { connect } from "react-redux";
import axios from 'axios';

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
import { ProposalPageListHead } from './proposal';

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
const ProposalTable = ({ deleteCourseApprovalRequestRequest, courseRequests, proposals }) => {

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [orderBy, setOrderBy] = useState('name');

    const [filterName, setFilterName] = useState('');
  
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [requesDetailsID, setRequesDetailsID] = React.useState(0);
  const baseURL = 'http://localhost:8080';

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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - courseRequests.length) : 0;

  const filteredUsers = applySortFilter(courseRequests, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  const [openDetails, setOpenDetails] = React.useState(false);
  const [openAccept, setOpenAccept] = React.useState(false);
  const [openDecline, setOpenDecline] = React.useState(false);
//   const [requestType, setRequestType] = React.useState("");

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
//   const[proposals,setProposals] = React.useState([]);


// const proposals= [{studentName: "Kürşad Güzelkaya", name:"Proposal 1", status: "WAITING"},{studentName: "Gökhan Tekin",name:"Proposal 2", status:"DECLINED"},{studentName: "Alperen Gözeten",name:"Proposal 3", status:"ACCEPTED"} ];
//   function getProposals(id) {
//     axios.get(`${baseURL}/incomingStudent/courseProposal/administrativeStaff/${id}`).then(response => response.data)
//     .then(result => {
//       setProposals(result);
//     });

//     useEffect(() => {
// getProposals(user.id);
        
//       }, []);


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
                  {proposals.map((proposal,index) => {
                    return (
                      <TableRow hover key={index} tabIndex={-1} role="checkbox" >
                        <TableCell padding="checkbox"></TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="left" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {proposal.incomingStudent.name}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="center">
                            <Typography variant="subtitle2" noWrap>
                              Course Proposal
                            </Typography>
                        </TableCell>

                        <TableCell align="center">
                          <Label color={(proposal.status === 'WAITING' && 'warning') || (proposal.status === 'DECLINED' && 'error') || 'success'}>{sentenceCase(proposal.status)}</Label>
                        </TableCell>

                   
                        <TableCell align="right">
                          <Tooltip describeChild title="Open details">
                            <IconButton size="large" color="inherit" onClick={() => handleOpenDetails(index) }>
                              <DescriptionIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                        <ProposalDetail openDetails={openDetails} handleCloseDetails={handleCloseDetails} status={proposal.status} proposal={proposal} />
                       
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
    deleteCourseApprovalRequestRequest: PropTypes.func,
  user: PropTypes.object,
  proposals: PropTypes.array,


};

const mapStateToProps = state => {
    const authType = state.auth.authType;
    const user = state.user.user;
  
    return {
      authType,
      user,
    };
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

export default connect(mapStateToProps, {})(ProposalTable);
