import React from "react";
import PropTypes from "prop-types";
// @mui
import { styled, alpha } from "@mui/material/styles";
import {
  Toolbar,
  OutlinedInput,
  InputAdornment,
  Grid,
  Button,
  Tooltip,
  Typography,
} from "@mui/material";
import { connect } from "react-redux";
import Box from "@mui/material/Box";
import Iconify from "../../table/iconify";
import { useState } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  Modal,
  Stack,
  Alert,
  TextField,
} from "@mui/material";

import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCol,
  MDBContainer,
  MDBRow,
} from "mdb-react-ui-kit";

// ----------------------------------------------------------------------

const StyledRoot = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: "flex",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1, 0, 3),
}));

const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(["box-shadow", "width"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  "&.Mui-focused": {
    width: 320,
    boxShadow: theme.customShadows?.z8,
  },
  "& fieldset": {
    borderWidth: `1px !important`,
    borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
  },
}));

// ----------------------------------------------------------------------

const AdminUsersListToolbar = ({ numSelected, filterName, onFilterName }) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [actorValue, setActorValue] = React.useState(0);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  const handleActorChange = e => {
    setActorValue(e.target.value);
  };

  const handleNameChange = e => setName(e.target.value);

  const handleDescriptionChange = e => setDescription(e.target.value);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setActorValue(0);
    setDescription("");
    setName("");
    setError(false);
    setOpen(false);
  };
  
  const handleClickAdd = () => {

    if(name === "" || description === "" || actorValue === 0){
      setError(true);
    }else{
      setActorValue(0);
      setDescription("");
      setName("");
      setError(false);
      setOpen(false);
    }
  };

  return (
    <StyledRoot
      sx={{
        ...(numSelected > 0 && {
          color: "primary.main",
          bgcolor: "primary.lighter",
        }),
      }}
    >
      <Grid container>
        <Grid item xs={4}>
          <StyledSearch
            value={filterName}
            onChange={onFilterName}
            placeholder="Search user..."
            startAdornment={
              <InputAdornment position="start">
                <Iconify
                  icon="eva:search-fill"
                  sx={{ color: "text.disabled", width: 20, height: 20 }}
                />
              </InputAdornment>
            }
          />
        </Grid>
        <Grid item xs={5}></Grid>
        <Grid item xs={3} align="right">
          <Tooltip describeChild title="Add new user">
            <Button
              variant="contained"
              color="inherit"
              size="medium"
              onClick={handleClickOpen}
            >
              Add User
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
          <Stack spacing={6}>
            <Typography
              id="modal-modal-title"
              textAlign={"center"}
              variant="h2"
              component="h1"
            >
              Add New User
            </Typography>
            <Stack alignItems={"center"} spacing={3}>
              <section style={{ width: "100%", backgroundColor: "#eee" }}>
                <MDBContainer className="py-5">
                  <MDBCard className="mb-4">
                    <MDBCardBody>
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Name*</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <TextField
                            id="outlined-multiline-flexible"
                            value={name}
                            onChange={handleNameChange}
                            error={error}
                          />
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Actor Type*</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <FormControl sx={{ minWidth: 250 }}>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={actorValue}
                              size="small"
                              onChange={handleActorChange}
                            error={error}

                            >
                              <MenuItem disabled value={0}>
                                Select
                              </MenuItem>
                              <MenuItem value={10}>Outgoing Student</MenuItem>
                              <MenuItem value={20}> Incoming Student</MenuItem>
                              <MenuItem value={30}>
                                Department Coordinator
                              </MenuItem>
                              <MenuItem value={40}>Course Coordinator</MenuItem>
                              <MenuItem value={50}>
                                Administrative Staff
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>E-Mail*</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <TextField
                            id="outlined-multiline-flexible"
                            fullWidth
                            value={description}
                            onChange={handleDescriptionChange}
                            error={error}

                          />
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="12">
                        {error ? (<Alert severity="error">Required places must be filled!</Alert>) : null}
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
                    onClick={handleClickAdd}
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
    </StyledRoot>
  );
};

const mapStateToProps = state => {
  const authType = state.auth.authType;
  return {
    authType,
  };
};

AdminUsersListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

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

export default connect(mapStateToProps, {})(AdminUsersListToolbar);
