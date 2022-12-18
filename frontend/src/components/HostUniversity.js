import React, { useEffect } from "react";
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

import { getDepartments, addHostDepartment, addCourseToDepartmentRequest } from '../actions';

const Universities = ({ getDepartments, departments, addHostDepartment, addCourseToDepartmentRequest }) => {
  useEffect(() => {
    getDepartments();
}, [ getDepartments]);
  const [value, setValue] = React.useState("0");
  const [open, setOpen] = React.useState(false);
  const [courseOpen, setCourseOpen] = React.useState(false);
  const [courseName, setCourseName] = React.useState("");
  const [departmentName, setDepartmentName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [ects, setEcts] = React.useState(0);
  const [departmentSelected, setDepartmentSelected] = React.useState(0);
  const [type, setType] = React.useState('');

  const handleDepartmentSelectedChange = e => {
    setDepartmentSelected(e.target.value);
  };
  const handleEctsChange = e => setEcts(e.target.value);

  const handleDescriptionChange = e => setDescription(e.target.value);

  const handleDepartmentNameChange = e => setDepartmentName(e.target.value);

  const handleCourseNameChange = e => setCourseName(e.target.value);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCourseClickOpen = type => {
    setCourseOpen(true);
    setType(type);
  };

  const handleCourseClose = () => {
    setCourseOpen(false);
    setType("");
    setCourseName("");
    setDescription("");
    setEcts(0);
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

  const handleAddDepartment = () => {
    addHostDepartment(departmentName);
    setDepartmentName('');
    handleClose();
  };

  const handleAddCourse = () => {
    const course = {
      courseName,
      description,
      ects,
    };
    addCourseToDepartmentRequest(course, departmentSelected, type);
    handleCourseClose();
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
                              {departments.map((department,index) => (<MDBCardText key={index} className="text-muted">
                                  {department.departmentName}
                                </MDBCardText>))}
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
                            </MDBCardBody>
                        </MDBCard>
                        <MDBCard className="mb-4">
                          <MDBCardBody>
                            <MDBRow>
                              <MDBCol sm="12">
                                <MDBCardText>Courses</MDBCardText>
                              </MDBCol>
                            </MDBRow>
                            <hr />
                            <MDBRow>
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
                                    value={departmentSelected}
                                    size="small"
                                    onChange={handleDepartmentSelectedChange}
                                  >
                                    <MenuItem disabled value={0}>
                                      Department
                                    </MenuItem>
                                    {departments.map((department,index) => (<MenuItem key={index} value={department.id}>{department.departmentName}</MenuItem>))}
                       
                                  </Select>
                                </FormControl>
                              </MDBCol>
                            </MDBRow>
                            <hr />
                            <MDBRow>
                              <MDBCol sm="3">
                                <MDBCardText>Mandatory Courses</MDBCardText>
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
                                    value={departmentSelected}
                                    size="small"
                                    onChange={handleDepartmentSelectedChange}
                                    disabled={departmentSelected ? false : true}
                                  >
                                    <MenuItem disabled value={0}>
                                      Courses
                                    </MenuItem>
                                    {departments.filter(dep => dep.id === departmentSelected)[0]?.courseList?.map((course,index) => (<MenuItem key={index} disabled value={(index+1)*10}>{course.courseName}</MenuItem>))}
                       
                                  </Select>
                                </FormControl>
                              </MDBCol>
                              <MDBCol sm="3">
                                <Button
                                  variant="contained"
                                  size="medium"
                                  onClick={() => handleCourseClickOpen("Mandatory")}
                                >
                                  Add Course
                                </Button>
                              </MDBCol>
                              <MDBCol sm="9">
                                <MDBCardText></MDBCardText>
                              </MDBCol>
                            </MDBRow>
                            <hr />
                            <MDBRow>
                              <MDBCol sm="3">
                                <MDBCardText>Elective Courses</MDBCardText>
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
                                    value={departmentSelected}
                                    size="small"
                                    onChange={handleDepartmentSelectedChange}
                                    disabled={departmentSelected ? false : true}
                                  >
                                    <MenuItem disabled value={0}>
                                      Courses
                                    </MenuItem>
                                    {departments.filter(dep => dep.id === departmentSelected)[0]?.electiveCourseList?.map((course,index) => (<MenuItem key={index} disabled value={(index+1)*10}>{course.courseName}</MenuItem>))}
                                  </Select>
                                </FormControl>
                              </MDBCol>
                              <MDBCol sm="3">
                                <Button
                                  variant="contained"
                                  size="medium"
                                  onClick={() => handleCourseClickOpen("Elective")}
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
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Course Name</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <TextField
                            id="outlined-multiline-flexible"
                            value={courseName}
                            onChange={handleCourseNameChange}
                            disabled={departmentSelected ? false : true}
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
                            disabled={departmentSelected ? false : true}
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
                            disabled={departmentSelected ? false : true}
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
                    onClick={handleAddCourse}
                    disabled={ects === 0 || description ==="" || courseName ==="" }
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
                    onClick={handleAddDepartment}
                    disabled={departmentName ===""}
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
  const departments = state.universities.hostUniDepartments;
  return {
    universities,
    departments,
  };
};

const mapActionsToProps = {
  getDepartments,
  addHostDepartment,
  addCourseToDepartmentRequest,
};

Universities.propTypes = {
  universities: PropTypes.array,
  getDepartments: PropTypes.func,
  departments: PropTypes.array,
  addHostDepartment: PropTypes.func,
  addCourseToDepartmentRequest: PropTypes.func,
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

export default connect(mapStateToProps, mapActionsToProps)(Universities);


