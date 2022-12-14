import React from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
} from "mdb-react-ui-kit";
import { Box, Button, FormControl, Grid, MenuItem, Modal, Select, Stack, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

export default function ProfileApplicationPage() {
  const [open, setOpen] = React.useState(false);
    
  const [documentValue, setDocumentValue] = React.useState(0);
  const [courseValue, setCourseValue] = React.useState(0);


  const handleDocumentChange = e => { 
      setDocumentValue(e.target.value);
      setCourseValue(0);

  };
  
  const handleCourseChange = e => setCourseValue(e.target.value);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const dummyStudent = {
    id: 2,
    name: "Kürşad Güzelkaya",
    type: "Erasmus",
    department: "Computer Science",
    selectedUniversities: [],
    selectedSemester: "Fall",
    score: 77,
    status: "Waiting",
    admittedUniversity: null,
    documents: [],
  };
  return (
    <section style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol lg="12">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Type</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {dummyStudent.type}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Status</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {dummyStudent.status}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Admitted University</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {dummyStudent.admittedUniversity == null
                        ? "-"
                        : dummyStudent.admittedUniversity}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Semester</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {dummyStudent.selectedSemester}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Languages</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">German</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Next Step</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      Acceptance Letter
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>

            <MDBRow>
              <MDBCol md="12">
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody>
                    <MDBCol sm="3">
                      <MDBCardText className="mb-4">Documents</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                        <Button
                          variant="contained"
                          size="medium"
                          onClick={handleClickOpen}
                        >
                          Request Document
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
                                        <hr />
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
                                                    <MenuItem value={10}>Acceptance Letter</MenuItem>
                                                    <MenuItem value={20}>Language Proficiency</MenuItem>
                                                    <MenuItem value={30}>Transcript</MenuItem>
                                                </Select>
                                            </FormControl>   
                                        </MDBCol>
                                        </MDBRow>
                                        <hr />
                                        <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>Request From</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <FormControl  sx={{ m: 1, minWidth: 140 }}>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={courseValue}
                                                    size="small"
                                                    onChange={handleCourseChange}
                                                    disabled={documentValue ? false : true }
                                                >
                                                    <MenuItem disabled value={0}>Select</MenuItem>
                                                    <MenuItem value={10}>Yelda Ateş</MenuItem>
                                                    <MenuItem value={20}>Can Alkan</MenuItem>
                                                    <MenuItem value={30}>Eray Tüzün</MenuItem>
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
                                            <Button sx={{margin: 'auto'}} variant="contained" color="success" size="medium" startIcon={<SendIcon />} onClick={handleClose} >
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
                    </MDBCol>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      
    </section>
  );
}
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
