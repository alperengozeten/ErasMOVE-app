import { Grid, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import UniversityTable from './table/UniversityTable';
import { getDepartments, getUniversities } from '../actions';

const Universities = ({ universities, erasmusUniversities, getUniversities, exchangeUniversities, getDepartments, erasmusDepartments, exchangeDepartments}) => {
    useEffect(() => {
        getUniversities();
        getDepartments();
    }, [getUniversities, getDepartments]);
    return (
        <Stack spacing={2}>
            <Typography gutterBottom variant="h1" textAlign={ "center" } component="div">
                Universities
            </Typography>
            <Grid container justifyContent={'center'}>
                <Grid item xs={12}>
                    <UniversityTable universities={universities} erasmusDepartments={erasmusDepartments} exchangeDepartments={exchangeDepartments} exchangeUniversities={exchangeUniversities} erasmusUniversities={erasmusUniversities} />
                </Grid>
            </Grid>
        </Stack>
    );
};
const mapStateToProps = state => {
    const erasmusUniversities = state.universities.erasmusUniversities;
    const exchangeUniversities = state.universities.exchangeUniversities;
    const exchangeDepartments = state.universities.exchangeDepartments;
    const erasmusDepartments = state.universities.erasmusDepartments;
    const universities = state.universities.universities;
    return {
        universities,
        erasmusUniversities,
        exchangeUniversities,
        erasmusDepartments,
        exchangeDepartments,
    };
};

const mapActionsToProps = {
    getUniversities,
    getDepartments,
};

Universities.propTypes = {
    universities: PropTypes.array,
    erasmusUniversities: PropTypes.array,
    getUniversities: PropTypes.func,
    exchangeUniversities: PropTypes.array,
    getDepartments: PropTypes.func,
    erasmusDepartments: PropTypes.array, 
    exchangeDepartments: PropTypes.array,
};
  
Universities.defaultProps = {
    universities: [],
};

export default connect(mapStateToProps, mapActionsToProps)(Universities);