import { Box, Button, FormControl, Grid, MenuItem, Modal, Select, Stack, Typography } from '@mui/material';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import SendIcon from '@mui/icons-material/Send';
import React from 'react';
import PropTypes from 'prop-types';

import { MDBCard, MDBCardBody, MDBCardText, MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit';
import RequestsTable from '../table/RequestsTable';

const FileRequestsForStudent = ({ fileRequests, deleteFileRequestRequest, createFileRequestRequest, userId }) => {

    const [open, setOpen] = React.useState(false);
    
    const [documentValue, setDocumentValue] = React.useState("");
  
  
    const handleDocumentChange = e => { 
        setDocumentValue(e.target.value);  
    };
    
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleCreateFileReq = () => {
        createFileRequestRequest(documentValue, userId);
        handleClose();
    };

    return (
        <Stack spacing={2}>
            <Grid container spacing={2}>
                <Grid item xs={8}>

                </Grid>
                <Grid item xs={4} >
                    <Button sx={{margin: 'auto'}} variant="contained" color="primary" size="medium" startIcon={<NoteAddIcon />} onClick={handleClickOpen} >
                        Request File
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
                                    Create Document Request
                                </Typography>
                            <Stack alignItems={"center"} spacing={3}>
                                <section style={{ width: '100%', backgroundColor: '#eee' }}>
                                    <MDBContainer className="py-5">
                                    <MDBCard className="mb-4">
                                    <MDBCardBody>
                                        <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>Document Type</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <FormControl  sx={{ m: 1, minWidth: 250 }}>
                                                <Select
                                                    required
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={documentValue}
                                                    size="small"
                                                    onChange={handleDocumentChange}
                                                >
                                                    <MenuItem disabled value={0}>Select</MenuItem>
                                                    <MenuItem value={"Acceptance Letter"}>Acceptance Letter</MenuItem>
                                                    <MenuItem value={"Learning Agreement"}>Learning Agreement</MenuItem>
                                                </Select>
                                            </FormControl>   
                                        </MDBCol>
                                        </MDBRow> 
                                    </MDBCardBody>
                                    </MDBCard>
                                        </MDBContainer>
                                    </section>
                                    <Grid container justifyContent={"center"}>
                                        <Grid item xs={3}></Grid>
                                        <Grid item xs={4}>
                                            <Button sx={{margin: 'auto'}} variant="contained" color="success" size="medium" startIcon={<SendIcon />} onClick={handleCreateFileReq} >
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
            <RequestsTable requests={fileRequests} deleteFileRequestRequest={deleteFileRequestRequest}  isStaff={false} />
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

FileRequestsForStudent.propTypes = {
    fileRequests: PropTypes.array,
    deleteFileRequestRequest: PropTypes.func,
    createFileRequestRequest: PropTypes.func,
    userId: PropTypes.string,
};
  
FileRequestsForStudent.defaultProps = {
    courseRequests: [],
};

export default FileRequestsForStudent;