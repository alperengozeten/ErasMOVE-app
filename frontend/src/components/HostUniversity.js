import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import ExcelReader from "./ExcelReader";
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
  Button,
  Tab,
  FormControl,
  Grid,
  MenuItem,
  Modal,
  Select,
  Stack,
  Typography,
  TextField,
} from "@mui/material";

const Universities = () => {
  const [value, setValue] = React.useState("0");
  const [open, setOpen] = React.useState(false);
  const [courseOpen, setCourseOpen] = React.useState(false);
  const [courseName, setCourseName] = React.useState("");
  const [departmentName, setDepartmentName] = React.useState("");
  const [description, setDescription] = React.useState("");

  const [departmentValue, setDepartmentValue] = React.useState(0);
  const [instructorValue, setInstructorValue] = React.useState(0);
  const [facultyValue, setFacultyValue] = React.useState(0);
  const [ects, setEcts] = React.useState(0);

  const handleDepartmentChange = e => {
    setDepartmentValue(e.target.value);
  };
  const handleEctsChange = e => setEcts(e.target.value);

  const handleDescriptionChange = e => setDescription(e.target.value);

  const handleDepartmentNameChange = e => setDepartmentName(e.target.value);

  const handleCourseNameChange = e => setCourseName(e.target.value);
  const handleInstructorChange = e => setInstructorValue(e.target.value);
  const handleFacultyChange = e => setFacultyValue(e.target.value);
  function printArray(item) {
    return [item] + ", ";
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCourseClickOpen = () => {
    setCourseOpen(true);
  };

  const handleCourseClose = () => {
    setCourseOpen(false);
  };
  const dummyUni = {
    id: 1,
    name: "Bilkent University",
    departments: ["CS", "EEE", "MBG", "ME", "IE", "POLS", "MAN"],
    courses: [
      "CS101",
      "CS102",
      "CS223",
      "IE400",
      "IE270",
      "ME101",
      "ME102",
      "EEE101",
      "EEE102",
      "MBG110",
      "IBG202",
    ],
  };

  const handleChange = (event, newValue) => {
    setValue(`${newValue}`);
  };
  return (
    <Stack spacing={2}>
      <Typography
        gutterBottom
        variant="h1"
        textAlign={"center"}
        component="div"
      >
        Host University
      </Typography>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ width: "100%", height: "100%" }}
      >
        <Box sx={{ width: "90%", height: "90%" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={handleChange}>
                <Tab label="University" value={"0"} />
                <Tab label="Upload Application List" value={"1"} />
              </TabList>
            </Box>
            <TabPanel value="0" index={0}>
              <Box sx={{ flexGrow: 1 }}>
                <section style={{ backgroundColor: "#eee" }}>
                  <MDBContainer className="py-5">
                    <MDBRow>
                      <MDBCol lg="12">
                        <MDBCard className="mb-4">
                          <MDBCardBody>
                            <MDBRow>
                              <MDBCol sm="3">
                                <MDBCardText>Name</MDBCardText>
                              </MDBCol>
                              <MDBCol sm="9">
                                <MDBCardText className="text-muted">
                                  {dummyUni.name}
                                </MDBCardText>
                              </MDBCol>
                            </MDBRow>
                           
                            <hr />
                            <MDBRow>
                              <MDBCol sm="3">
                                <MDBCardText>Departments</MDBCardText>
                              </MDBCol>
                              <MDBCol sm="6">
                                <MDBCardText className="text-muted">
                                  {dummyUni.departments.map(printArray)}
                                </MDBCardText>
                              </MDBCol>
                              <MDBCol sm="3">
                                <Button
                                  variant="contained"
                                  size="medium"
                                  onClick={handleClickOpen}
                                >
                                  Add Department
                                </Button>
                              </MDBCol>
                            </MDBRow>
                            <hr />
                            <MDBRow>
                              <MDBCol sm="3">
                                <MDBCardText>Courses</MDBCardText>
                              </MDBCol>
                              <MDBCol sm="6">
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
                                    value={departmentValue}
                                    size="small"
                                    onChange={handleDepartmentChange}
                                  >
                                    <MenuItem disabled value={0}>
                                      Select
                                    </MenuItem>
                                    <MenuItem value={10}>CS</MenuItem>
                                    <MenuItem value={20}>EEE</MenuItem>
                                    <MenuItem value={30}>ME</MenuItem>
                                    <MenuItem value={40}>MBG</MenuItem>
                                    <MenuItem value={50}>IE</MenuItem>
                                  </Select>
                                </FormControl>
                              </MDBCol>
                              <MDBCol sm="3">
                                <Button
                                  variant="contained"
                                  size="medium"
                                  onClick={handleCourseClickOpen}
                                >
                                  Add Course
                                </Button>
                              </MDBCol>
                              <MDBCol sm="9">
                                <MDBCardText></MDBCardText>
                              </MDBCol>
                            </MDBRow>
                           
                          </MDBCardBody>
                        </MDBCard>
                      </MDBCol>
                    </MDBRow>
                  </MDBContainer>
                </section>
              </Box>
            </TabPanel>
            <TabPanel value="1" index={1}>
              <Box sx={{ flexGrow: 1 }}>
                <ExcelReader />
              </Box>
            </TabPanel>
          </TabContext>
        </Box>
      </Grid>
      <Modal
        open={courseOpen}
        onClose={handleCourseClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack spacing={6}>
            <Typography
              id="modal-modal-title"
              textAlign={"center"}
              variant="h2"
              component="h1"
            >
              Add Course
            </Typography>
            <Stack alignItems={"center"} spacing={3}>
              <section
                style={{
                  width: "100%",
                  backgroundColor: "#eee",
                }}
              >
                <MDBContainer className="py-5">
                  <MDBCard className="mb-4">
                    <MDBCardBody>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Department</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <FormControl
                            sx={{
                              minWidth: 250,
                            }}
                          >
                            <Select
                              required
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={departmentValue}
                              size="small"
                              onChange={handleDepartmentChange}
                            >
                              <MenuItem disabled value={0}>
                                Select
                              </MenuItem>
                              <MenuItem value={10}>CS</MenuItem>
                              <MenuItem value={20}>EEE</MenuItem>
                              <MenuItem value={30}>ME</MenuItem>
                              <MenuItem value={40}>MBG</MenuItem>
                              <MenuItem value={50}>IE</MenuItem>
                            </Select>
                          </FormControl>
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Course Name</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <TextField
                            id="outlined-multiline-flexible"
                            value={courseName}
                            onChange={handleCourseNameChange}
                            disabled={departmentValue ? false : true}
                          />
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Description</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <TextField
                            id="outlined-multiline-flexible"
                            fullWidth
                            value={description}
                            onChange={handleDescriptionChange}
                            disabled={departmentValue ? false : true}
                          />
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>ECTS</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <TextField
                            id="outlined-multiline-flexible"
                            type={"number"}
                            value={ects}
                            onChange={handleEctsChange}
                            disabled={departmentValue ? false : true}
                          />
                        </MDBCol>
                      </MDBRow>
                    </MDBCardBody>
                  </MDBCard>
                </MDBContainer>
              </section>
              <Grid container justifyContent={"center"}>
                <Grid item xs={3}></Grid>
                <Grid item xs={4}>
                  <Button
                    sx={{ margin: "auto" }}
                    variant="contained"
                    color="success"
                    size="medium"
                    onClick={handleCourseClose}
                  >
                    Add
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button
                    sx={{ margin: "auto" }}
                    variant="contained"
                    color="error"
                    size="medium"
                    onClick={handleCourseClose}
                  >
                    Close
                  </Button>
                </Grid>
                <Grid item xs={1}></Grid>
              </Grid>
            </Stack>
          </Stack>
        </Box>
      </Modal>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack spacing={6}>
            <Typography
              id="modal-modal-title"
              textAlign={"center"}
              variant="h2"
              component="h1"
            >
              Add Department
            </Typography>
            <Stack alignItems={"center"} spacing={3}>
              <section
                style={{
                  width: "100%",
                  backgroundColor: "#eee",
                }}
              >
                <MDBContainer className="py-5">
                  <MDBCard className="mb-4">
                    <MDBCardBody>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Department Name</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <TextField
                            id="outlined-multiline-flexible"
                            value={departmentName}
                            onChange={handleDepartmentNameChange}
                          />
                        </MDBCol>
                      </MDBRow>
                    </MDBCardBody>
                  </MDBCard>
                </MDBContainer>
              </section>
              <Grid container justifyContent={"center"}>
                <Grid item xs={3}></Grid>
                <Grid item xs={4}>
                  <Button
                    sx={{ margin: "auto" }}
                    variant="contained"
                    color="success"
                    size="medium"
                    onClick={handleClose}
                  >
                    Add
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button
                    sx={{ margin: "auto" }}
                    variant="contained"
                    color="error"
                    size="medium"
                    onClick={handleClose}
                  >
                    Close
                  </Button>
                </Grid>
                <Grid item xs={1}></Grid>
              </Grid>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </Stack>
  );
};
const mapStateToProps = state => {
  const universities = state.universities.universities;
  return {
    universities,
  };
};

Universities.propTypes = {
  universities: PropTypes.array,
};

Universities.defaultProps = {
  universities: [],
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

export default connect(mapStateToProps, {})(Universities);
