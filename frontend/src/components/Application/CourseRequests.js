import { Button, Grid, Stack } from '@mui/material';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import React from 'react';
import PropTypes from 'prop-types';

import { sendReplacementOffer } from '../../actions';
import CourseRequestTableForStudents from '../table/CourseRequestTableForStudents';

const CourseRequests = ({ courseRequests }) => {
    return (
        <Stack spacing={2}>
            <Grid container spacing={2}>
                <Grid item xs={8}>

                </Grid>
                <Grid item xs={4} >
                    <Button sx={{margin: 'auto'}} variant="contained" color="primary" size="medium" startIcon={<NoteAddIcon />}>
                        Create New Course Request
                    </Button>
                </Grid>


            </Grid>

            
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