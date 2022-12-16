import { Grid, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import WaitingStudentsTable from '../table/WaitingStudentsTable';
import { sendReplacementOffer, getApplicationsByDepartment } from '../../actions';

const WaitingList = ({ applications, getApplicationsByDepartment, user, typeForReq }) => {
    useEffect(() => {
        getApplicationsByDepartment(user, typeForReq);
    }, [user, getApplicationsByDepartment, typeForReq]);
    return (
        <Stack spacing={2}>
            <Typography gutterBottom variant="h1" textAlign={ "center" } component="div">
                Waiting List
            </Typography>
            <Grid container justifyContent={'center'}>
                <Grid item xs={12}>
                    <WaitingStudentsTable applications={applications} sendReplacementOffer={sendReplacementOffer}  />
                </Grid>
            </Grid>
        </Stack>
    );
};

const mapStateToProps = state => {
    const applications = state.applications.waitingApplications;
    const user = state.user.user;
    const typeForReq = state.auth.authTypeForReq;
    return {
        applications,
        user,
        typeForReq,
    };
};

const mapActionsToProps = {
    sendReplacementOffer,
    getApplicationsByDepartment
};

WaitingList.propTypes = {
    applications: PropTypes.array,
    getApplicationsByDepartment: PropTypes.func,
    user: PropTypes.object,
    typeForReq: PropTypes.string,
};
  
WaitingList.defaultProps = {
    applications: [],
};

export default connect(mapStateToProps, mapActionsToProps)(WaitingList);