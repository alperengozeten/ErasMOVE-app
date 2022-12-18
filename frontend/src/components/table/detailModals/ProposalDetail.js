import { Button, Grid,FormControl, Modal, Typography,Tooltip } from '@mui/material';
import { Box, Stack } from '@mui/system';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
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

const ProposalDetail = ({ openDetails, handleCloseDetails,status,name }) => {
    const [openAccept, setOpenAccept] = React.useState(false);
    const [openDecline, setOpenDecline] = React.useState(false);
    const handleOpenAccept = () => { 
        setOpenAccept(true);
      };
      const handleOpenDecline= () => { 
        setOpenDecline(true);
      };
      const handleCloseAcceptAndDecline = () => { 
        setOpenDecline(false);
        setOpenAccept(false);
      };
      const handleAccept= () => { 
        //TODO
    
        setOpenAccept(false);
      };
      const handleDecline= () => { 
        //TODO
        setOpenDecline(false);
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
                  
                  <Grid item xs={4}>
                    
                <Tooltip describeChild title="Accept proposal">
                            <Button variant="contained" size="small" color="success" onClick={() => handleOpenAccept() }>
                              Accept
                            </Button>
                          </Tooltip>
                          <Tooltip describeChild title="Decline proposal">
                            <Button variant="contained" size="small"color="error" onClick={() => handleOpenDecline() }>
                              Decline
                            </Button>
                          </Tooltip>
                  <Button
                    sx={{ margin: "auto" }}
                    variant="contained"
                    color="inherit"
                    size="small"
                    onClick={handleCloseDetails}
                  >
                    Close
                  </Button>
                </Grid>
                </Grid>
                <Modal
            open={openAccept}
            onClose={handleCloseAcceptAndDecline}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            BackdropProps={{ style: { backgroundColor: "rgba(0, 0, 0, 0.2)" } }}
        >
            <Box sx={style}>
                <Stack spacing={6}>
                    <Typography id="modal-modal-title" textAlign={"center"}
                        variant="h2" component="h1">
                        Accept {name}
                    </Typography>
                    <Stack alignItems={"center"} spacing={3}>
                        <Typography id="modal-modal-title" textAlign={"center"}
                            variant="body1" fontSize={18} component="h1">
                            You can not take it back after you accept it. Do you want to accept {name}?
                        </Typography>
                    </Stack>
                    <Stack alignItems={"flex-end"}>
                        <Grid container justifyContent={"flex-end"} spacing={2}>
                            <Grid item xs={4}></Grid>
                            <Grid justifyContent={"flex-end"} item xs={4}>
                            </Grid>
                            <Grid item container spacing={5}   xs={4}>
                                <Grid item xs={4}>
                                    <Button variant="contained" startIcon={<ArrowBackIcon /> } color="primary" size="medium" onClick={handleCloseAcceptAndDecline} >
                                        Back
                                    </Button>
                                </Grid>
                                <Grid item xs={4}>
                                    <Button variant="contained"  color="success" size="medium" onClick={handleAccept} >
                                        Accept
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>   
                    </Stack>
                </Stack>
            </Box>
        </Modal>
        <Modal
            open={openDecline}
            onClose={handleCloseAcceptAndDecline}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            BackdropProps={{ style: { backgroundColor: "rgba(0, 0, 0, 0.2)" } }}
        >
            <Box sx={style}>
                <Stack spacing={6}>
                    <Typography id="modal-modal-title" textAlign={"center"}
                        variant="h2" component="h1">
                        Decline {name}
                    </Typography>
                    <Stack alignItems={"center"} spacing={3}>
                        <Typography id="modal-modal-title" textAlign={"center"}
                            variant="body1" fontSize={18} component="h1">
                            You can not take it back after you accept it. Do you want to decline {name}?
                        </Typography>
                    </Stack>
                    <Stack alignItems={"flex-end"}>
                        <Grid container justifyContent={"flex-end"} spacing={2}>
                            <Grid item xs={4}></Grid>
                            <Grid justifyContent={"flex-end"} item xs={4}>
                            </Grid>
                            <Grid item container spacing={5}   xs={4}>
                                <Grid item xs={4}>
                                    <Button variant="contained" startIcon={<ArrowBackIcon /> } color="primary" size="medium" onClick={handleCloseAcceptAndDecline} >
                                        Back
                                    </Button>
                                </Grid>
                                <Grid item xs={4}>
                                    <Button variant="contained" color="error" size="medium" onClick={handleDecline} >
                                        Decline
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>   
                    </Stack>
                </Stack>
            </Box>
        </Modal>
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
  
  ProposalDetail.propTypes = {
    openDetails: PropTypes.bool,

    status: PropTypes.string,
    name: PropTypes.string,

    handleCloseDetails: PropTypes.func,

};
  
ProposalDetail.defaultProps = {
    openDetails: false,

    handleCloseDetails: f => f,
};

export default ProposalDetail;
