import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
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
} from "@mui/material";

// ----------------------------------------------------------------------

const defaultLanguages = ["English", "German", "Spanish", "French", "Turkish"];

// ----------------------------------------------------------------------

const ApplicationDetails = ({
  name,
  id,
  department,
  score,
  status,
  selectedSemester,
  selectedUniversities,
  languages,
}) => {

  return (
    <>
      
        <Typography id="modal-modal-title" variant="h4" component="h2">
          Add Language Details
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
          defaultValue={name}
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
          defaultValue={id}
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
          defaultValue={department}
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
          defaultValue={score}
          disabled
        />
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Status
        </Typography>
        <TextField
          required
          autoFocus
          margin="dense"
          id="status"
          fullWidth
          variant="standard"
          defaultValue={status}
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
          defaultValue={selectedSemester}
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
          defaultValue={selectedUniversities}
          disabled
        />
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Languages
        </Typography>
        <TextField
          required
          autoFocus
          margin="dense"
          id="lng"
          fullWidth
          variant="standard"
          defaultValue={languages}
          disabled
        />
        <Button onClick={null}>Add Language</Button>
    </>
  );
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

ApplicationDetails.propTypes = {
  name: PropTypes.string,
  id: PropTypes.number,
  department: PropTypes.string,
  score: PropTypes.number,
  status: PropTypes.string,
  selectedSemester: PropTypes.string,
  selectedUniversities: PropTypes.array,
  languages: PropTypes.array,
};

ApplicationDetails.defaultProps = {
  name: "",
  id: 0,
  department: "",
  score: 0,
  status: "",
  selectedSemester: "",
  selectedUniversities: [],
  languages: [],
};

export default ApplicationDetails;
