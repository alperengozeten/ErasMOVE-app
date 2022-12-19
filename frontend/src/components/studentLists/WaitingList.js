import { Grid, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
    Card,
    Table,
    TableRow,
    TableBody,
    Box,
    Button,
    TableCell,
    Container,
    TableContainer,
    Paper
  } from "@mui/material";
  // components
import WaitingStudentsTable from '../table/WaitingStudentsTable';
import { sendReplacementOffer, getApplicationsByDepartment, getDepartments, getProposedRequestRequest } from '../../actions';
import { DELETE_PROPOSED_REQUEST_REQUEST } from '../../constants/actionTypes';

const WaitingList = ({ applications, getProposedRequestRequest, proposedRequests, getApplicationsByDepartment, user, typeForReq, exchangeDepartments, getDepartments, erasmusDepartments }) => {
    useEffect(() => {
        getApplicationsByDepartment(user, typeForReq);
        getDepartments();

        if(typeForReq==="departmentCoordinator") {
            getProposedRequestRequest(user.id);
        }
    }, [user, getApplicationsByDepartment, typeForReq]);

    const dispatch = useDispatch(); 

    const handleSend = id => {
        let replacementRequest = '';
        let type = '';
        if (proposedRequests?.filter(app => app.id === id)[0]?.student.isErasmus) {
        replacementRequest = {
            info: 'Erasmus Replacement Request',
            student:{ id: proposedRequests.filter(app => app.id === id)[0]?.student.id},
            erasmusUniversity: {id: proposedRequests?.filter(app => app.id === id)[0].erasmusUniversity.id},
            departmentCoordinator: {
                id: user.id
            },
        };
        type = 'Erasmus';
        } else {
        replacementRequest = {
            info: 'Exchange Replacement Request',
            student:{ id: proposedRequests.filter(app => app.id === id)[0]?.student.id},
            exchangeUniversity: {id: proposedRequests?.filter(app => app.id === id)[0].exchangeUniversity.id},
            departmentCoordinator: {
                id: user.id
            },
        };
        type = 'Exchange';
        }
    
        dispatch(sendReplacementOffer(replacementRequest, type));
    };

    const handleDecline = id => {
        const type = proposedRequests?.filter(app => app.id === id)[0]?.student.isErasmus ? 'Erasmus' : 'Exchange';
        dispatch({ type: DELETE_PROPOSED_REQUEST_REQUEST, payload: { id, type }});
    };
    //----DUMMY DATA----
    const propose = [{universityName: "EPFL", quota: 1, studentName: "Kürşad Güzelkaya"},{universityName: "Harvard", quota: 1, studentName: "Alperen Gözeten"}];
    return (
        <Stack spacing={2}>
            <Typography gutterBottom variant="h1" textAlign={ "center" } component="div">
                Waiting List
            </Typography>
            <Container>
        <Card>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableBody>
                  {typeForReq==="departmentCoordinator" ? proposedRequests.map(( proposeItem,id ) => {
                    return (
                      <TableRow hover key={id} tabIndex={-1}>
                        <TableCell align="left">There is available quota for {proposeItem?.student?.isErasmus ? proposeItem?.erasmusUniversity?.universityName : proposeItem?.exchangeUniversity?.universityName }, send replacement offer to {proposeItem?.student?.name}</TableCell>
                        <Grid sx={{ p: 2 }}>

                            <Button
                                   variant="contained"
                                   color="success"
                                   size="small"
                                   onClick={() => handleSend(proposeItem.id)}
                            >Send</Button>

                            <Button
                            variant="contained"
                            color="error"
                            size="small"
                            onClick={() => handleDecline(proposeItem.id)}
                            >Reject</Button>

                        </Grid>
                      </TableRow>
                    );
                    }) : null}
                </TableBody>
              </Table>
            </TableContainer>
        </Card>
      </Container>
            <Grid container justifyContent={'center'}>
                <Grid item xs={12}>
                    <WaitingStudentsTable userId={user.id} erasmusDepartments={erasmusDepartments} exchangeDepartments={exchangeDepartments} typeForReq={typeForReq} applications={applications} sendReplacementOffer={sendReplacementOffer}  />
                </Grid>
            </Grid>
        </Stack>
    );
};

const mapStateToProps = state => {
    const applications = state.applications.waitingApplications;
    const user = state.user.user;
    const typeForReq = state.auth.authTypeForReq;
    const erasmusDepartments = state.universities.erasmusDepartments;
    const exchangeDepartments = state.universities.exchangeDepartments;
    const proposedRequests = state.requests.proposedRequests;
    return {
        applications,
        user,
        typeForReq,
        erasmusDepartments,
        exchangeDepartments,
        proposedRequests,
    };
};

const mapActionsToProps = {
    sendReplacementOffer,
    getApplicationsByDepartment,
    getDepartments,
    getProposedRequestRequest,
};

WaitingList.propTypes = {
    applications: PropTypes.array,
    getApplicationsByDepartment: PropTypes.func,
    user: PropTypes.object,
    typeForReq: PropTypes.string,
    exchangeDepartments: PropTypes.array,
    erasmusDepartments: PropTypes.array,
    getDepartments: PropTypes.func,
    getProposedRequestRequest: PropTypes.func,
    proposedRequests: PropTypes.array,
};
  
WaitingList.defaultProps = {
    applications: [],
};

export default connect(mapStateToProps, mapActionsToProps)(WaitingList);