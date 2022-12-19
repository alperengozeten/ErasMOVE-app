import { Grid, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import PlacedStudentTable from '../table/PlacedStudentsTable';
import { getApplicationsByDepartment, addLanguageByStudentId } from '../../actions';

const PlacementList = ({ applications, user, getApplicationsByDepartment, typeForReq, addLanguageByStudentId, languages }) => {
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
                    <PlacedStudentTable typeForReq={typeForReq} user={user} addLanguageByStudentId={addLanguageByStudentId} languages={languages} applications={ applications } />
                </Grid>
            </Grid>
        </Stack>
    );
};

const mapStateToProps = state => {
    const applications = state.applications.placedApplications;
    const user = state.user.user;
    const typeForReq = state.auth.authTypeForReq;
    const languages = state.languages.languages;
    return {
        applications,
        user,
        typeForReq,
        languages,
    };
};

const mapActionsToProps = {
    getApplicationsByDepartment,
    addLanguageByStudentId,
};

PlacementList.propTypes = {
    applications: PropTypes.array,
    getApplicationsByDepartment: PropTypes.func,
    user: PropTypes.object,
    typeForReq: PropTypes.string,
    addLanguageByStudentId: PropTypes.func,
    languages: PropTypes.array,
};

export default connect(mapStateToProps, mapActionsToProps)(PlacementList);