import { Grid, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import PlacedStudentTable from '../table/PlacedStudentsTable';
import { getApplicationsByDepartment } from '../../actions';

const PlacementList = ({ applications, user, getApplicationsByDepartment, typeForReq }) => {
    useEffect(() => {
        getApplicationsByDepartment(user, typeForReq);
    }, [user, getApplicationsByDepartment, typeForReq]);
    return (
        <Stack spacing={2}>
            <Typography gutterBottom variant="h1" textAlign={ "center" } component="div">
                Placement List
            </Typography>
            <Grid container justifyContent={'center'}>
                <Grid item xs={12}>
                    <PlacedStudentTable applications={ applications } />
                </Grid>
            </Grid>
        </Stack>
    );
};

const mapStateToProps = state => {
    const applications = state.applications.placedApplications;
    const user = state.user.user;
    const typeForReq = state.auth.authTypeForReq;
    return {
        applications,
        user,
        typeForReq,
    };
};

const mapActionsToProps = {
    getApplicationsByDepartment,
};

PlacementList.propTypes = {
    applications: PropTypes.array,
    getApplicationsByDepartment: PropTypes.func,
    user: PropTypes.object,
    typeForReq: PropTypes.string,
};

export default connect(mapStateToProps, mapActionsToProps)(PlacementList);