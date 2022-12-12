import { Grid, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CourseRequestTable from './table/CourseRequestTable';
import { getCourseApprovalRequestsRequest, deleteCourseApprovalRequestRequest } from "../actions";


const CourseRequestPage = ({ deleteCourseApprovalRequestRequest, getCourseApprovalRequestsRequest, courseRequests, userId}) => {
    useEffect(() => {
        getCourseApprovalRequestsRequest(userId);
    }, [getCourseApprovalRequestsRequest, userId]);
    return (
        <Stack spacing={2}>
            <Typography gutterBottom variant="h1" textAlign={ "center" } component="div">
                Course Requests
            </Typography>
            <Grid container justifyContent={'center'}>
                <Grid item xs={12}>
                    <CourseRequestTable deleteCourseApprovalRequestRequest={deleteCourseApprovalRequestRequest} courseRequests = {courseRequests} />
                </Grid>
            </Grid>
        </Stack>
    );
};
const mapStateToProps = state => {
    const courseRequests = state.requests.courseRequests;
    const userId = state.user.user.id;
    return {
        courseRequests,
        userId,
    };
};

const mapActionsToProps = {
    getCourseApprovalRequestsRequest,
    deleteCourseApprovalRequestRequest
};

CourseRequestPage.propTypes = {
    courseRequests: PropTypes.array,
    userId: PropTypes.number,
    getCourseApprovalRequestsRequest: PropTypes.func,
    deleteCourseApprovalRequestRequest: PropTypes.func,
};
  
CourseRequestPage.defaultProps = {
    courseRequests: [],
};

export default connect(mapStateToProps, mapActionsToProps)(CourseRequestPage);