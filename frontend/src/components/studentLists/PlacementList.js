import { Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import PlacedStudentTable from '../table/PlacedStudentsTable';

const PlacementList = ({ applications }) => {
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
    return {
        applications,
    };
};

PlacementList.propTypes = {
    applications: PropTypes.array,
};
  
PlacementList.defaultProps = {
    applications: [],
};

export default connect(mapStateToProps, {})(PlacementList);