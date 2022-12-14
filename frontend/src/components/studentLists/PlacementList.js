import { Grid, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import PlacedStudentTable from '../table/PlacedStudentsTable';
import { getApplicationsByDepartment } from '../../actions';

const PlacementList = ({ applications, user, getApplicationsByDepartment }) => {
    useEffect(() => {
        getApplicationsByDepartment(user?.department?.departmentName, true);
    }, [user, getApplicationsByDepartment]);
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
    return {
        applications,
        user
    };
};

const mapActionsToProps = {
    getApplicationsByDepartment,
};

PlacementList.propTypes = {
    applications: PropTypes.array,
    getApplicationsByDepartment: PropTypes.func,
    user: PropTypes.object,
};

export default connect(mapStateToProps, mapActionsToProps)(PlacementList);