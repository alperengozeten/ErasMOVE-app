import { MDBCard, MDBCardBody, MDBCardText, MDBCol, MDBRow } from "mdb-react-ui-kit";
import React from "react";
import PropTypes from 'prop-types';

const CourseCard = ({ course, courseIndex }) => {


    return (
        <>
            <MDBRow>
                <MDBCol sm="2">
                    Course {courseIndex+1}
                </MDBCol>
                <MDBCol sm="10">
                    <MDBCard className="mb-4">
                        <MDBCardBody>
                            <MDBRow>
                                <MDBCol sm="3">
                                    <MDBCardText>Course Name</MDBCardText>
                                </MDBCol>
                                <MDBCol sm="9">
                                    <MDBCardText className="text-muted">{course.courseName}</MDBCardText>
                                </MDBCol>
                            </MDBRow>
                            <hr />
                            <MDBRow>
                                <MDBCol sm="3">
                                    <MDBCardText>Description</MDBCardText>
                                </MDBCol>
                                <MDBCol sm="9">
                                    <MDBCardText className="text-muted">{course.description}</MDBCardText>
                                </MDBCol>
                            </MDBRow>
                            <hr />
                            <MDBRow>
                                <MDBCol sm="3">
                                    <MDBCardText>ECTS</MDBCardText>
                                </MDBCol>
                                <MDBCol sm="9">
                                    <MDBCardText className="text-muted">{course.ects}</MDBCardText>
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

CourseCard.propTypes = {
    course: PropTypes.object,
    courseIndex: PropTypes.number,
};
  
CourseCard.defaultProps = {
    course: {},
};

export default CourseCard;