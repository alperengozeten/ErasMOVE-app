import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import StudentsTable from '../table/StudentsTable';
import { getApplicationsByDepartment, getLanguageByStudentId } from '../../actions';
import { getApplicationsByDepartment } from '../../actions';
import { PLACE_STUDENTS_REQUEST } from '../../constants/actionTypes';

const ApplicationList = ({ applications, getApplicationsByDepartment, getLanguageByStudentId, user, typeForReq }) => {
const ApplicationList = ({ applications, getApplicationsByDepartment, user, typeForReq }) => {
    const [department, setDepartment] = useState(0);
    const [type, setType] = useState('');

    const handleChange = e => setDepartment(e.target.value);
    const handleTypeChange = e => setType(e.target.value);

    const dispatch = useDispatch();
    const handlePlace = () => {
        dispatch({ type: PLACE_STUDENTS_REQUEST, payload: { type, department }});
    };

    useEffect(() => {
        getApplicationsByDepartment(user, typeForReq);
    }, [user, getApplicationsByDepartment]);
    
    return (
        <Stack spacing={2}>
            <Typography gutterBottom variant="h1" textAlign={ "center" } component="div">
                Application List
            </Typography>
            <Grid container justifyContent={'center'}>
            {(typeForReq==='administrativeStaff') && (applications.filter(application => application.status !=='NOT ADMITTED').length<1) ? ( 
                <>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={3}>        
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Type</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={type}
                            label="Type"
                            onChange={handleTypeChange}
                            >
                            <MenuItem value={''}>None</MenuItem>
                            <MenuItem value={'Erasmus'}>Erasmus</MenuItem>
                            <MenuItem value={'Exchange'}>Exchange</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={3}>
                        <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Department</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={department}
                            label="Department"
                            onChange={handleChange}
                        >
                            <MenuItem value={''}>None</MenuItem>
                            {user.departments.map(department => (<MenuItem key={department.id} value={department.id}>{department.departmentName}</MenuItem>))}
                        </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={2}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="secondary"
                            onClick={handlePlace}
                        >Place</Button>
                    </Grid>
                    <Grid item xs={1}></Grid>

                </>) : null}
                <Grid item xs={12}>
                    { applications[0] ? <StudentsTable getLanguageByStudentId={getLanguageByStudentId} applications={applications} /> : null}
                </Grid>
            </Grid>
        </Stack>
    );
};

const mapStateToProps = state => {
    const applications = state.applications.applications;
    // const language = state.language.language;
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
    getLanguageByStudentId,
};

ApplicationList.propTypes = {
    applications: PropTypes.array,
    language: PropTypes.object,
    getApplicationsByDepartment: PropTypes.func,
    getLanguageByStudentId: PropTypes.func,
    user: PropTypes.object,
    typeForReq: PropTypes.string,
};
  
ApplicationList.defaultProps = {
    applications: [],
};


export default connect(mapStateToProps, mapActionsToProps)(ApplicationList);