import { Box, Button, Grid, Modal, Stack } from '@mui/material';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import React from 'react';
import PropTypes from 'prop-types';

import PreApprovalsTableForStudents from '../table/PreApprovalsTableForStudent';

const PreApprovalForms = ({ preApprovalForms }) => {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (
        <Stack spacing={2}>
            <Grid container spacing={2}>
                <Grid item xs={8}>

                </Grid>
                <Grid item xs={4} >
                    <Button sx={{margin: 'auto'}} variant="contained" color="primary" size="medium" startIcon={<NoteAddIcon />} onClick={handleOpen} >
                        Create New PreApproval Form
                    </Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                        </Box>
                    </Modal>
                </Grid>


            </Grid>

            
            <PreApprovalsTableForStudents preApprovalForms={preApprovalForms} />
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
};


PreApprovalForms.propTypes = {
    preApprovalForms: PropTypes.array,
};
  
PreApprovalForms.defaultProps = {
    preApprovalForms: [],
};

export default PreApprovalForms;