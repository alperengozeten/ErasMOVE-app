import { Button, Grid, IconButton, Typography } from '@mui/material';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';

import CourseSelect from './CourseSelect';
import { MDBCard, MDBCardBody, MDBCardText, MDBCol, MDBRow } from 'mdb-react-ui-kit';
import CourseCardForCreate from './CourseCardForCreate';

const PreApprovalCourse = ({ setMergedCourses, mergedCourses, handleCourseEquivalentChange, index, handleCourseChange, hostCourses, approvedCourses }) => {
    
    const [forceUpdate, setForceUpdate] = useState(false);
    const handleMergeCourse = () => {
        const newMergedCourses = [...mergedCourses];
        newMergedCourses[index] = {...mergedCourses[index], courses: [...mergedCourses[index].courses, '']};
        setMergedCourses(newMergedCourses);
    };

    const filterMergedCourse = i => {
        const newMergedCourses = mergedCourses.filter((mergedCourse, index) => index !== i);
        setMergedCourses(newMergedCourses);
    };

    const filterCourse = i => {
        const newMergedCourses = mergedCourses;
        newMergedCourses[index] = {...mergedCourses[index], courses: mergedCourses[index].courses.filter((course, index) => index !== i)};
        console.log("new: ", newMergedCourses);
        setMergedCourses(newMergedCourses);
        setForceUpdate(!forceUpdate);
    };

    return (
        <section style={{ width: '100%', backgroundColor: '#eee', padding: '10px' }}>
            <Grid container spacing={2}>
                <Grid item xs={11}>
                    <Typography id="modal-modal-title" sx={{ marginBottom: '10px'}}
                        variant="h3" component="h1">
                        Mobility Course {index+1}
                    </Typography>
                </Grid>
                <Grid item xs={1}>
                    <IconButton sx={{marginRight: '10px'}} color='error' aria-label="delete" onClick={() => filterMergedCourse(index)}>
                        <DeleteIcon />
                    </IconButton>
                </Grid>

            </Grid>
            <MDBCard className="mb-4">
                <MDBCardBody>
                    {mergedCourses[index]?.courses?.map((course, courseIndex) => (
                        <CourseCardForCreate
                            key={courseIndex}
                            courseIndex={courseIndex}
                            mergedCourses={mergedCourses}
                            handleCourseEquivalentChange={handleCourseEquivalentChange}
                            index={index}
                            handleCourseChange={handleCourseChange}
                            approvedCourses={approvedCourses}
                            filterCourse={filterCourse}
                        />
                    ))}
                    <MDBRow>
                        <MDBCol sm="12">
                            <Button
                                sx={{margin: 'auto'}}
                                variant="contained"
                                color="primary"
                                size="medium"
                                onClick={handleMergeCourse} 
                            >
                                Add Course
                            </Button>
                        </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                    <MDBCol sm="3">
                        <MDBCardText>Type</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                        <MDBCardText className="text-muted"> Course</MDBCardText>
                    </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                    <MDBCol sm="3">
                        <MDBCardText>Equivalent Course</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                        <CourseSelect hostCourses={hostCourses} mergedCourses={mergedCourses} equivalent={true} index={index} handleCourseEquivalentChange={handleCourseEquivalentChange} />
                    </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                        <MDBCol sm="3">
                            <MDBCardText>Description</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                            <MDBCardText>{hostCourses.filter(hCourse => hCourse.id === (mergedCourses[index]?.equivalentCourse))[0]?.description}</MDBCardText>
                        </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                        <MDBCol sm="3">
                            <MDBCardText>ECTS</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                            <MDBCardText>{hostCourses.filter(hCourse => hCourse.id === (mergedCourses[index]?.equivalentCourse))[0]?.ects}</MDBCardText>
                        </MDBCol>
                    </MDBRow>
                </MDBCardBody>
            </MDBCard>
        
        {/* 
        <Grid container direction={"row"} spacing={2} sx={{backgroundColor: "#DCDCDC", borderRadius: '4px', paddingBottom: '15px'}}>
            <Grid sx={{marginLeft: "20px"}} item container>
                <Grid item xs={4}>
                    <Typography gutterBottom variant="h3" component="div">
                        Course {index + 1}
                    </Typography>
                </Grid>
                <Grid item xs={6}></Grid>
                <Grid item xs={2} container justifyContent={"flex-end"}>
                    <IconButton sx={{marginRight: '10px'}} color='error' aria-label="delete" onClick={() => filterMergedCourse(index)}>
                        <DeleteIcon />
                    </IconButton>
                </Grid>
            </Grid>
            
            <Grid item container alignItems={'center'} spacing={2} >
                <Grid item xs={1}></Grid>
                <Grid item xs={4}>
                    <Grid container rowSpacing={2} direction={'row'} >
                        {console.log('renderr...')}
                        { mergedCourses[index].courses?.map((course, courseIndex) => (
                            <Grid key={courseIndex} item container spacing={2} alignItems={"center"} xs={12}>
                                <Grid item xs={2}>
                                    {courseIndex === 0 ? null : (
                                        <IconButton sx={{marginRight: '10px'}} color='error' aria-label="delete" onClick={() => filterCourse(courseIndex)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    )}
                                </Grid>
                                <Grid item xs={10}>
                                    <CourseSelect approvedCourses={approvedCourses} mergedCourses={mergedCourses} courseIndex={courseIndex} index={index} handleCourseChange={handleCourseChange} />
                                </Grid>
                            </Grid>
                        ))}
                       
                    </Grid>
                </Grid>
                <Grid item xs={2}></Grid>
                <Grid item alignItems={"center"} sx={{ justifyContent: 'center'}} xs={4}>
                    <CourseSelect hostCourses={hostCourses} mergedCourses={mergedCourses} equivalent={true} index={index} handleCourseEquivalentChange={handleCourseEquivalentChange} />
                </Grid>
            </Grid>
            <Grid key={index} item container  alignItems={'center'} xs={12}>
                <Grid item xs={1}></Grid>
                <Grid item xs={4} container justifyContent={"center"}  alignItems={'center'} >
                    <Button
                        sx={{margin: 'auto'}}
                        variant="contained"
                        color="primary"
                        size="medium"
                        onClick={handleMergeCourse} 
                    >
                        Merge Course
                    </Button>
                </Grid>

            </Grid>
                                    </Grid>*/}
            </section>
    );
}; 

PreApprovalCourse.propTypes = {
    mergedCourses: PropTypes.array,
    index: PropTypes.number,
    courseIndex: PropTypes.number,
    equivalent: PropTypes.bool,
    handleCourseChange: PropTypes.func,
    handleCourseEquivalentChange: PropTypes.func,
    setMergedCourses: PropTypes.func,
    hostCourses: PropTypes.array,
    approvedCourses: PropTypes.array,
};

export default PreApprovalCourse;