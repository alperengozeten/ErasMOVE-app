import { Grid, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
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
import { sendReplacementOffer, getApplicationsByDepartment, getDepartments } from '../../actions';

const WaitingList = ({ applications, getApplicationsByDepartment, user, typeForReq, exchangeDepartments, getDepartments, erasmusDepartments }) => {
    useEffect(() => {
        getApplicationsByDepartment(user, typeForReq);
        getDepartments();
    }, [user, getApplicationsByDepartment, typeForReq]);

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
                  {propose.map(( proposeItem,id ) => {
                    return (
                      <TableRow hover key={id} tabIndex={-1}>
                        <TableCell align="left">{proposeItem.quota} available quota for {proposeItem.universityName}. Send replacement offer to {proposeItem.studentName}</TableCell>
                        <Grid sx={{ p: 2 }}>

                            <Button
                                   variant="contained"
                                   color="success"
                                   size="small"
                            >Send</Button>

                            <Button
                            variant="contained"
                            color="error"
                            size="small"
                            >Reject</Button>

                        </Grid>
                      </TableRow>
                    );
                    })}
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
    return {
        applications,
        user,
        typeForReq,
        erasmusDepartments,
        exchangeDepartments,
    };
};

const mapActionsToProps = {
    sendReplacementOffer,
    getApplicationsByDepartment,
    getDepartments,
};

WaitingList.propTypes = {
    applications: PropTypes.array,
    getApplicationsByDepartment: PropTypes.func,
    user: PropTypes.object,
    typeForReq: PropTypes.string,
    exchangeDepartments: PropTypes.array,
    erasmusDepartments: PropTypes.array,
    getDepartments: PropTypes.func,
};
  
WaitingList.defaultProps = {
    applications: [],
};

export default connect(mapStateToProps, mapActionsToProps)(WaitingList);