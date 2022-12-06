import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Modal, Select, Stack, TextField, Typography } from '@mui/material';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import SendIcon from '@mui/icons-material/Send';
import React from 'react';
import PropTypes from 'prop-types';

import { sendReplacementOffer } from '../../actions';
import CourseRequestTableForStudents from '../table/CourseRequestTableForStudents';

const CourseRequests = ({ courseRequests }) => {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(0);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = e => setValue(e.target.value);


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
                                    <Box>
                                        <TextField id="outlined-basic" label="Course Name" variant="outlined" />   
                                    </Box>
                                    <Box>
                                        <TextField id="outlined-basic" label="Description" variant="outlined" />
                                    </Box>
                                    <Box>
                                    <FormControl variant="standard" sx={{ m: 1, minWidth: 160 }}>
                                        <InputLabel id="demo-simple-select-label">Course Coordiantor</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={value}
                                            label="Age"
                                            onChange={handleChange}
                                        >
                                            <MenuItem disabled value={0}>Select</MenuItem>
                                            <MenuItem value={10}>Can Alkan</MenuItem>
                                            <MenuItem value={20}>Eray Hoca</MenuItem>
                                            <MenuItem value={30}>Aynur Dayanık</MenuItem>
                                        </Select>
                                    </FormControl>
                                    </Box>
                                </Stack>
                                <Box alignItems={"end"}>
                                    <Button sx={{margin: 'auto'}} variant="contained" color="success" size="medium" startIcon={<SendIcon />} onClick={handleOpen} >
                                        Create New Course Request
                                    </Button>
                                </Box>
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
    width: '70%',
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