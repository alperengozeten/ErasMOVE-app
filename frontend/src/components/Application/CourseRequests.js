import { Box, Button, FormControl, FormControlLabel, Grid, MenuItem, Modal, Radio, RadioGroup, Select, Stack, TextField, Typography } from '@mui/material';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import SendIcon from '@mui/icons-material/Send';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import React from 'react';
import PropTypes from 'prop-types';

import { sendReplacementOffer } from '../../actions';
import CourseRequestTableForStudents from '../table/CourseRequestTableForStudents';
import { MDBCard, MDBCardBody, MDBCardText, MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit';

const CourseRequests = ({ deleteCourseApprovalRequestRequest, courseRequests, createCourseApprovalRequestRequest, getCoursesByDepartment, hostUniDepartments }) => {

    const [open, setOpen] = React.useState(false);
    
    const [departmentValue, setDepartmentValue] = React.useState(0);
    const [courseValue, setCourseValue] = React.useState(0);
    const [isElective, setIsElective] = React.useState(false);
    const [courseName, setCourseName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [ects, setEcts] = React.useState(0);



    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleDepartmentChange = e => { 
        setDepartmentValue(e.target.value);
        setCourseValue(0);

        // Send an action to get related course
        const university = 'Bilkent University'; // TODO: get from reducer
        const type = 'Exchange'; // TODO: get from reducer
        getCoursesByDepartment(type, departmentValue, university); 
    };
    
    const handleCourseChange = e => setCourseValue(e.target.value);

    const handleCourseNameChange = e => setCourseName(e.target.value);

    const handleDescriptionChange = e => setDescription(e.target.value);

    const handleEctsChange = e => setEcts(e.target.value);

    const handleElectiveChange = e => setIsElective(e.target.value);

    const handleCreateCourseRequest = () => {
        const type = isElective ? 'Elective' : 'Mandatory';
        const courseRequest = {
            // TODO: remove these when connecto API
            id: 12,
            type,
            courseCoordinator: 'XXX hoca',
            status: 'WAITING',
            
            courseName,
            description,
            ects,
            department: departmentValue,
            equivalentCourse: courseValue,
            syllabus: null,

        };
        createCourseApprovalRequestRequest(courseRequest, type);
        handleClose();
    };

    return (
        <Stack spacing={2}>
            <Grid container spacing={2}>
                <Grid item xs={8}>

                </Grid>
                <Grid item xs={4} >
                    <Button sx={{margin: 'auto'}} variant="contained" color="primary" size="medium" startIcon={<NoteAddIcon />} onClick={handleOpen} >
                        Create New Course Request
                    </Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Stack spacing={6}>
                                <Typography id="modal-modal-title" textAlign={"center"}
                                    variant="h2" component="h1">
                                    Create Course Request
                                </Typography>
                            <Stack alignItems={"center"} spacing={3}>
                                <section style={{ width: '100%', backgroundColor: '#eee' }}>
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
                                            />     
                                        </MDBCol>
                                        </MDBRow>
                                        <hr />
                                        <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>Type</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <FormControl>
                                                <RadioGroup
                                                    row
                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                    defaultValue={false}
                                                    name="radio-buttons-group"
                                                    value={isElective}
                                                    onChange={handleElectiveChange}
                                                >
                                                    <FormControlLabel value={false} control={<Radio />} label="Must" />
                                                    <FormControlLabel value={true} control={<Radio />} label="Elective" />
                                                </RadioGroup>
                                            </FormControl>
                                        </MDBCol>
                                        </MDBRow>
                                        <hr />
                                        <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>Department</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <FormControl  sx={{ m: 1, minWidth: 250 }}>
                                                <Select
                                                    required
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={departmentValue}
                                                    size="small"
                                                    onChange={handleDepartmentChange}
                                                >
                                                    <MenuItem disabled value={0}>Select</MenuItem>
                                                    {hostUniDepartments.map(dep => (<MenuItem key={dep.id} value={dep.id}>{dep.departmentName}</MenuItem>))}
                                                </Select>
                                            </FormControl>   
                                        </MDBCol>
                                        </MDBRow>
                                        <hr />
                                        <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>Equivalent Course</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <FormControl  sx={{ m: 1, minWidth: 140 }}>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={courseValue}
                                                    size="small"
                                                    onChange={handleCourseChange}
                                                    disabled={departmentValue ? false : true }
                                                >
                                                    <MenuItem disabled value={0}>Select</MenuItem>
                                                    {hostUniDepartments.filter(dep => dep.id === departmentValue)[0]?.courseList?.map(course => (<MenuItem key={course.id} value={course.id}>{course.courseName}</MenuItem>))}
                                                </Select>
                                            </FormControl>   
                                        </MDBCol>
                                        </MDBRow>
                                        <hr />
                                        <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>Syllabus</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <Button startIcon={<UploadFileIcon />} variant="contained" component="label">
                                                Upload Syllabus
                                                <input hidden accept="image/*" multiple type="file" />
                                            </Button>
                                        </MDBCol>
                                        </MDBRow>
                                    </MDBCardBody>
                                    </MDBCard>

                                     
                                        </MDBContainer>
                                    </section>
                                    <Grid container justifyContent={"center"}>
                                        <Grid item xs={3}></Grid>
                                        <Grid item xs={4}>
                                            <Button sx={{margin: 'auto'}} variant="contained" color="success" size="medium" startIcon={<SendIcon />} onClick={handleCreateCourseRequest} >
                                                Create 
                                            </Button>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Button sx={{margin: 'auto'}} variant="contained" color="error" size="medium" onClick={handleClose} >
                                                Close
                                            </Button>
                                        </Grid>
                                        <Grid item xs={1}></Grid>
                                    </Grid>
                                </Stack>
                            </Stack>
                        </Box>
                    </Modal>
                </Grid>
            </Grid>
            <CourseRequestTableForStudents deleteCourseApprovalRequestRequest={deleteCourseApprovalRequestRequest} courseRequests={courseRequests} sendReplacementOffer={sendReplacementOffer}  />
        </Stack>
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


CourseRequests.propTypes = {
    courseRequests: PropTypes.array,
    deleteCourseApprovalRequestRequest: PropTypes.func,
    createCourseApprovalRequestRequest: PropTypes.func,
    getCoursesByDepartment: PropTypes.func,
    getDepartments: PropTypes.func,
    hostUniDepartments: PropTypes.array,
};
  
CourseRequests.defaultProps = {
    courseRequests: [],
};

export default CourseRequests;