import { Stack } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

import { sendReplacementOffer } from '../../actions';
import CourseRequestTableForStudents from '../table/CourseRequestTableForStudents';

const CourseRequests = ({ courseRequests }) => {
    return (
        <Stack spacing={2}>
            <CourseRequestTableForStudents courseRequests={courseRequests} sendReplacementOffer={sendReplacementOffer}  />
        </Stack>
    );
};


CourseRequests.propTypes = {
    courseRequests: PropTypes.array,
};
  
CourseRequests.defaultProps = {
    courseRequests: [],
};

export default CourseRequests;