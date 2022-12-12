import { Grid, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import PreApprovalsTable from './table/PreApprovalsTable';
import { getPreApprovalFormsRequest } from "../actions";


const PreApprovalPage = ({ getPreApprovalFormsRequest, preApprovalForms, userId }) => {
    useEffect(() => {
        getPreApprovalFormsRequest(userId);
    }, [getPreApprovalFormsRequest, userId]);

    return (
        <Stack spacing={2}>
            <Typography gutterBottom variant="h1" textAlign={ "center" } component="div">
                Pre-Approval Form Requests
            </Typography>
            <Grid container justifyContent={'center'}>
                <Grid item xs={12}>
                    <PreApprovalsTable preApprovalForms= {preApprovalForms} />
                </Grid>
            </Grid>
        </Stack>
    );
};
const mapStateToProps = state => {
    const preApprovalForms = state.requests.preApprovalForms;
    const userId = state.user.user.id;
    return {
        preApprovalForms,
        userId
    };
};

const mapActionsToProps = {
    getPreApprovalFormsRequest,
};

PreApprovalPage.propTypes = {
    preApprovalForms: PropTypes.array,
    userId: PropTypes.number,
    getPreApprovalFormsRequest: PropTypes.func,
};
  
PreApprovalPage.defaultProps = {
    preApprovalForms: [],
};

export default connect(mapStateToProps, mapActionsToProps)(PreApprovalPage);