import { Stack } from '@mui/material';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { sendReplacementOffer } from '../../actions';
import CourseRequestTableForStudents from '../table/CourseRequestTableForStudents';

const CourseRequests = ({ applications }) => {
    return (
        <Stack spacing={2}>
            <CourseRequestTableForStudents courseRequests={applications} sendReplacementOffer={sendReplacementOffer}  />
        </Stack>
    );
};

const mapStateToProps = state => {
    const applications = state.applications.applications;
    return {
        applications,
    };
};

const mapActionsToProps = {
    sendReplacementOffer
};

CourseRequests.propTypes = {
    applications: PropTypes.array,
};
  
CourseRequests.defaultProps = {
    applications: [],
};

export default connect(mapStateToProps, mapActionsToProps)(CourseRequests);