import React from 'react';
import { filter } from 'lodash';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { sentenceCase } from 'change-case';
import Label from '../label';
import axios from 'axios';
import { connect } from 'react-redux';


// @mui
import {
  Card,
  Table,
  Paper,
  TableRow,
  Alert,
  Snackbar,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Tooltip,
  IconButton,
  Stack,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ProposalDetailForStudent from './detailModals/ProposalDetailForStudent';

// components
import Scrollbar from './scrollbar';
import DescriptionIcon from '@mui/icons-material/Description';

// sections
import { ProposalPageListHead, ProposalPageListToolbar } from './proposal';
import DeleteModal from '../DeleteModal';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
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
const ProposalTableForStudent = ({ deleteCourseApprovalRequestRequest, courseRequests,user }) => {

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

  const [openDelete, setOpenDelete] = React.useState(false);

  const [requestType, setRequestType] = React.useState("");
  
  const [openSnackBar,setOpenSnackBar] = React.useState(false);
  const [snackBarMsg,setSnackBarMsg] = React.useState("");
  const [severity,setSeverity] = React.useState("success");
  const baseURL = 'http://localhost:8080';

  const handleCloseSnackBar = ()=>{
    setSnackBarMsg("");
    setSeverity("success");
    setOpenSnackBar(false);
  };

  const handleOpenDetails = id => { 
    setRequesDetailsID(id);
    setOpenDetails(true);
  };

  const handleCloseDetails = () => { 
    setRequesDetailsID(0);
    setOpenDetails(false);
  };

  const handleOpenDelete = id => {
    setRequesDetailsID(id);
    setOpenDelete(true);
  };
  const handleCloseDelete = () => {
    setRequesDetailsID(0);
    setRequestType("");
    setOpenDelete(false);
  };
  const[proposals,setProposals] = React.useState([]);
  
  const handleDelete = id => {

    axios.delete(`${baseURL}/incomingStudent/courseProposal/delete/${id}`).then(response => {if(response.status===400){
      setSeverity("error");
  
          setSnackBarMsg("Proposal is not deleted!");
           setOpenSnackBar(true);
         }
         else if(response.status===200){
      setSeverity("success");
  
               setSnackBarMsg("Proposal is successfully deleted!");
              setOpenSnackBar(true);
  
              
              }
          }
      );
    setRequestType("");
    handleCloseDelete();
  };
  //const proposals= [{name:"Proposal 1", status: "WAITING"},{name:"Proposal 2", status:"DECLINED"},{name:"Proposal 3", status:"ACCEPTED"} ];

   function getProposal(incomingStudentID) {
    axios.get(`${baseURL}/incomingStudent/courseProposal/incomingStudent/${incomingStudentID}`).then(response => response.data)
    .then(result => {
      setProposals(result);
    });
}

useEffect(() => {
  getProposal(user.id);
}, []);


console.log("proposal " + proposals);

  return (
    <>
      <Container>
        <Card>
          <ProposalPageListToolbar filterName={filterName} onFilterName={handleFilterByName} user={user} />
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
                  {proposals.map((proposal,id) => {

                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox" >
                        <TableCell padding="checkbox"></TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {proposal.incomingStudent.name}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="center">
                          <Label color={(proposal.status === 'WAITING' && 'warning') || (proposal.status === 'DECLINED' && 'error') || 'success'}>{sentenceCase(proposal.status)}</Label>
                        </TableCell>

                   
                        <TableCell align="right">
                          <Tooltip describeChild title="Open details">
                            <IconButton size="large" color="inherit" onClick={() => handleOpenDetails(id) }>
                              <DescriptionIcon />
                            </IconButton>
                          </Tooltip>
                          { proposal.status==="WAITING" ? <><Tooltip describeChild title="Delete">
                            <IconButton size="large" color="error" onClick={() => handleOpenDelete(id) }>
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip> </>: null}
                        </TableCell>
                    <DeleteModal handleDelete={()=>handleDelete(proposal.id)} openDelete={openDelete} handleCloseDelete={handleCloseDelete} name={proposal.incomingStudentID }/>
                    <ProposalDetailForStudent handleOpenDetails={handleOpenDetails} openDetails={openDetails} handleCloseDetails={handleCloseDetails}/>

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
        <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleCloseSnackBar}>
  <Alert onClose={handleCloseSnackBar} severity={severity} sx={{ width: '100%' }}>
    {snackBarMsg}
  </Alert>
</Snackbar>
      </Container>
    </>
  );
};

const mapStateToProps = state => {
  const user = state.user.user;

  return {
      user,
  };
};

ProposalTableForStudent.propTypes = {
    courseRequests: PropTypes.array,
    deleteCourseApprovalRequestRequest: PropTypes.func,
    user: PropTypes.object
};
  
ProposalTableForStudent.defaultProps = {
    courseRequests: [],
};


export default connect(mapStateToProps)(ProposalTableForStudent); 
