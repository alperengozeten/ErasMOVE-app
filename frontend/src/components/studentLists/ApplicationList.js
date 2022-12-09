import { Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import StudentsTable from '../table/StudentsTable';

const ApplicationList = ({ applications }) => {
    return (
        <Stack spacing={2}>
            <Typography gutterBottom variant="h1" textAlign={ "center" } component="div">
                Application List
            </Typography>
            <Grid container justifyContent={'center'}>
                <Grid item xs={12}>
                    <StudentsTable applications={applications} />
                </Grid>
            </Grid>
        </Stack>
    );
};

const mapStateToProps = state => {
    const applications = state.applications.placedApplications;
    return {
        applications,
    };
};

ApplicationList.propTypes = {
    applications: PropTypes.array,
};
  
ApplicationList.defaultProps = {
    applications: [],
};


export default connect(mapStateToProps, {})(ApplicationList);