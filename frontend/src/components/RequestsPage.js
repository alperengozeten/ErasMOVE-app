import { Stack, Typography } from '@mui/material';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RequestsTable from './table/RequestsTable';

const RequestsPage = ({requests}) => {
    return (
        <Stack spacing={2}>
            <Typography gutterBottom variant="h1" textAlign={ "center" } component="div">
                Document Requests
            </Typography>
            <RequestsTable requests = {requests} />
        </Stack>
    );
};
const mapStateToProps = state => {
    const requests = state.requests.requests;
    return {
        requests,
    };
};

RequestsPage.propTypes = {
    requests: PropTypes.array,
};
  
RequestsPage.defaultProps = {
    requests: [],
};

export default connect(mapStateToProps, {})(RequestsPage);