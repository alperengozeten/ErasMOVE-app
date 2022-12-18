import React from "react";
import PropTypes from "prop-types";
// @mui
import { styled } from "@mui/material/styles";
import {
  Toolbar,
  Grid,
  Button,
  Alert,
  Tooltip,
  Typography,
} from "@mui/material";
import { connect } from "react-redux";
import Box from "@mui/material/Box";
import { useState } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  Modal,
  Stack,
} from "@mui/material";

import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCol,
  MDBContainer,
  MDBRow,
} from "mdb-react-ui-kit";
import NoteAddIcon from "@mui/icons-material/NoteAdd";



// ----------------------------------------------------------------------

const StyledRoot = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: "flex",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1, 0, 3),
}));

// ----------------------------------------------------------------------

const ProposalPageListToolbar = () => {
  const [open, setOpen] = useState(false);
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
    } else{
    setError(false);
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



  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <StyledRoot
      sx={{
        ...( {
          color: "primary.main",
          bgcolor: "primary.lighter",
        }),
      }}
    >
      <Grid container>
        <Grid item xs={4}>
         
        </Grid>
        <Grid item xs={5}></Grid>
        <Grid item xs={3} align="right">
          <Tooltip describeChild title="Create New Proposal">
            <Button
                     sx={{ margin: "auto" }}
                     variant="contained"
                     color="primary"
                     size="medium"
                     startIcon={<NoteAddIcon />}
                     onClick={handleClickOpen}
            >
              Create New Proposal
            </Button>
          </Tooltip>
        </Grid>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
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
        Create Course Proposal
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
                      {!(courseFive===0)&& !(courseFour===0)&&!(courseThree===0)&&!(courseTwo===0)&&!(courseOne===0) && (courseFive===courseOne||courseFive===courseTwo || courseFive===courseThree||courseFive===courseFour || courseFour===courseOne||courseFour===courseTwo || courseFour===courseThree||courseThree===courseOne||courseThree===courseTwo || courseTwo===courseOne)? (
                        <Alert severity="error">
                          You cannot select one course more than one times!
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
                  <Grid item xs={4}>
                  <Button
                    sx={{ margin: "auto" }}
                    variant="contained"
                    color="error"
                    size="large"
                    onClick={handleClose}
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
    </StyledRoot>
  );
};

const mapStateToProps = state => {
  const authType = state.auth.authType;
  return {
    authType,
  };
};

ProposalPageListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
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
  

export default connect(mapStateToProps, {})(ProposalPageListToolbar);
