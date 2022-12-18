import { Box, Button, Grid, Modal, Stack, Typography, Alert } from '@mui/material';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import SendIcon from '@mui/icons-material/Send';
import React from 'react';
import PropTypes from 'prop-types';

import PreApprovalsTableForStudents from '../table/PreApprovalsTableForStudent';
import PreApprovalCourse from './PreApprovalCourse';

const PreApprovalForms = ({ deletePreApprovalFormRequest, preApprovalForms, hostDepartment, createPreApprovalFormRequest, userId, acceptedUniDepartment }) => {
 
    const [open, setOpen] = React.useState(false);
    const [error, setError] = React.useState(false);
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

    const handleCreatePreApprovalForm = () => {

        var missingInfo = false;

        for(var i = 0; i < mergedCourses.length; i++){
            for(var k = 0; k < mergedCourses[i].courses.length; k++){
                if(mergedCourses[i].courses[k] === ''){
                    missingInfo = true;
                    break;
                }
            }

            if(!(mergedCourses[i].equivalentCourse > -1))
                missingInfo = true;

            if(mergedCourses[i].type === "Mandatory" || mergedCourses[i].type === "Elective")
                missingInfo = true;

            if(missingInfo)
                break;

        }

        if(missingInfo){
            setError(true);
        }
        else{
        const preApprovalForm = {
            mobilityCourses: mergedCourses,
        };
        createPreApprovalFormRequest(preApprovalForm, userId);
        handleClose();
        }
    };

    console.log(mergedCourses);
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
                                        hostDepartment={hostDepartment}
                                        approvedCourses={[...acceptedUniDepartment.courseList, ...acceptedUniDepartment.electiveCourseList]}
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
                                    Add Mobility Course
                                </Button>
                                {error ? (
                                    <Alert severity="error">
                                      Required places must be filled!
                                    </Alert>
                                ) : null}
                                <Grid container justifyContent={'center'} spacing={3}>
                                    <Grid item container justifyContent={'center'} xs={4}>
                                        <Button
                                            fullWidth
                                            sx={{margin: 'auto'}}
                                            variant="contained"
                                            color="success"
                                            size="medium"
                                            startIcon={<SendIcon />}
                                            onClick={handleCreatePreApprovalForm} 
                                        >
                                            Create
                                        </Button>
                                    </Grid>
                                    <Grid item container justifyContent={'center'} xs={4}>
                                        <Button
                                            fullWidth
                                            sx={{margin: 'auto'}}
                                            variant="contained"
                                            color="error"
                                            size="medium"
                                            onClick={handleClose} 
                                        >
                                            Back
                                        </Button>
                                    </Grid>
                                </Grid>
                                
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
    width: '70%',
    bgcolor: "background.paper",
    border: "none",
    borderRadius: "6px",
    boxShadow: 24,
    p: 4,
    maxHeight: "90%",
    mb: 2,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    overflowY: "scroll",
};

PreApprovalForms.propTypes = {
    preApprovalForms: PropTypes.array,
    hostDepartment: PropTypes.object,
    approvedCourses: PropTypes.array,
    deletePreApprovalFormRequest: PropTypes.func,
    createPreApprovalFormRequest: PropTypes.func,
    getCoursesByDepartment: PropTypes.func,
    userId: PropTypes.number,
    acceptedUniDepartment: PropTypes.object,
};
  
PreApprovalForms.defaultProps = {
    preApprovalForms: [],
};

export default PreApprovalForms;