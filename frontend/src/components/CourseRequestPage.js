import { Stack, Typography } from '@mui/material';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CourseRequestTable from './table/CourseRequestTable';

const CourseRequestPage = ({courseRequests}) => {
    return (
        <Stack spacing={2}>
            <Typography gutterBottom variant="h1" textAlign={ "center" } component="div">
                Course Requests
            </Typography>
            <CourseRequestTable courseRequests = {courseRequests} />
        </Stack>
    );
};
const mapStateToProps = state => {
    const courseRequests = state.courseRequests.courseRequests;
    return {
        courseRequests,
    };
};

CourseRequestPage.propTypes = {
    courseRequests: PropTypes.array,
};
  
CourseRequestPage.defaultProps = {
    courseRequests: [],
};

export default connect(mapStateToProps, {})(CourseRequestPage);