import React, { useEffect } from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// @mui
import {
  Container,
  Typography,
  Modal,
  Box,
  TextField,
  Button,
  Select,
  Chip,
  FormControl,
  InputLabel,
  OutlinedInput,
  MenuItem,
} from "@mui/material";

// ----------------------------------------------------------------------

const defaultLanguages = ["English", "German", "Spanish", "French", "Turkish"];
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// ----------------------------------------------------------------------

const ApplicationDetails = ({ application, languageEditable, languages, addLanguageByStudentId }) => {
  const [open, setOpen] = useState(false);
  const [editable, setEditable] = useState(true);

  //var languageList = languages.map(lang => {languageList.push(lang.language);});
  //console.log(languages);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setLangAdded([]);
    setEditable(false);
    setOpen(false);
  };

  const handleClickAdd = () => {
    //addLanguageByStudentId(langAdded, application.outgoingStudent.id);
    handleClose();
  };

  var languageList = [];
  languages.map(lang => {languageList.push(lang.language);});
  const [langAdded, setLangAdded] = useState(languageList);
  console.log(languageList);

  const handleChange = event => {
    const {
      target: { value },
    } = event;
    setLangAdded(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    console.log(langAdded);
  };

  var selectedUniversitiesNames = [];
  application.selectedUniversities.map(uni =>
    selectedUniversitiesNames.push(uni.universityName)
  );

  return (
    <>
      <Typography
        id="modal-modal-title"
        variant="h3"
        component="h2"
        textAlign={"center"}
      >
        Application Details
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        Student Name
      </Typography>
      <TextField
        required
        autoFocus
        margin="dense"
        id="name"
        fullWidth
        variant="standard"
        defaultValue={application.outgoingStudent.name}
        disabled
      />
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        ID
      </Typography>
      <TextField
        required
        autoFocus
        margin="dense"
        id="id"
        fullWidth
        variant="standard"
        defaultValue={application.outgoingStudent.studentId}
        disabled
      />
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        Department
      </Typography>
      <TextField
        required
        autoFocus
        margin="dense"
        id="dep"
        fullWidth
        variant="standard"
        defaultValue={application.outgoingStudent.department.departmentName}
        disabled
      />
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        Score
      </Typography>
      <TextField
        required
        autoFocus
        margin="dense"
        id="score"
        fullWidth
        variant="standard"
        defaultValue={application.applicationScore}
        disabled
      />
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        Preapproval Form Status
      </Typography>
      <TextField
        required
        autoFocus
        margin="dense"
        id="statusPre"
        fullWidth
        variant="standard"
        defaultValue={application.preApprovalFormStatus}
        disabled
      />
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        Admitted Status
      </Typography>
      <TextField
        required
        autoFocus
        margin="dense"
        id="status"
        fullWidth
        variant="standard"
        defaultValue={application.admittedStatus}
        disabled
      />
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        Selected Semester
      </Typography>
      <TextField
        required
        autoFocus
        margin="dense"
        id="semester"
        fullWidth
        variant="standard"
        defaultValue={application.selectedSemester}
        disabled
      />
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        Selected Universities
      </Typography>
      <TextField
        required
        autoFocus
        margin="dense"
        id="uni"
        fullWidth
        variant="standard"
        defaultValue={selectedUniversitiesNames}
        disabled
      />
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        Language Requirements
      </Typography>
      <TextField
        required
        autoFocus
        margin="dense"
        id="lng"
        fullWidth
        variant="standard"
        defaultValue={application.languageStatus}
        disabled
      />
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        Languages
      </Typography>
      {languages.length === 0 ? (
        <TextField
          required
          autoFocus
          margin="dense"
          id="lng"
          fullWidth
          variant="standard"
          defaultValue={"Empty"}
          disabled
        />
      ) : (
        languages.map((lang, id) => (
          <TextField
            key={id}
            required
            autoFocus
            margin="dense"
            id="lng"
            fullWidth
            variant="standard"
            defaultValue={lang.language}
            disabled
          />
        ))
      )}
      {languageEditable ? (
        <Button onClick={handleClickOpen}>Add Language</Button>
      ) : null}
      <Modal
        open={open}
        onClose={handleClose}
        BackdropProps={{
          style: { backgroundColor: "rgba(0,0,0,0.04)" },
        }}
      >
        <Box sx={style}>
          <Container>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-chip-label">
                Add Language
              </InputLabel>

              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={langAdded}
                onChange={handleChange}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={selected => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map(value => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {defaultLanguages.map(lang => (
                  <MenuItem key={lang} value={lang}>
                    {lang}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Container>
          {languageEditable ? (
            <Button onClick={handleClickAdd}>Add Languages</Button>
          ) : null}
        </Box>
      </Modal>
    </>
  );
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30%",
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "6px",
  alignItems: "center",
  boxShadow: 24,
  p: 4,
};

ApplicationDetails.propTypes = {
  application: PropTypes.object,
  languages: PropTypes.array,
  languageEditable: PropTypes.bool,
  getLanguageByStudentId: PropTypes.func,
  addLanguageByStudentId: PropTypes.func,
};

ApplicationDetails.defaultProps = {
  application: {},
  language: [],
  languageEditable: false,
};

export default ApplicationDetails;
