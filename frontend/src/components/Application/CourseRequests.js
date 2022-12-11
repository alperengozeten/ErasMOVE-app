import { Box, Button, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, MenuItem, Modal, Radio, RadioGroup, Select, Stack, TextField, Typography } from '@mui/material';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import SendIcon from '@mui/icons-material/Send';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import React from 'react';
import PropTypes from 'prop-types';

import { sendReplacementOffer } from '../../actions';
import CourseRequestTableForStudents from '../table/CourseRequestTableForStudents';

const CourseRequests = ({ courseRequests }) => {
    const [open, setOpen] = React.useState(false);
    
    const [departmentValue, setDepartmentValue] = React.useState(0);
    const [courseValue, setCourseValue] = React.useState(0);
    const [isElective, setIsElective] = React.useState(false);


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleDepartmentChange = e => { 
        setDepartmentValue(e.target.value);
        setCourseValue(0);

        // Send an action to get related course
    };
    
    const handleCourseChange = e => setCourseValue(e.target.value);

    const handleElectiveChange = e => setIsElective(e.target.value);

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
                                    <Grid container spacing={2} width={"90%"} >
                                        <Grid item xs={6} >
                                            <Stack spacing={4   }>
                                                <Box alignItems={"center"}>
                                                    <TextField size='small' id="outlined-basic" label="Course Name" variant="outlined" />   
                                                </Box>
                                                <Box alignItems={"center"}>
                                                    <TextField size="small" id="outlined-basic" label="Description" variant="outlined" />
                                                </Box>
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Stack spacing={2}>
                                                <Box>
                                                    <FormControl  sx={{ m: 1, minWidth: 160 }}>
                                                        <InputLabel id="demo-simple-select-label">Department</InputLabel>
                                                        <Select
                                                            required
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            value={departmentValue}
                                                            size="small"
                                                            label="Department"
                                                            onChange={handleDepartmentChange}
                                                        >
                                                            <MenuItem disabled value={0}>Select</MenuItem>
                                                            <MenuItem value={10}>Computer Science</MenuItem>
                                                            <MenuItem value={20}>Electrical Engineering</MenuItem>
                                                            <MenuItem value={30}>Mechanical Engineering</MenuItem>
                                                        </Select>
                                                    </FormControl>       
                                                </Box>
                                                
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
                                            </Stack>
                                        </Grid>

                                        <Grid container sx={{marginTop: '10px'}} justifyContent={'center'} spacing={2}>
                                            <Grid item xs={6}>
                                                <Box>
                                                    <FormControl  sx={{ m: 1, minWidth: 160 }}>
                                                        <InputLabel id="demo-simple-select-label">Equivalent Course</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            value={courseValue}
                                                            size="small"
                                                            label="Equivalent Course"
                                                            onChange={handleCourseChange}
                                                            disabled={departmentValue ? false : true }
                                                        >
                                                            <MenuItem disabled value={0}>Select</MenuItem>
                                                            <MenuItem value={10}>CS319</MenuItem>
                                                            <MenuItem value={20}>CS315</MenuItem>
                                                            <MenuItem value={30}>CS102</MenuItem>
                                                        </Select>
                                                    </FormControl>       
                                                </Box>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Button startIcon={<UploadFileIcon />} variant="contained" component="label">
                                                    Upload Syllabus
                                                    <input hidden accept="image/*" multiple type="file" />
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    
                                   
                                    
                                </Stack>
                                <Stack alignItems={"flex-end"}>
                                    <Button sx={{margin: 'auto'}} variant="contained" color="success" size="medium" startIcon={<SendIcon />} onClick={handleOpen} >
                                        Create New Course Request
                                    </Button>
                                </Stack>
                            </Stack>
                        </Box>
                    </Modal>
                </Grid>
            </Grid>
            <CourseRequestTableForStudents courseRequests={courseRequests} sendReplacementOffer={sendReplacementOffer}  />
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
};


CourseRequests.propTypes = {
    courseRequests: PropTypes.array,
};
  
CourseRequests.defaultProps = {
    courseRequests: [],
};

export default CourseRequests;