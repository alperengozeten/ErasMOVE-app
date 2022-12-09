import { Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import WaitingStudentsTable from '../table/WaitingStudentsTable';
import { sendReplacementOffer } from '../../actions';

const WaitingList = ({ applications }) => {
    return (
        <Stack spacing={2}>
            <Typography gutterBottom variant="h1" textAlign={ "center" } component="div">
                Waiting List
            </Typography>
            <Grid container justifyContent={'center'}>
                <Grid item xs={12}>
                    <WaitingStudentsTable applications={applications} sendReplacementOffer={sendReplacementOffer}  />
                </Grid>
            </Grid>
        </Stack>
    );
};

const mapStateToProps = state => {
    const applications = state.applications.applications;
    return {
        applications,
    };
};

const mapActionsToProps = {
    sendReplacementOffer
};

WaitingList.propTypes = {
    applications: PropTypes.array,
};
  
WaitingList.defaultProps = {
    applications: [],
};

export default connect(mapStateToProps, mapActionsToProps)(WaitingList);