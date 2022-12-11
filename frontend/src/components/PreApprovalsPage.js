import { Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PreApprovalsTable from './table/PreApprovalsTable';

const PreApprovalPage = ({ preApprovalForms }) => {
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
    return {
        preApprovalForms,
    };
};

PreApprovalPage.propTypes = {
    preApprovalForms: PropTypes.array,
};
  
PreApprovalPage.defaultProps = {
    preApprovalForms: [],
};

export default connect(mapStateToProps, {})(PreApprovalPage);