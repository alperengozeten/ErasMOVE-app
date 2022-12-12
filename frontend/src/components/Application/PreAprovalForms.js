import { Box, Button, Grid, Modal, Stack, Typography } from '@mui/material';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import React from 'react';
import PropTypes from 'prop-types';

import PreApprovalsTableForStudents from '../table/PreApprovalsTableForStudent';
import PreApprovalCourse from './PreApprovalCourse';

const PreApprovalForms = ({ deletePreApprovalFormRequest, preApprovalForms, hostCourses, approvedCourses }) => {
    const [open, setOpen] = React.useState(false);
    const [mergedCourses, setMergedCourses] = React.useState([{ courses: ['']}]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleCourseChange = (e, courseIndex, i) => {
        const newMergedCourses = mergedCourses.map((mergedCourse, index) => {
            if (index === i) {
                if (mergedCourse) {
                    const newCourses = mergedCourse.courses;
                    newCourses[courseIndex] = e.target.value;
                    mergedCourse = {
                        ...mergedCourse,
                        courses: newCourses
                    };
                } else {
                    mergedCourse = {
                        courses: [e.target.value]
                    };
                }
            } 
            return mergedCourse;
        });
        console.log(newMergedCourses);
        setMergedCourses(newMergedCourses);
    };

    const handleCourseEquivalentChange = (e, i) => {
        const newMergedCourses = mergedCourses.map((mergedCourse, index) => {
            if (index === i) {
                if (mergedCourse) {
                    mergedCourse = {
                        ...mergedCourse,
                        equivalentCourse: e.target.value,
                    };
                } else {
                    mergedCourse = {
                        equivalentCourse: e.target.value,
                    };
                }
            } 
            return mergedCourse;
        });
        console.log(newMergedCourses);
        setMergedCourses(newMergedCourses);
    };

    return (
        <Stack spacing={2}>
            <Grid container spacing={2}>
                <Grid item xs={8}>

                </Grid>
                <Grid item xs={4} >
                    <Button sx={{margin: 'auto'}} variant="contained" color="primary" size="medium" startIcon={<NoteAddIcon />} onClick={handleOpen} >
                        Create New PreApproval Form
                    </Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style} >
                            <Stack spacing={6}>
                                <Typography id="modal-modal-title" textAlign={"center"}
                                    variant="h2" component="h1">
                                    Create PreApproval Form
                                </Typography>
                                {mergedCourses.map((mergedCourse, index) => (
                                    <PreApprovalCourse
                                        key={index}
                                        hostCourses={hostCourses}
                                        approvedCourses={approvedCourses}
                                        mergedCourses={mergedCourses}
                                        index={index}
                                        handleCourseChange={handleCourseChange}
                                        handleCourseEquivalentChange={handleCourseEquivalentChange}
                                        setMergedCourses={setMergedCourses}
                                    />
                                ))}
                                <Button
                                    sx={{margin: 'auto'}}
                                    variant="contained"
                                    color="primary"
                                    size="medium"
                                    startIcon={<NoteAddIcon />}
                                    onClick={() => setMergedCourses([...mergedCourses, {courses: ['']}])} 
                                >
                                    Add Course
                                </Button>
                            </Stack>
                        </Box>
                    </Modal>
                </Grid>
            </Grid>

            <PreApprovalsTableForStudents deletePreApprovalFormRequest={deletePreApprovalFormRequest} preApprovalForms={preApprovalForms} />
        </Stack>
    );
};

//const CourseSelect = (courses, index, handleCourseChange) => (
   
//);

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: '60%',
    bgcolor: "background.paper",
    border: "none",
    borderRadius: "6px",
    boxShadow: 24,
    p: 4,
    maxHeight: "80%",
    mb: 2,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    overflowY: "scroll",
};

PreApprovalForms.propTypes = {
    preApprovalForms: PropTypes.array,
    hostCourses: PropTypes.array,
    approvedCourses: PropTypes.array,
    deletePreApprovalFormRequest: PropTypes.func,
};
  
PreApprovalForms.defaultProps = {
    preApprovalForms: [],
};

export default PreApprovalForms;