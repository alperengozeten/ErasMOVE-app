import { Typography } from "@mui/material";
import { MDBCard, MDBCardBody, MDBCardText, MDBCol, MDBRow } from "mdb-react-ui-kit";
import React from "react";
import PropTypes from 'prop-types';

import CourseCard from "./CourseCard";

const MobilityCourseCard = ({ mobilityCourse, mobilityIndex }) => {


    return (
        <>
            <Typography id="modal-modal-title" sx={{ marginBottom: '10px'}}
                variant="h3" component="h1">
                Mobility Course {mobilityIndex+1}
            </Typography>
            <MDBCard className="mb-4">
                <MDBCardBody>
                    {mobilityCourse?.mergedCourses?.map((course, index) => (
                        <CourseCard key={index} course={course} courseIndex={index} />
                    ))}
                    <MDBRow>
                    <MDBCol sm="3">
                        <MDBCardText>Type</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                        <MDBCardText className="text-muted">{mobilityCourse.type} Course</MDBCardText>
                    </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                    <MDBCol sm="3">
                        <MDBCardText>Equivalent Course</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                        <MDBCardText className="text-muted">{mobilityCourse.correspondingCourse.courseName}</MDBCardText>
                    </MDBCol>
                    </MDBRow>
                </MDBCardBody>
            </MDBCard>
        </>
    );
};

MobilityCourseCard.propTypes = {
    mobilityCourse: PropTypes.object,
    mobilityIndex: PropTypes.number,
};
  
MobilityCourseCard.defaultProps = {
    mobilityCourse: {},
};

export default MobilityCourseCard;