import { Grid, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import StudentsTable from '../table/StudentsTable';
import { getApplicationsByDepartment } from '../../actions';

const ApplicationList = ({ applications, getApplicationsByDepartment, user }) => {
    useEffect(() => {
        getApplicationsByDepartment(user?.department?.departmentName, true);
    }, [user, getApplicationsByDepartment]);
    return (
        <Stack spacing={2}>
            <Typography gutterBottom variant="h1" textAlign={ "center" } component="div">
                Application List
            </Typography>
            <Grid container justifyContent={'center'}>
                <Grid item xs={12}>
                    { applications[0] ? <StudentsTable applications={applications} /> : null}
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

ApplicationList.propTypes = {
    applications: PropTypes.array,
    getApplicationsByDepartment: PropTypes.func,
    user: PropTypes.object,
};
  
ApplicationList.defaultProps = {
    applications: [],
};


export default connect(mapStateToProps, mapActionsToProps)(ApplicationList);