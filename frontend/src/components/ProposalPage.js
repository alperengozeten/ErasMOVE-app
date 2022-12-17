import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
} from "mdb-react-ui-kit";
import {
  Box,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Stack,
  Typography,
  Button,
  Alert
} from "@mui/material";

const ProposalPage = () => {
  const [courseOne, setCourseOne] = React.useState(0);
  const [courseTwo, setCourseTwo] = React.useState(0);
  const [courseThree, setCourseThree] = React.useState(0);
  const [courseFour, setCourseFour] = React.useState(0);
  const [courseFive, setCourseFive] = React.useState(0);
  const [error,setError] = React.useState(false);

  
  const handleCreateProposal = () => {
    if (
      courseOne === 0 ||
      courseTwo === 0 ||
      courseThree === 0 ||
      courseFour === 0 ||
      courseFive === 0
    ) {
      setError(true);
    } 
  };

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

  const handleCourseOneChange = e => {
    setCourseOne(e.target.value);
  };
  const handleCourseTwoChange = e => {
    setCourseTwo(e.target.value);
  };
  const handleCourseThreeChange = e => {
    setCourseThree(e.target.value);
  };
  const handleCourseFourChange = e => {
    setCourseFour(e.target.value);
  };
  const handleCourseFiveChange = e => {
    setCourseFive(e.target.value);
  };

  return (
    <Stack spacing={2}>
      <Typography
        gutterBottom
        variant="h1"
        textAlign={"center"}
        component="div"
      >
        Course Proposal Page
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
                        <MDBRow>
                          <MDBCol sm="3">
                            <MDBCardText>Course 1*</MDBCardText>
                          </MDBCol>
                          <MDBCol sm="9">
                            <FormControl
                              sx={{
                                m: 1,
                                minWidth: 250,
                              }}
                            >
                              <Select
                                required
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={courseOne}
                                size="small"
                                onChange={handleCourseOneChange}
                                error={error}

                              >
                                <MenuItem disabled value={0}>
                                  Select
                                </MenuItem>
                                {obj.courseList.map((course,index)=> (
                                <MenuItem key = {index}value={(index+1)*10}>
                                  {course.courseName}
                                </MenuItem>))}
                              </Select>
                            </FormControl>
                          </MDBCol>
                          {courseOne === 0 ? (
                            <></>
                          ) : (
                            <>
                              <hr />
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
                                  <MDBCardText>
                                    {courseOne === 0
                                      ? ""
                                      : obj.courseList[(courseOne - 10) / 10]
                                          .description}
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
                                    {courseOne === 0
                                      ? ""
                                      : obj.courseList[(courseOne - 10) / 10]
                                          .ects}
                                  </MDBCardText>
                                </FormControl>
                              </MDBCol>
                            </>
                          )}
                        </MDBRow>

                        <hr />
                        <MDBRow>
                          <MDBCol sm="3">
                            <MDBCardText>Course 2*</MDBCardText>
                          </MDBCol>
                          <MDBCol sm="9">
                            <FormControl
                              sx={{
                                m: 1,
                                minWidth: 250,
                              }}
                            >
                              <Select
                                required
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={courseTwo}
                                size="small"
                                onChange={handleCourseTwoChange}
                                error={error}

                              >
                                <MenuItem disabled value={0}>
                                  Select
                                </MenuItem>
                                {obj.courseList.map((course,index)=> (
                                <MenuItem key = {index}value={(index+1)*10}>
                                  {course.courseName}
                                </MenuItem>))}
                              </Select>
                            </FormControl>
                          </MDBCol>
                          {courseTwo === 0 ? (
                            <></>
                          ) : (
                            <>
                              <hr />
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
                                  <MDBCardText>
                                    {courseTwo === 0
                                      ? ""
                                      : obj.courseList[(courseTwo - 10) / 10]
                                          .description}
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
                                    {courseTwo === 0
                                      ? ""
                                      : obj.courseList[(courseTwo - 10) / 10]
                                          .ects}
                                  </MDBCardText>
                                </FormControl>
                              </MDBCol>
                            </>
                          )}
                        </MDBRow>
                        <hr />
                        <MDBRow>
                          <MDBCol sm="3">
                            <MDBCardText>Course 3*</MDBCardText>
                          </MDBCol>
                          <MDBCol sm="9">
                            <FormControl
                              sx={{
                                m: 1,
                                minWidth: 250,
                              }}
                            >
                              <Select
                                required
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={courseThree}
                                size="small"
                                onChange={handleCourseThreeChange}
                                error={error}

                              >
                                <MenuItem disabled value={0}>
                                  Select
                                </MenuItem>
                                {obj.courseList.map((course,index)=> (
                                <MenuItem key = {index}value={(index+1)*10}>
                                  {course.courseName}
                                </MenuItem>))}
                              </Select>
                            </FormControl>
                          </MDBCol>
                          {courseThree === 0 ? (
                            <></>
                          ) : (
                            <>
                              <hr />
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
                                  <MDBCardText>
                                    {courseThree === 0
                                      ? ""
                                      : obj.courseList[(courseThree - 10) / 10]
                                          .description}
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
                                    {courseThree === 0
                                      ? ""
                                      : obj.courseList[(courseThree - 10) / 10]
                                          .ects}
                                  </MDBCardText>
                                </FormControl>
                              </MDBCol>
                            </>
                          )}
                        </MDBRow>
                        <hr />
                        <MDBRow>
                          <MDBCol sm="3">
                            <MDBCardText>Course 4*</MDBCardText>
                          </MDBCol>
                          <MDBCol sm="9">
                            <FormControl
                              sx={{
                                m: 1,
                                minWidth: 250,
                              }}
                            >
                              <Select
                                required
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={courseFour}
                                size="small"
                                onChange={handleCourseFourChange}
                                error={error}

                              >
                                <MenuItem disabled value={0}>
                                  Select
                                </MenuItem>
                                {obj.courseList.map((course,index)=> (
                                <MenuItem key = {index}value={(index+1)*10}>
                                  {course.courseName}
                                </MenuItem>))}
                              </Select>
                            </FormControl>
                          </MDBCol>
                          {courseFour === 0 ? (
                            <></>
                          ) : (
                            <>
                              <hr />
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
                                  <MDBCardText>
                                    {courseFour === 0
                                      ? ""
                                      : obj.courseList[(courseFour - 10) / 10]
                                          .description}
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
                                    {courseFour === 0
                                      ? ""
                                      : obj.courseList[(courseFour - 10) / 10]
                                          .ects}
                                  </MDBCardText>
                                </FormControl>
                              </MDBCol>
                            </>
                          )}
                        </MDBRow>
                        <hr />
                        <MDBRow>
                          <MDBCol sm="3">
                            <MDBCardText>Course 5*</MDBCardText>
                          </MDBCol>
                          <MDBCol sm="9">
                            <FormControl
                              sx={{
                                m: 1,
                                minWidth: 250,
                              }}
                            >
                              <Select
                                required
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={courseFive}
                                size="small"
                                onChange={handleCourseFiveChange}
                                error={error}
                              >
                                <MenuItem disabled value={0}>
                                  Select
                                </MenuItem>
                                {obj.courseList.map((course,index)=> (
                                <MenuItem key = {index}value={(index+1)*10}>
                                  {course.courseName}
                                </MenuItem>))}
                              </Select>
                            </FormControl>
                          </MDBCol>
                          {courseFive === 0 ? (
                            <></>
                          ) : (
                            <>
                              <hr />
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
                                  <MDBCardText>
                                    {courseFive === 0
                                      ? ""
                                      : obj.courseList[(courseFive - 10) / 10]
                                          .description}
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
                                    {courseFive === 0
                                      ? ""
                                      : obj.courseList[(courseFive - 10) / 10]
                                          .ects}
                                  </MDBCardText>
                                </FormControl>
                              </MDBCol>
                            </>
                          )}
                        </MDBRow>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>
                {error ? (
                        <Alert severity="error">
                          Required places must be filled!
                        </Alert>
                      ) : null}

                <Grid container justifyContent={"center"}>
                  <Grid item xs={3}></Grid>
                  <Grid item xs={4}>
                    <Button
                      sx={{ margin: "auto" }}
                      variant="contained"
                      size="large"
                      onClick={handleCreateProposal}
                    >
                      Save
                    </Button>
                  </Grid>
                </Grid>
              </MDBContainer>
            </section>
          </Box>
        </Box>
      </Grid>
    </Stack>
  );
};
const mapStateToProps = state => {
  const universities = state.universities.universities;
  return {
    universities,
  };
};

ProposalPage.propTypes = {
  universities: PropTypes.array,
};

ProposalPage.defaultProps = {
  universities: [],
};

export default connect(mapStateToProps, {})(ProposalPage);
