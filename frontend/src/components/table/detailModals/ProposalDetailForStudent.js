import { Button, Grid,FormControl, Modal, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React from 'react';
import PropTypes from 'prop-types';

import {
    MDBCard,
    MDBCardBody,
    MDBCardText,
    MDBCol,
    MDBContainer,
    MDBRow,
  } from "mdb-react-ui-kit";

const ProposalDetailForStudent = ({openDetails, handleCloseDetails }) => {
    const obj = {
        departmentName: "CS",
        courseList: [
          {
            courseName: "CS-101",
            description: "Algorithms and Programming I",
            ects: 6.5,
          },
          {
            courseName: "CS-102",
            description: "Algorithms and Programming II",
            ects: 6.5,
          },
          {
            courseName: "CS-121",
            description: "Fundamentals of Algorithms",
            ects: 6.5,
          },
          {
            courseName: "CS-319",
            description: "Object Oriented Software Engineering",
            ects: 6.5,
          },
          { courseName: "CS-315", description: "Programming Languages", ects: 5 },
        ],
      };

    return (
        <Modal
        open={openDetails}
        onClose={handleCloseDetails}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Stack spacing={2}>
      <Typography
        gutterBottom
        variant="h1"
        textAlign={"center"}
        component="div"
      >
        Course Proposal Details
      </Typography>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ width: "100%", height: "100%" }}
      >
        <Box sx={{ width: "90%", height: "90%" }}>
          <Box sx={{ flexGrow: 1 }}>
            <section style={{ backgroundColor: "#eee" }}>
              <MDBContainer className="py-5">
                <MDBRow>
                  <MDBCol lg="12">
                    <MDBCard className="mb-4">
                      <MDBCardBody>
                        {obj.courseList.map((courses,index)=>
                        (<section key={index}><MDBRow >
                          <MDBCol sm="3">
                          <FormControl
                              sx={{
                                m: 1,
                                minWidth: 250,
                              }}
                            >
                            <MDBCardText>Course {index+1}</MDBCardText>
                            </FormControl>
                          </MDBCol>
                          <MDBCol sm="9">
                            <FormControl
                              sx={{
                                m: 1,
                                minWidth: 250,
                              }}
                            >
                            <MDBCardText> {courses.courseName}</MDBCardText>
                            </FormControl>
                          </MDBCol>
                              <MDBCol sm="3">
                                <FormControl
                                  sx={{
                                    m: 1,
                                    minWidth: 250,
                                  }}
                                >
                                  <MDBCardText>Description</MDBCardText>
                                </FormControl>
                              </MDBCol>
                              <MDBCol sm="9">
                                <FormControl
                                  sx={{
                                    m: 1,
                                    minWidth: 250,
                                  }}
                                >
                                  <MDBCardText>{courses.description}

                                  </MDBCardText>
                                </FormControl>
                              </MDBCol>
                              <MDBCol sm="3">
                                <FormControl
                                  sx={{
                                    m: 1,
                                    minWidth: 250,
                                  }}
                                >
                                  <MDBCardText>ECTS</MDBCardText>
                                </FormControl>
                              </MDBCol>
                              <MDBCol sm="9">
                                <FormControl
                                  sx={{
                                    m: 1,
                                    minWidth: 250,
                                  }}
                                >
                                  <MDBCardText>
                                    {courses.ects}
                                  </MDBCardText>
                                </FormControl>
                              </MDBCol>
                        </MDBRow>
                        <hr />

                            </section>
                          ))}
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>

                <Grid container justifyContent={"center"}>
                  <Grid item xs={3}></Grid>
                  <Grid item xs={4}>
                  <Button
                    sx={{ margin: "auto" }}
                    variant="contained"
                    color="error"
                    size="large"
                    onClick={handleCloseDetails}
                  >
                    Close
                  </Button>
                </Grid>
                </Grid>
              </MDBContainer>
            </section>
          </Box>
        </Box>
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
    width: "60%",
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
  
  ProposalDetailForStudent.propTypes = {
    openDetails: PropTypes.bool,
    handleCloseDetails: PropTypes.func,
};
  
ProposalDetailForStudent.defaultProps = {
    openDetails: false,
    handleCloseDetails: f => f,
};

export default ProposalDetailForStudent;
