import { Grid, Stack, Typography } from '@mui/material';
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
            <Grid container justifyContent={'center'}>
                <Grid item xs={12}>
                    <CourseRequestTable courseRequests = {courseRequests} />
                </Grid>
            </Grid>
        </Stack>
    );
};
const mapStateToProps = state => {
    const courseRequests = state.requests.courseRequests;
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