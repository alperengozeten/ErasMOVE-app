import { Button, Grid, Modal, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React from 'react';
import PropTypes from 'prop-types';

const DeleteModal = ({ openDelete, handleCloseDelete, name }) => {
    

    return (
        <Modal
            open={openDelete}
            onClose={handleCloseDelete}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            BackdropProps={{ style: { backgroundColor: "rgba(0, 0, 0, 0.2)" } }}
        >
            <Box sx={style}>
                <Stack spacing={6}>
                    <Typography id="modal-modal-title" textAlign={"center"}
                        variant="h2" component="h1">
                        Delete {name}
                    </Typography>
                    <Stack alignItems={"center"} spacing={3}>
                        <Typography id="modal-modal-title" textAlign={"center"}
                            variant="body1" fontSize={18} component="h1">
                            You can not take it back after you delete it. Do you want to delete {name}?
                        </Typography>
                    </Stack>
                    <Stack alignItems={"flex-end"}>
                        <Grid container justifyContent={"flex-end"} spacing={2}>
                            <Grid item xs={4}></Grid>
                            <Grid justifyContent={"flex-end"} item xs={4}>
                            </Grid>
                            <Grid item container spacing={5}   xs={4}>
                                <Grid item xs={4}>
                                    <Button variant="contained" startIcon={<ArrowBackIcon /> } color="primary" size="medium" onClick={handleCloseDelete} >
                                        Back
                                    </Button>
                                </Grid>
                                <Grid item xs={4}>
                                    <Button variant="contained" startIcon={<DeleteForeverIcon /> } color="error" size="medium" onClick={handleCloseDelete} >
                                        Delete
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>   
                    </Stack>
                </Stack>
            </Box>
        </Modal>
    );
};

const style ={
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

DeleteModal.propTypes = {
    openDelete: PropTypes.bool,
    handleCloseDelete: PropTypes.func,
    name: PropTypes.string,
};
  
DeleteModal.defaultProps = {
    openDelete: false,
    handleCloseDelete: f => f,
};

export default DeleteModal;
