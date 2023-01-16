import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
// @mui
import { styled, alpha } from "@mui/material/styles";
import {
  Toolbar,
  Typography,
  OutlinedInput,
  InputAdornment,
  Button,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  Box,
  FormControl,
  FormControlLabel,
  Grid,
  Modal,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Alert
} from "@mui/material";

// component
import Iconify from "../../table/iconify";

import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
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

UniversitiesListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  isExchange: PropTypes.string,
  setIsExchange: PropTypes.func,
  addUniversity: PropTypes.func,
};

export default function UniversitiesListToolbar({
  numSelected,
  filterName,
  onFilterName,
  isExchange,
  setIsExchange,
  addUniversity,
}) {
  const [open, setOpen] = useState(false);
  const [universityName, setUniversityName] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [isErasmus, setIsErasmus] = React.useState("Erasmus");
  const [openAddDepartment, setOpenAddDepartment] = useState(false);
  const [departmentName, setDepartmentName] = React.useState("");
  const [langRequired, setLangRequired] = React.useState("None");
  const [level, setLevel] = React.useState("");
  const defaultLanguages = ["English", "German", "Spanish", "French", "Danish", "Korean"];

  const [quotaValue, setQuotaValue] = React.useState(0);
  const [error, setError] = useState(false);
  const [errorDepartment, setErrorDepartment] = useState(false);


  const handleUniversityNameChange = e => setUniversityName(e.target.value);
  const handleDepartmentNameChange = e => setDepartmentName(e.target.value);
  const handleCountryChange = e => setCountry(e.target.value);
  const handleQuotaValueChange = e => setQuotaValue(e.target.value);
  const handleErasmusChange = e => setIsErasmus(e.target.value);
  const handleClickOpen = () => {setOpen(true);};

  const handleAddDepartment = () =>{setOpenAddDepartment(true);};
  const handleAddDepartmentClose = () =>{
    setDepartmentName("");
    setErrorDepartment(false);
    setOpenAddDepartment(false);};

  const handleAddNewUniversityRequest = () => {
    if (
      universityName === "" || country === "" || (isErasmus !== "Erasmus" &&
      quotaValue < 1 )
    ) {
      setError(true);
    } 
    else {
      const languageRequirement = langRequired !== "None" ? {
        language: langRequired,
        level
      } : null;
      const erasmusUniversity = {
        universityName,
        country,
        languageRequirement,
      };
      const exchangeUniversity = {
        universityName,
        country,
        languageRequirement,
        universityQuota: quotaValue,
        maxUniversityQuota: quotaValue,
      };
      const university = isErasmus === "Erasmus" ? erasmusUniversity : exchangeUniversity;
      addUniversity(university, isErasmus);
      handleClose();
    }
  };

  const handleAddDepartmentRequest = () => {
    if (
      departmentName === ""
    ) {
      setErrorDepartment(true);
    } else {
      handleAddDepartmentClose();
    }
  };

  const handleClose = () => {
    setUniversityName("");
    setCountry("");
    setQuotaValue(0);
    setError(false);
    setOpen(false);
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
      <Grid container >
      <Grid item xs={4}>
        <StyledSearch
          value={filterName}
          onChange={onFilterName}
          placeholder="Search university..."
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
      <Grid item xs={4}>            
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={isExchange}
                    label="Type"
                    onChange={e => setIsExchange(e.target.value) }
                  >
                    <MenuItem value={'Erasmus'}>Erasmus</MenuItem>
                    <MenuItem value={'Exchange'}>Exchange</MenuItem>
                  </Select>
                </FormControl>
            
        </Grid>
        <Grid item xs={2}></Grid>
      <Grid item xs={2}>
        <Button
          variant="contained"
          color="inherit"
          size="small"
          onClick={handleClickOpen}
        >
          Add New University
        </Button>
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
              Add New University
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
                          <MDBCardText>University Name*</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <TextField
                            id="outlined-multiline-flexible"
                            value={universityName}
                            onChange={handleUniversityNameChange}
                            error={error}

                          />
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Country*</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <TextField
                            id="outlined-multiline-flexible"
                            value={country}
                            onChange={handleCountryChange}
                            error={error}
                          />
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Program*</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <FormControl>
                            <RadioGroup
                              row
                              aria-labelledby="demo-radio-buttons-group-label"
                              defaultValue={"Erasmus"}
                              name="radio-buttons-group"
                              value={isErasmus}
                              onChange={handleErasmusChange}
                            >
                              <FormControlLabel
                                value={"Erasmus"}
                                control={<Radio />}
                                label="Erasmus"
                              />
                              <FormControlLabel
                                value={"Exchange"}
                                control={<Radio />}
                                label="Exchange"
                              />
                            </RadioGroup>
                          </FormControl>
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Language Requirement</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <FormControl sx={{ m: 1, width: 300 }}>
                            <Select
                              labelId="demo-multiple-chip-label"
                              id="demo-multiple-chip"
                              defaultValue="None"
                              value={langRequired}
                              onChange={e => setLangRequired(e.target.value)}
                              input={<OutlinedInput id="select-multiple-chip" />}
                            >
                              <MenuItem  value={"None"}>None</MenuItem>
                              {defaultLanguages.map(lang => (
                                <MenuItem key={lang} value={lang}>
                                  {lang}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Language Level</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <FormControl sx={{ m: 1, width: 300 }}>
                            <Select
                              label="Level"
                              labelId="demo-multiple-chip-label"
                              id="demo-multiple-chip"
                              disabled={langRequired === "None"}
                              value={level}
                              onChange={e => setLevel(e.target.value)}
                              input={<OutlinedInput id="select-multiple-chip" />}
                            >
                              <MenuItem disabled value={""}>Select</MenuItem>
                              <MenuItem value={"A1"}>A1</MenuItem>
                              <MenuItem value={"A2"}>A2</MenuItem>
                              <MenuItem value={"B1"}>B1</MenuItem>
                              <MenuItem value={"B2"}>B2</MenuItem>
                              <MenuItem value={"C1"}>C1</MenuItem>
                              <MenuItem value={"C2"}>C2</MenuItem>
                            </Select>
                          </FormControl>
                        </MDBCol>
                      </MDBRow>
                      
                      



                      {isErasmus !== "Erasmus" ? (<><hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Quota*</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <TextField
                            id="outlined-multiline-flexible"
                            type={"number"}
                            value={quotaValue}
                            onChange={handleQuotaValueChange}
                            error={error}
                          />
                        </MDBCol>
                      </MDBRow></>) : null}
                      {error ? (
                        <Alert severity="error">
                          Required places must be filled!
                        </Alert>
                      ) : null}
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
                    onClick={handleAddNewUniversityRequest}

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
       <Modal
        open={openAddDepartment}
        onClose={handleAddDepartmentClose}
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
                          <MDBCardText>Department Name*</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <TextField
                            id="outlined-multiline-flexible"
                            value={departmentName}
                            onChange={handleDepartmentNameChange}
                            error={errorDepartment}
                          />
                        </MDBCol>
                      </MDBRow>
                      {errorDepartment ? (
                        <Alert severity="error">
                          Required places must be filled!
                        </Alert>
                      ) : null}
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
                    onClick={handleAddDepartmentRequest}

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
                    onClick={handleAddDepartmentClose}
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