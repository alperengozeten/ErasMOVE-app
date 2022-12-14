import React from "react";
import { useState, useTheme } from "react";
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
  FormControl,
  InputLabel,
  OutlinedInput,
  MenuItem
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

const ApplicationDetails = ({ application }) => {
  const [open, setOpen] = useState(false);
  const [editable, setEditable] = useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setEditable(false);
    setOpen(false);
  };

  const [langAdded, setLangAdded] = useState(application.languages);

  const handleChange = event => {
    const {
      target: { value },
    } = event;
    setLangAdded(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

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
        defaultValue={application.name}
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
        defaultValue={application.id}
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
        defaultValue={application.department}
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
        defaultValue={application.score}
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
        defaultValue={application.status}
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
        defaultValue={application.selectedUniversities}
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
        defaultValue={application.languages}
        disabled
      />
      <Button onClick={handleClickOpen}>Add Language</Button>
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
              <InputLabel id="demo-multiple-chip-label">Add Language</InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={langAdded}
                onChange={handleChange}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={selected => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map(value => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {defaultLanguages.map(lang => (
                  <MenuItem
                    key={lang}
                    value={lang}
                  >
                    {lang}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Container>
          <Button onClick={handleClose}>Add Languages</Button>
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
};

ApplicationDetails.defaultProps = {
  application: {},
};

export default ApplicationDetails;
