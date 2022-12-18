import { Grid, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RequestsTable from './table/RequestsTable';
import { getFileRequestsRequest, deleteFileRequestRequest, respondFileRequestRequest } from '../actions';

const RequestsPage = ({ requests, getFileRequestsRequest, typeForReq, userId, deleteFileRequestRequest, respondFileRequestRequest }) => {
    useEffect(() => {
        getFileRequestsRequest(userId, typeForReq);
    }, [getFileRequestsRequest, ]);
    return (
        <Stack spacing={2}>
            <Typography gutterBottom variant="h1" textAlign={ "center" } component="div">
                Document Requests
            </Typography>
            <Grid container justifyContent={'center'}>
                <Grid item xs={12}>
                    <RequestsTable userId={userId} respondFileRequestRequest={respondFileRequestRequest} deleteFileRequestRequest={deleteFileRequestRequest} requests = {requests} isStaff={true} />
                </Grid>
            </Grid>
        </Stack>
    );
};
const mapStateToProps = state => {
    const requests = state.requests.fileRequests;
    const typeForReq = state.auth.authTypeForReq; 
    const userId = state.auth.userId; 
    return {
        requests,
        typeForReq,
        userId,
    };
};

const mapActionsToProps = {
    getFileRequestsRequest,
    deleteFileRequestRequest,
    respondFileRequestRequest,
};

RequestsPage.propTypes = {
    requests: PropTypes.array,
    getFileRequestsRequest: PropTypes.func,
    deleteFileRequestRequest: PropTypes.func,
    typeForReq: PropTypes.string,
    userId: PropTypes.number,
    respondFileRequestRequest: PropTypes.func,
};
  
RequestsPage.defaultProps = {
    requests: [],
};

export default connect(mapStateToProps, mapActionsToProps)(RequestsPage);