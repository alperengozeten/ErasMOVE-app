import { MDBCard, MDBCardBody, MDBCardText, MDBCol, MDBRow } from "mdb-react-ui-kit";
import React from "react";
import PropTypes from 'prop-types';
import CourseSelect from "./CourseSelect";
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

const CourseCardForCreate = ({ courseIndex, approvedCourses, mergedCourses, index, handleCourseChange, filterCourse }) => {
    console.log('index', index);
    console.log('courseIndex', courseIndex);
    

    return (
        <>
            <MDBRow>
                <MDBCol sm={1}>
                    {courseIndex === 0 ? null : (
                        <IconButton sx={{marginRight: '10px'}} color='error' aria-label="delete" onClick={() => filterCourse(courseIndex)}>
                            <DeleteIcon />
                        </IconButton>
                    )}
                </MDBCol>
                <MDBCol sm="2">
                    Course {courseIndex+1}
                </MDBCol>
                <MDBCol sm="9">
                    <MDBCard className="mb-4">
                        <MDBCardBody>
                            <MDBRow>
                                <MDBCol sm="3">
                                    <MDBCardText>Course Name</MDBCardText>
                                </MDBCol>
                                <MDBCol sm="9">
                                    <CourseSelect approvedCourses={approvedCourses} mergedCourses={mergedCourses} courseIndex={courseIndex} index={index} handleCourseChange={handleCourseChange} />
                                </MDBCol>
                            </MDBRow>
                            <hr />
                            <MDBRow>
                                <MDBCol sm="3">
                                    <MDBCardText>Description</MDBCardText>
                                </MDBCol>
                                <MDBCol sm="9">
                                    <MDBCardText className="text-muted">{approvedCourses.filter(apprCourse => apprCourse.id === (mergedCourses[index]?.courses[courseIndex]))[0]?.description}</MDBCardText>
                                </MDBCol>
                            </MDBRow>
                            <hr />
                            <MDBRow>
                                <MDBCol sm="3">
                                    <MDBCardText>ECTS</MDBCardText>
                                </MDBCol>
                                <MDBCol sm="9">
                                    <MDBCardText className="text-muted">{approvedCourses.filter(apprCourse => apprCourse.id === (mergedCourses[index]?.courses[courseIndex]))[0]?.ects}</MDBCardText>
                                </MDBCol>
                            </MDBRow>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
            <hr />
        </>
        
    );
};

CourseCardForCreate.propTypes = {
    courseIndex: PropTypes.number,
    mergedCourses: PropTypes.array,
    index: PropTypes.number,
    handleCourseChange: PropTypes.func,
    filterCourse: PropTypes.func,
    approvedCourses: PropTypes.array,
};
  
CourseCardForCreate.defaultProps = {
    course: {},
};

export default CourseCardForCreate;