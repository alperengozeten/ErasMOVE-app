import React, { useState } from "react";
import { Button, Grid, Modal, TextField, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import PropTypes  from 'prop-types';
import { MDBCard, MDBCardBody, MDBCardText, MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import { connect } from "react-redux";
import { sentenceCase } from 'change-case';
//import download from 'downloadjs';

import Label from '../../label';
import { acceptCourseApprovalRequestRequest, declineCourseApprovalRequestRequest } from '../../../actions';


const CourseRequestDetail = ({ openDetails, handleCloseDetails, authType, courseRequest, acceptCourseApprovalRequestRequest, declineCourseApprovalRequestRequest }) => {

    const [feedback, setFeedback] = useState('');

    const handleChangeFeedback = e => setFeedback(e.target.value);

    const status = courseRequest.status;

    const handleAccept = () => {
        acceptCourseApprovalRequestRequest(courseRequest.id, (authType === 'Course Coordinator' ? "Mandatory" : "Elective" ), feedback, (authType === 'Course Coordinator' ? courseRequest.courseCoordinator.id : courseRequest.departmentCoordinator.id));
        handleCloseDetails();
    };

    const handleDecline = () => {
        declineCourseApprovalRequestRequest(courseRequest.id, (authType === 'Course Coordinator' ? "Mandatory" : "Elective" ), feedback, (authType === 'Course Coordinator' ? courseRequest.courseCoordinator.id : courseRequest.departmentCoordinator.id));
        handleCloseDetails();
    };

    const handleDownloadSyllabus = () => {
        const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
            JSON.stringify(courseRequest.syllabus)
          )}`;
          const link = document.createElement("a");
          link.href = jsonString;
          link.download = "data.json";
      
          link.click();
    };

    return (
        <Modal
            open={openDetails}
            onClose={handleCloseDetails}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            BackdropProps={{ style: { backgroundColor: "rgba(0, 0, 0, 0.2)" } }}
        >
            <Box sx={style}>
                <Stack spacing={6}>
                    <Typography id="modal-modal-title" textAlign={"center"}
                        variant="h2" component="h1">
                        Course Request
                    </Typography>
                    <Stack alignItems={"center"} spacing={3}>
                        <section style={{ width: '100%', backgroundColor: '#eee' }}>
                            <MDBContainer className="py-5">
                                <Typography id="modal-modal-title" sx={{ marginBottom: '10px'}}
                                    variant="h3" component="h1">
                                    Details
                                </Typography>
                                <MDBRow>
                                <MDBCol lg="12">
                                    <MDBCard className="mb-4">
                                    <MDBCardBody>
                                        <MDBRow>
                                            <MDBCol sm="3">
                                                <MDBCardText>Student</MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="9">
                                                <MDBCardText className="text-muted">{courseRequest.student.name}</MDBCardText>
                                            </MDBCol>
                                        </MDBRow>
                                        <hr />
                                        <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>Course Name</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <MDBCardText className="text-muted">{courseRequest.courseName}</MDBCardText>
                                        </MDBCol>
                                        </MDBRow>
                                        <hr />
                                        <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>Description</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <MDBCardText className="text-muted">{courseRequest.description}</MDBCardText>
                                        </MDBCol>
                                        </MDBRow>
                                        <hr />
                                        <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>Type</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <MDBCardText className="text-muted">Must Course</MDBCardText>
                                        </MDBCol>
                                        </MDBRow>
                                        <hr />
                                        <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>Equivalent Course</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <MDBCardText className="text-muted">{courseRequest.correspondingCourse.courseName}</MDBCardText>
                                        </MDBCol>
                                        </MDBRow>
                                        <hr />
                                        <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>Syllabus</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <MDBCardText className="text-muted">
                                                <Button variant="contained" onClick={handleDownloadSyllabus}>Download Syllabus</Button>
                                            </MDBCardText>
                                        </MDBCol>
                                        </MDBRow>
                                    </MDBCardBody>
                                    </MDBCard>

                                    <Typography id="modal-modal-title" sx={{ marginBottom: '10px'}}
                                        variant="h3" component="h1">
                                        Response
                                    </Typography>
                                    {(status == 'WAITING') && (authType !== 'Outgoing Student') 
                                    ? (
                                        <MDBRow>
                                            <MDBCol md="12">
                                                <MDBCard className="mb-4 mb-md-0">
                                                <MDBCardBody>
                                                    <MDBRow>
                                                        <MDBCol sm="3">
                                                            <MDBCardText>Status</MDBCardText>
                                                        </MDBCol>
                                                        <MDBCol sm="9">
                                                            <MDBCardText className="text-muted">
                                                                <Label color={(status === 'WAITING' && 'warning') || (status === 'DECLINED' && 'error') || 'success'}>{sentenceCase(status)}</Label>
                                                            </MDBCardText>
                                                        </MDBCol>
                                                    </MDBRow>
                                                    <hr />
                                                    <MDBRow>
                                                        <MDBCol sm="3">
                                                            <MDBCardText>Feedback</MDBCardText>
                                                        </MDBCol>
                                                        <MDBCol sm="9">
                                                            <TextField
                                                                id="outlined-multiline-flexible"
                                                                multiline
                                                                fullWidth
                                                                maxRows={4}
                                                                value={feedback}
                                                                onChange={handleChangeFeedback}
                                                            />
                                                        </MDBCol>
                                                    </MDBRow>
                                                    <hr />
                                                    <Grid container >
                                                        
                                                        <Grid item xs={2} >
                                                            <Button sx={{margin: 'auto'}} variant="contained" color="success" size="medium" onClick={handleAccept} >
                                                                Accept
                                                            </Button>
                                                        </Grid>
                                                      
                                                        <Grid item xs={2} >
                                                            <Button sx={{margin: 'auto'}} variant="contained" color="error" size="medium" onClick={handleDecline} >
                                                                Reject
                                                            </Button>
                                                        </Grid>
                                                    </Grid>
                                                </MDBCardBody>
                                                </MDBCard>
                                            </MDBCol>
                                        </MDBRow>
                                    )
                                    
                                    : (
                                        <MDBRow>
                                            <MDBCol md="12">
                                                <MDBCard className="mb-4 mb-md-0">
                                                <MDBCardBody>
                                                    { (authType === 'Outgoing Student') 
                                                    ? (
                                                        <>
                                                            <MDBRow>
                                                                <MDBCol sm="3">
                                                                    <MDBCardText>Coordinator</MDBCardText>
                                                                </MDBCol>
                                                                <MDBCol sm="9">
                                                                    <MDBCardText className="text-muted">
                                                                        {courseRequest.courseCoordinator}
                                                                    </MDBCardText>
                                                                </MDBCol>
                                                            </MDBRow>
                                                            <hr />
                                                        </>
                                                    ) : null }
                                                    <MDBRow>
                                                        <MDBCol sm="3">
                                                            <MDBCardText>Status</MDBCardText>
                                                        </MDBCol>
                                                        <MDBCol sm="9">
                                                            <MDBCardText className="text-muted">
                                                                <Label color={(status === 'WAITING' && 'warning') || (status === 'DECLINED' && 'error') || 'success'}>{sentenceCase(status)}</Label>
                                                            </MDBCardText>
                                                        </MDBCol>
                                                    </MDBRow>
                                                    {status !== 'WAITING' ? <hr /> : null}
                                                    {status !== 'WAITING' ? (<MDBRow>
                                                        <MDBCol sm="3">
                                                            <MDBCardText>Feedback</MDBCardText>
                                                        </MDBCol>
                                                        <MDBCol sm="9">
                                                            <MDBCardText className="text-muted">{courseRequest.feedback}</MDBCardText>
                                                        </MDBCol>
                                                    </MDBRow>): null}
                                                </MDBCardBody>
                                                </MDBCard>
                                            </MDBCol>
                                        </MDBRow>
                                    )

                                    }
                                </MDBCol>
                                </MDBRow>    
                            </MDBContainer>
                            </section>
                    </Stack>
                    <Grid container sx={{marginTop: '0px'}} alignItems={"flex-end"}>
                        <Button sx={{margin: 'auto'}} variant="contained" color="error" size="medium" onClick={handleCloseDetails} >
                            Close
                        </Button>
                    </Grid>
                </Stack>
            </Box>
        </Modal>
    );
};

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
    maxHeight: "90%",
    mb: 2,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    overflowY: "scroll",
};


const mapStateToProps = state => {
    const authType = state.auth.authType;
    return {
        authType,
    };
};

const mapActionsToProps = {
    acceptCourseApprovalRequestRequest,
    declineCourseApprovalRequestRequest,
};

CourseRequestDetail.propTypes = {
    openDetails: PropTypes.bool,
    handleCloseDetails: PropTypes.func,
    authType: PropTypes.string,
    id: PropTypes.number,
    courseRequest: PropTypes.object,
    acceptCourseApprovalRequestRequest: PropTypes.func,
    declineCourseApprovalRequestRequest: PropTypes.func,
};
  
CourseRequestDetail.defaultProps = {
    openDetails: false,
    handleCloseDetails: f => f,
    courseRequest: {},
};

export default connect(mapStateToProps, mapActionsToProps)(CourseRequestDetail);
