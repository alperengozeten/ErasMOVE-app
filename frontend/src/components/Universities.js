import { Stack, Typography } from '@mui/material';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import UniversityTable from './table/UniversityTable';

const Universities = ({universities}) => {
    return (
        <Stack spacing={2}>
            <Typography gutterBottom variant="h1" textAlign={ "center" } component="div">
                Universities
            </Typography>
            <UniversityTable universities = {universities} />
        </Stack>
    );
};
const mapStateToProps = state => {
    const universities = state.universities.universities;
    return {
        universities,
    };
};

Universities.propTypes = {
    universities: PropTypes.array,
};
  
Universities.defaultProps = {
    universities: [],
};

export default connect(mapStateToProps, {})(Universities);