import React from "react";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import PropTypes from "prop-types";

// @mui
import { styled } from "@mui/material/styles";
import {
  Toolbar,
  Typography,
  Button,
  Grid,
  Tooltip,
} from "@mui/material";
import { MDBCard, MDBCardBody, MDBCardText, MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
// component

// ----------------------------------------------------------------------

const StyledRoot = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: "flex",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1, 0, 3),
}));

// ----------------------------------------------------------------------

export default function AnnouncementToolbar({ createAnnouncementRequest, authType, userId, user }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateAnnouncement = () => {
    createAnnouncementRequest({title, description, departmentCoordinator: { id: Number(userId) }}, user.department.id );
    handleClose();
    setTitle("");
    setDescription("");
  };

  return (
    <StyledRoot
      sx={{
        ...{
          color: "primary",
          bgcolor: "primary.lighter",
        },
      }}
    >
      {authType==="Department Coordinator" ? (<Grid item xs={15} align="right">
        <Tooltip describeChild title="Add new user">
          <Button
            variant="contained"
            color="inherit"
            size="small"
            onClick={handleClickOpen}
          >
            Create New Announcement
          </Button>
        </Tooltip>
      </Grid>) : null}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        BackdropProps={{ style: { backgroundColor: "rgba(0,0,0,0.2)" } }}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h2" textAlign={'center'} component="h2">
            New Announcement
          </Typography>

          <section style={{ width: '100%', backgroundColor: '#eee' }}>
            <MDBContainer className="py-5">
            <MDBCard className="mb-4">
            <MDBCardBody>
                <MDBRow>
                <MDBCol sm="3">
                    <MDBCardText>Title</MDBCardText>
                </MDBCol>
                <MDBCol sm="9">
                    <TextField
                        id="outlined-multiline-flexible"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
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
                        onChange={e => setDescription(e.target.value)}
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
                    <Button sx={{margin: 'auto'}} variant="contained" color="success" size="medium" onClick={handleCreateAnnouncement} >
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
        </Box>
      </Modal>
    </StyledRoot>
  );
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "6px",
  boxShadow: 24,
  p: 4,
};

AnnouncementToolbar.propTypes = {
  announcements: PropTypes.array,
  createAnnouncementRequest: PropTypes.func,
  authType: PropTypes.string,
  userId: PropTypes.string,
  user: PropTypes.object,
};

AnnouncementToolbar.defaultProps = {
  announcements: [],
};

